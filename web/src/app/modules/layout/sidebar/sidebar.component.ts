import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService, DecimalPipe]
})
export class SidebarComponent implements AfterViewInit {

  systeminfo: any

  ngAfterViewInit() {
    Feather.replace();
  }

  constructor(private userService: UserService) {
    this.userService.getSystemInfo().subscribe((systeminfo) => {
      this.systeminfo = systeminfo
    })
  }

}
