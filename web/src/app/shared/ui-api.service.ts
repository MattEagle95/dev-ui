import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UiApiService {

  serviceEndpoint: string = "ui";

  constructor(private http: HttpClient, private configService: ConfigService) { }

  uploadDeployFiles(name: string, script: string) {
    return this.http.post(this.getUrl('start'), { name: name, script: script });
  }

  private getUrl(endpoint: string): string {
    return `${this.configService.config.baseUrl}/${endpoint}`;
  }
}
