import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dish, Item, Order } from '../shared/models/order';
import { NotificationsService } from '../shared/notifications.service';
import { OrdersService } from '../shared/orders.service';
import { SocketIoService } from '../shared/socket-io.service';

@Component({
  selector: 'app-coming-orders',
  templateUrl: './coming-orders.component.html',
  styleUrls: ['./coming-orders.component.scss']
})
export class ComingOrdersComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  displayedOrders: Order[] = [];
  switch: boolean;
  sub: Subscription;
  subSwitch: Subscription;

  constructor(private ordersService: OrdersService, private notif: NotificationsService) { }

  ngOnInit(): void {
    this.orders = this.ordersService.get();
    this.switch = this.ordersService.switch;
    this.displayedOrders = this.switch ? this.ordersUnfl : this.ordersFl;
    this.sub = this.ordersService.onChange.subscribe((orders: Order[]) =>{ 
      this.orders = orders;
      this.displayedOrders = this.switch ? this.ordersUnfl : this.ordersFl;
    });
    this.subSwitch = this.ordersService.switchChange.subscribe((sw: boolean) => {
      if(sw) {
        this.switch = sw;
        this.displayedOrders = this.ordersUnfl;
      } else {
        this.switch = sw;
        this.displayedOrders = this.ordersFl;
      }
    });

    this.notif.subscribeToNotifications();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subSwitch.unsubscribe();
  }

  get ordersUnfl(): Order[] {
    return this.orders.filter((order) => !order.fulfilled && !order.pickup).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  get ordersFl(): Order[] {
    return this.orders.filter((order) => order.fulfilled && !order.pickup).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

}
