import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, interval, Observable, of, pipe, Subject, Subscription, throwError, timer } from 'rxjs';
import { delay, flatMap, repeat, takeUntil, repeatWhen, retryWhen, take, concatMap, tap, delayWhen } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api.service';
import { Process } from 'src/app/shared/process';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit, OnDestroy {

  id: string;
  process: Process;
  subscriptions: Subscription[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
