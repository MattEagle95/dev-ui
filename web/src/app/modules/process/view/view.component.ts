import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, interval, Observable, of, pipe, Subject, throwError, timer } from 'rxjs';
import { delay, flatMap, repeat, takeUntil, repeatWhen, retryWhen, take, concatMap, tap, delayWhen } from 'rxjs/operators';
import { CreateComponent } from '../create/create.component';
import * as Feather from 'feather-icons';
import { SortableHeader, SortEvent } from 'src/app/shared/table/sortable.directive';
import { ApiService } from 'src/app/shared/api.service';
import { SocketService } from 'src/app/shared/socket.service';
import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { TabbarService } from 'src/app/shared/tabbar.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [ApiService, SocketService, DecimalPipe]
})
export class ViewComponent implements OnInit, AfterViewInit {

  ngAfterViewInit() {
    Feather.replace();
  }

  addTab() {
    this.tabbarService.addTab({ name: 'Process: ' + this.process.name, route: 'process/' + this.processId })
  }

  processId
  process
  logs = []
  scrolllock = false

  @ViewChild('logdiv', { static: false }) logdiv: ElementRef;

  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader>;

  constructor(public service: ApiService, private modalService: NgbModal, private socketService: SocketService, private route: ActivatedRoute, private tabbarService: TabbarService) {
    console.log('view init')
  }

  ngOnInit() {
    this.processId = this.route.snapshot.paramMap.get('id')

    this.socketService.describe(this.processId)
    this.socketService.getDescribe().subscribe(proc => {
      this.process = proc[0]
      console.log(this.process)

      this.socketService.getLog().subscribe(event => {
        if (event['process']['pm_id'].toString() === this.processId) {
          this.logs.push(event['data'])

          if (!this.scrolllock) {
            // this.logdiv.nativeElement.scrollTop = this.logdiv.nativeElement.scrollHeight
          }
        }
      })
    })

    this.socketService.getEvent().subscribe(event => {
      console.log(event['event'] + ' - ' + event['process']['pm_id'])

      if (this.processId === event['process']['pm_id']) {
        console.log('proc exists')
      }
    })
  }

  scrollLock() {
    this.scrolllock = !this.scrolllock
  }

}
