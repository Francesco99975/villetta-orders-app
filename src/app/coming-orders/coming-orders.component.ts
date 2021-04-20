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
  displayedOrders: Order[] = [];
  sub: Subscription;
  subSwitch: Subscription;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.orders = this.ordersService.get();
    this.displayedOrders = this.ordersUnfl;
    this.sub = this.ordersService.onChange.subscribe((orders: Order[]) => this.orders = orders);
    this.subSwitch = this.ordersService.switchChange.subscribe((sw: boolean) => {
      if(sw) {
        this.displayedOrders = this.ordersUnfl;
      } else {
        this.displayedOrders = this.ordersFl;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subSwitch.unsubscribe();
  }

  get ordersUnfl(): Order[] {
    return this.orders.filter((order) => !order.fulfilled).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  get ordersFl(): Order[] {
    return this.orders.filter((order) => order.fulfilled).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

}
