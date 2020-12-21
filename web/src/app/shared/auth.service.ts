import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { TokenStorageService } from './token-storage.service';
const path = require('path');

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serviceEndpoint: string = "auth";

  constructor(private http: HttpClient, private configService: ConfigService, private tokenStorageService: TokenStorageService) { }

  public isAuthorized(): boolean {
    return !!this.tokenStorageService.getAccessToken();
  }

  public login(name: string, password: string): Observable<any> {
    return of('login').pipe(
      delay(2000),
      tap((data: any) => {
        console.log(data.token);
        this.tokenStorageService.setAccessToken(data.token);
      })
    )
  }

  private getUrl(endpoint: string): string {
    return path.join(this.configService.config.baseUrl, this.serviceEndpoint, endpoint);
  }

}
