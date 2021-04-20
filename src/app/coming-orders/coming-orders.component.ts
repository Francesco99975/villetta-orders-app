import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../shared/models/order';
import { OrdersService } from '../shared/orders.service';

@Component({
  selector: 'app-coming-orders',
  templateUrl: './coming-orders.component.html',
  styleUrls: ['./coming-orders.component.scss']
})
export class ComingOrdersComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  sub: Subscription;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.orders = this.ordersService.get();
    this.sub = this.ordersService.onChange.subscribe((orders: Order[]) => this.orders = orders);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get ordersUnfl(): Order[] {
    return this.orders.filter((order) => !order.fulfilled);
  }

  get ordersFl(): Order[] {
    return this.orders.filter((order) => order.fulfilled);
  }

}
