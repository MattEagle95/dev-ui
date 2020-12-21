import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public getAccessToken(): string {
    const token: string = localStorage.getItem('access_token');
    return token;
  }

  public setAccessToken(token: string) {
    console.log(token);
    localStorage.setItem('access_token', token);
  }

  public clear() {
    localStorage.removeItem('access_token');
  }
}
