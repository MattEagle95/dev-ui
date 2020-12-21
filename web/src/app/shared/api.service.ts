import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ConfigService } from './config.service';
import { TokenStorageService } from './token-storage.service';
import { SortColumn, SortDirection } from './table/sortable.directive';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { Process } from './process';

interface SearchResultProcess {
  countries: Process[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(countries: Process[], column: SortColumn, direction: string): Process[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(country: Process, term: string, pipe: PipeTransform) {
  return country.name.toLowerCase().includes(term.toLowerCase());
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serviceEndpoint: string = "pm2";

  start(script: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenStorageService.getAccessToken()
    });

    return this.http.post(this.getUrl('start'), script, { headers: headers });
  }

  stop(name: string) {
    return this.http.post(this.getUrl('stop'), { name: name });
  }

  restart(name: string) {
    return this.http.post(this.getUrl('restart'), { name: name });
  }

  reload(name: string) {
    return this.http.post(this.getUrl('reload'), { name: name });
  }

  describe(name: string) {
    return this.http.get(`${this.getUrl('describe')}/${name}`);
  }

  list(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenStorageService.getAccessToken()
    });

    return this.http.get(this.getUrl('list'), { headers: headers });
  }

  flush(name: string) {
    return this.http.post(this.getUrl('flush'), { name: name });
  }

  reloadLogs(name: string) {
    return this.http.post(this.getUrl('reloadlogs'), { name: name });
  }

  logs(name: string) {
    return this.http.get(`${this.getUrl('logs')}?name=${name}`, { responseType: 'text' });
  }

  private getUrl(endpoint: string): string {
    return `${this.configService.config.baseUrl}/${this.serviceEndpoint}/${endpoint}`;
  }

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<Process[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private usersdb: Process[] = undefined;

  private _state: State = {
    page: 1,
    pageSize: 25,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private http: HttpClient, private configService: ConfigService, private pipe: DecimalPipe, private tokenStorageService: TokenStorageService) {

    this.list().subscribe((users) => {
      this.usersdb = users
      this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      ).subscribe(result => {
        this._countries$.next(result.countries);
        this._total$.next(result.total);
      });

      this._search$.next();
    })
  }

  get countries$() { return this._countries$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResultProcess> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort

    this.list().subscribe(users => {
      this.usersdb = users
    })
    let countries = sort(this.usersdb, sortColumn, sortDirection);

    // 2. filter
    countries = countries.filter(country => matches(country, searchTerm, this.pipe));
    const total = countries.length;

    // 3. paginate
    countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ countries, total });
  }
}
