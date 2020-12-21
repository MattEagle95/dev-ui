import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  sendMessage(msg: string) {
    this.socket.emit("message", msg);
  }

  getMessage() {
    return this.socket
      .fromEvent("message")
  }

  getDescribe() {
    return this.socket
      .fromEvent("describeback")
  }

  getDeleted() {
    return this.socket
      .fromEvent("deleted")
  }

  getLog() {
    return this.socket
      .fromEvent("log")
  }

  getEvent() {
    return this.socket
      .fromEvent("processevent")
  }

  describe(name: string) {
    this.socket.emit("describe", name);
  }

  create(script: string) {
    this.socket.emit("create", script);
  }

  restart(name: string) {
    this.socket.emit("restart", name);
  }

  stop(name: string) {
    this.socket.emit("stop", name);
  }

  delete(name: string) {
    this.socket.emit("delete", name);
  }

}