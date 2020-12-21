import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { ApiService } from 'src/app/shared/api.service';
import { NotifyService } from 'src/app/shared/notify.service';
import { SocketService } from 'src/app/shared/socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ApiService, SocketService, DecimalPipe]
})
export class HeaderComponent implements AfterViewInit {


  ngAfterViewInit() {
    Feather.replace();
  }

  constructor(public notifyService: NotifyService) {}

}
