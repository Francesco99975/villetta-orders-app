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
  switch: boolean = true;

  onChange: Subject<Order[]> = new Subject();
  switchChange: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) {}

  set(orders: Order[]) {
    this.orders = orders;
    console.dir(this.orders);
  }

  get() {
    return this.orders.slice();
  }

  getOrder(id: string): Order {
    return this.orders.find((order) => order.id === id);
  }

  toggleSwitch() {
    this.switch = !this.switch;
    this.switchChange.next(this.switch);
  }

  get gains(): number {
    return this.orders.filter((order) => order.fulfilled).reduce((prev, cur) => prev + cur.total, 0.0);
  }

  fulfill(id: string) {
    return this.http.put(`${environment.ORDERS_API}/order/${id}`, {status: true}).pipe(
      tap(() => {
        this.orders.find(order => order.id === id).setStatus(true);
        this.onChange.next(this.orders.slice())
      })
    );
  }

  unfulfill(id: string) {
    return this.http.put(`${environment.ORDERS_API}/order/${id}`, {status: false}).pipe(
      tap(() => {
        this.orders.find(order => order.id === id).setStatus(false);
        this.onChange.next(this.orders.slice());
      })
    );
  }
}
