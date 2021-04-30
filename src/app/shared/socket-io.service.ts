import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private clientSocket: Socket;

  constructor() { 
    this.clientSocket = io(environment.ORDERS_API);
  }

  listenToSever(event: string): Observable<any> {
    return new Observable((subscribe) => {
      this.clientSocket.on(event, (data) => {
        subscribe.next(data);
      });
    });
  }
}
