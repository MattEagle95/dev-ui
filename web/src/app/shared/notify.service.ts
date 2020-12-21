import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { delay, takeWhile } from 'rxjs/operators';
import { ApiService } from './api.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  logWarnings = new BehaviorSubject(0)
  logErrors = new BehaviorSubject(0)
  logNotifications = new BehaviorSubject([])

  constructor(private toastr: ToastrService, public service: ApiService, public socketService: SocketService) {
    this.socketService.getLog().subscribe(event => {
      const isWarning = event['data'].match(new RegExp('warn', 'gmi'))
      if (isWarning) {
        const arr = this.logNotifications.value
        arr.push({
          time: Date.now(),
          type: 'warning',
          msg: event['data']
        })
        this.logNotifications.next(arr)
        this.logWarnings.next(this.logWarnings.value + 1)
      }

      const isError = event['data'].match(new RegExp('error', 'gmi'))
      if (isError) {
        const arr = this.logNotifications.value
        arr.push({
          time: Date.now(),
          type: 'error',
          msg: event['data']
        })
        this.logNotifications.next(arr)
        this.logErrors.next(this.logErrors.value + 1)
      }
    })
  }

  addProcessNotifier(processName: string) {
    const loadingToast = this.toastr.info(`${processName} created`, 'Service created', {
      timeOut: 0,
    })
    this.service.describe(processName).pipe(takeWhile(procc => !procc[0] && procc[0]['pm2_env']['status'] !== 'online', true), delay(2000)).subscribe((proccc) => {
      console.log('launch see')
      console.log(proccc[0])
      if (!proccc[0] && proccc[0]['pm2_env']['status'] === 'online', true) {
        this.toastr.remove(loadingToast.toastId)
        this.toastr.success(`${proccc[0].name} is online`, 'Service online', {
          timeOut: 2000,
        })
      }
    })
  }

  addLogError(processName: string, text: string) {
    // this.toastr.error(`${processName}: ${text}`, 'Error log', {
    //   timeOut: 5000,
    // })
  }

}
