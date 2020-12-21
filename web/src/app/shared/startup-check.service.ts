import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StartupCheckService {

  serviceEndpoint: string = "ui";

  constructor(private http: HttpClient, private configService: ConfigService) { }

  checkConfig() {
    return this.http.get(this.getUrl('checkConfig'));
  }

  private getUrl(endpoint: string): string {
    return `${this.configService.config.baseUrl}/${endpoint}`;
  }
}
