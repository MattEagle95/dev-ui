import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tabbar } from './tabbar';

@Injectable({
  providedIn: 'root'
})
export class TabbarService {

  private _tabs: Tabbar[] = []
  tabs: Subject<Tabbar[]> = new Subject()

  constructor() {
    this.tabs.subscribe(tab => {
    })
  }

  addTab(tabbar: Tabbar) {
    if (this._tabs.find(element => element.route === tabbar.route)) {
      return
    }

    this._tabs.push(tabbar)
    this.tabs.next(this._tabs)
  }

  deleteTab(tabbar: Tabbar) {
    let index = this._tabs.findIndex(element => element.name === tabbar.name)
    this._tabs.splice(index, 1)
    this.tabs.next(this._tabs)
  }

  deleteLastTab() {
    let tab = this._tabs[this._tabs.length - 1]
    if (!tab) {
      return;
    }

    if (tab.stick) {
      return
    }

    this._tabs.splice(this._tabs.length - 1, 1)
    this.tabs.next(this._tabs)
  }
}
