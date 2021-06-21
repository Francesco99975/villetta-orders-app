import { Component, OnDestroy, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Dish, Item, Order } from './shared/models/order';
import { NotificationsService } from './shared/notifications.service';
import { OrdersService } from './shared/orders.service';
import { SocketIoService } from './shared/socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  subIo: Subscription;
  subIo2: Subscription;

  constructor(private auth: AuthService, private ordersService: OrdersService, private socketIo: SocketIoService, private notif: NotificationsService, private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe(event => {
      this.swUpdate.activateUpdate().then(() => document.location.reload());
    });
  }
  
  ngOnInit(): void {
    this.auth.autoLogin();
    this.subIo = this.socketIo.listenToSever('create').subscribe((order) => {
      console.dir(order);
      let items: Item[] = order.items.map((item: any) => {
        let product: Dish = new Dish({
          id: item.product.id,
          name: item.product.name,
          description: item.product.description,
          price: item.product.price,
          imageUrl: item.product.imageUrl,
          courseType: item.product.courseType,
          isSpecial: item.product.isSpecial
        });
        return new Item({
          product: product,
          quantity: item.quantity
        });
      });
      
      this.ordersService.add(
        new Order({
          id: order._id,
          clientname: order.clientname,
          items: items,
          email: order.email,
          address: order.address,
          phone: order.phone,
          pickup: order.pickup,
          deliveryFees: order.deliveryFees,
          tip: order.tip,
          method: order.method,
          eta: order.eta,
          fulfilled: order.fulfilled,
          createdAt: new Date(order.createdAt)
        })
      );
    });

    this.subIo2 = this.socketIo.listenToSever('update').subscribe((orders) => {
      const newOrders = orders.map((order: any) => {
        let items: Item[] = order.items.map((item: any) => {
          let product: Dish = new Dish({
            id: item.product.id,
            name: item.product.name,
            description: item.product.description,
            price: item.product.price,
            imageUrl: item.product.imageUrl,
            courseType: item.product.courseType,
            isSpecial: item.product.isSpecial
          });
          return new Item({
            product: product,
            quantity: item.quantity
          });
        });
        
        return new Order({
          id: order._id,
          clientname: order.clientname,
          items: items,
          email: order.email,
          address: order.address,
          phone: order.phone,
          pickup: order.pickup,
          deliveryFees: order.deliveryFees,
          tip: order.tip,
          method: order.method,
          eta: order.eta,
          fulfilled: order.fulfilled,
          createdAt: new Date(order.createdAt)
        });
      });

      this.ordersService.setIo(newOrders);
    });

    this.notif.subscribeToNotifications();
  }

  ngOnDestroy(): void {
    this.subIo.unsubscribe();
    this.subIo2.unsubscribe();
  }
}
