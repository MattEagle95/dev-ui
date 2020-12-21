import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, timer } from 'rxjs';
import { delay, delayWhen, repeat, retryWhen, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api.service';
import { SortableHeader, SortEvent } from 'src/app/shared/table/sortable.directive';
import { User } from 'src/app/shared/user';
import { UserService } from 'src/app/shared/user.service';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [UserService, DecimalPipe]
})
export class ListComponent implements AfterViewInit {

  ngAfterViewInit() {
    Feather.replace();
  }

  countries$: Observable<User[]>;
  total$: Observable<number>;
  systeminfo$: Observable<any>;
  systeminfotext: any;

  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader>;

  constructor(public service: UserService) {
    this.countries$ = service.countries$
    this.total$ = service.total$

    this.countries$.subscribe(() => {
      Feather.replace();
    })
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
