import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Order } from './models/order';
import { environment } from "../../environments/environment";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private orders: Order[] = [];

  onChange: Subject<Order[]> = new Subject();

  constructor(private http: HttpClient) {}

  set(orders: Order[]) {
    this.orders = orders;
  }

  get() {
    return this.orders.slice();
  }

  fulfill(id: string) {
    this.orders.find(order => order.id === id).setStatus(true);
    return this.http.put(`${environment.ORDERS_API}/order/${id}`, {status: true}).pipe(
      tap(() => this.onChange.next(this.orders.slice()))
    );
  }

  unfulfill(id: string) {
    this.orders.find(order => order.id === id).setStatus(false);
    return this.http.put(`${environment.ORDERS_API}/order/${id}`, {status: false}).pipe(
      tap(() => this.onChange.next(this.orders.slice()))
    );
  }
}
