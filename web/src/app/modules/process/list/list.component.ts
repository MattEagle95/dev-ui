import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, interval, of, pipe, Subject, throwError, timer } from 'rxjs';
import { delay, flatMap, repeat, takeUntil, repeatWhen, retryWhen, take, concatMap, tap, delayWhen, expand, takeWhile } from 'rxjs/operators';
import { CreateComponent } from '../create/create.component';
import * as Feather from 'feather-icons';
import { SortableHeader, SortEvent } from 'src/app/shared/table/sortable.directive';
import { ApiService } from 'src/app/shared/api.service';
import { SocketService } from 'src/app/shared/socket.service';
import { element } from 'protractor';
import { TabbarService } from 'src/app/shared/tabbar.service';
import { DateAgoPipe } from 'src/app/shared/date-ago.pipe';
import { CreateSimpleComponent } from '../create-simple/create-simple.component';
import { Process } from 'src/app/shared/process';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ApiService, SocketService, DecimalPipe, DateAgoPipe]
})
export class ListComponent implements AfterViewInit {

  ngAfterViewInit() {
    Feather.replace();
  }

  countries$: Observable<Process[]>;
  total$: Observable<number>;
  systeminfo$: Observable<any>;
  systeminfotext: any;

  data: any[];

  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader>;

  constructor(public service: ApiService, private modalService: NgbModal, private socketService: SocketService, private tabbarService: TabbarService) {
    this.countries$ = service.countries$
    this.total$ = service.total$
    socketService.sendMessage('hi')
    socketService.getMessage().subscribe(msg => {
      console.log(msg)
    })

    this.countries$.subscribe(c => {
      console.log(c)
      this.data = c
    });

    socketService.getDeleted().subscribe(event => {
      console.log('delete')
      console.log(event)
      let index = this.data.findIndex(element => element.name === event)
      console.log(index)
      this.data.splice(index, 1);
      return;
    })

    socketService.getEvent().subscribe(event => {
      if (event['data']) {
        console.log('exception')
        console.log(event)
        return
      }
      console.log(event)

      // console.log('process: ' + event['process']['status'])

      if (event['event'] === 'online') {
        let proc: Process = this.data.find(element => element.pm_id === event['process']['pm_id'])

        if (!proc) {
          this.data.push(event['uiprocess'])
          proc = event['uiprocess']
        } else {
          proc.pm2_env.status = event['uiprocess'].pm2_env.status
          proc.pm2_env.pm_uptime = event['uiprocess'].pm2_env.pm_uptime
        }

        proc.pm2_env.status = event['uiprocess'].pm2_env.status
        proc.pm2_env.pm_uptime = event['uiprocess'].pm2_env.pm_uptime

        console.log('uiprocess: ' + event['uiprocess'].pm2_env.status)

        if (event['uiprocess'].pm2_env.status === 'launching') {
          console.log('start describe ' + event['uiprocess'].name)
          this.socketService.describe(event['uiprocess'].name)
          this.socketService.getDescribe().pipe(takeWhile(procc => procc[0]['pm2_env']['status'] !== 'online', true)).subscribe((proccc) => {
            console.log('launch see')
            console.log(proccc[0]['name'] + " - " + proccc[0]['pm2_env']['status'])
            proc.pm2_env.status = proccc[0]['pm2_env']['status']
            proc.pm2_env.pm_uptime = proccc[0]['pm2_env']['pm_uptime']
            this.socketService.describe(proccc[0]['name'])
          })
        }

        return;
      }

      if (event['uiprocess'].pm2_env.status === 'stopped') {
        console.log('start describe stopped ' + event['uiprocess'].name)
        this.socketService.describe(event['uiprocess'].name)
        this.socketService.getDescribe().pipe(delay(500)).subscribe((proccc) => {
          if (proccc[0]) {
            console.log(proccc[0])
          } else {
            let index = this.data.findIndex(element => element.name === event['uiprocess'].name)
            console.log('i ' + index)
            this.data.splice(index, 1);
          }
        })
      }

      let proc: Process = this.data.find(element => element.pm_id === event['process']['pm_id'])
      if (proc) {
        if (proc.pm2_env && event['uiprocess']) {
          proc.pm2_env.status = event['uiprocess'].pm2_env.status
          proc.pm2_env.pm_uptime = event['uiprocess'].pm2_env.pm_uptime
        }
      }

      // console.log('uiprocess: ' + event['uiprocess'].pm2_env.status)
    })
  }

  addTab() {
    this.tabbarService.addTab({ name: 'Process list', route: 'process' })
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  processesObs: Subject<Process[]> = new Subject();
  processes: Process[] = [];
  logstr;
  loadingObs: Subject<boolean>[] = [];
  loading: boolean[] = [];

  getProcesses() {
    return this.processes.filter(x => x.name !== 'piwatch');
  }

  getMainProcess() {
    let process = this.processes.filter(x => x.name === 'piwatch');
    if (process && process.length === 1) {
      return process[0];
    }

    return null;
  }

  create() {
    console.log('test')
    const modalRef = this.modalService.open(CreateComponent, { size: 'lg' });
    modalRef.componentInstance.name = 'World';
  }

  createScriptpath() {
    console.log('create scriptpath')
    const modalRef = this.modalService.open(CreateSimpleComponent, { size: 'lg' });
    modalRef.componentInstance.name = 'World';
  }

  status() {
    this.service.list()
      .subscribe((processes: Process[]) => {
        this.processes = processes;
        console.log(processes);
      });
  }

  logs(name: string) {
    this.service.logs(name)
      .subscribe((data) => {
        console.log(data);
        this.logstr = data;
      });
  }

  reload(name: string) {
    this.service.reload(name)
      .subscribe((data) => {
        console.log(data);
      });
  }

  flush(name: string) {
    this.service.reload(name)
      .subscribe((data) => {
        console.log(data);
      });
  }

  checkLoading(action: string, name: string): boolean {
    if (!this.loading[action + '-' + name]) {
      return false;
    }

    return this.loading[action + '-' + name];
  }

  restart(name: string) {
    this.socketService.restart(name)
  }

  stop(name: string) {
    this.socketService.stop(name)
  }

  deleteProcess(name: string) {
    this.socketService.delete(name)
  }

}
