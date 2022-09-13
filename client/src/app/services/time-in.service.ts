import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class TimeInService {

  constructor(private socket: Socket) { }

  onTimeIn() {
    return this.socket.fromEvent('time:in');
  }
}
