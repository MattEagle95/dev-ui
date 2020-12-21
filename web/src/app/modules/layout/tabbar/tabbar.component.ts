import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Feather from 'feather-icons';
import { TabbarService } from 'src/app/shared/tabbar.service';
import { Tabbar } from 'src/app/shared/tabbar';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.css']
})
export class TabbarComponent implements OnInit, AfterViewInit, OnChanges {

  tabs: Tabbar[] = []

  constructor(private tabbarService: TabbarService, private router: Router) {
    this.tabbarService.tabs.subscribe((tabs: Tabbar[]) => {
      this.tabs = tabs
      setTimeout(() => {
        Feather.replace();
      }, 200);
    })

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.tabbarService.deleteLastTab()
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    Feather.replace();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    Feather.replace();
  }

  closeTab(tab: Tabbar) {
    console.log(tab)
    this.tabbarService.deleteTab(tab)
  }

  stickTab(tab: Tabbar) {
    tab.stick = true
    setTimeout(() => {
      Feather.replace();
    }, 200);
  }

}
