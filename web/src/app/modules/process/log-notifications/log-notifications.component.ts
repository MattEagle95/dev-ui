import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { NotifyService } from 'src/app/shared/notify.service';

@Component({
  selector: 'app-log-notifications',
  templateUrl: './log-notifications.component.html',
  styleUrls: ['./log-notifications.component.css']
})
export class LogNotificationsComponent implements AfterViewInit {

  logs = []

  ngAfterViewInit() {
    Feather.replace();
  }

  constructor(public notifyService: NotifyService) {
    this.notifyService.logNotifications.subscribe(logs => {
      this.logs = logs
    })
  }

  getLogs() {
    return this.logs.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return b['time'] - a['time'];
    });
  }

}
