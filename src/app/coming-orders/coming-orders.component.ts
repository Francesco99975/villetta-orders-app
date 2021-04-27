import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dish, Item, Order } from '../shared/models/order';
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
  subIo: Subscription;

  constructor(private ordersService: OrdersService, private socketIo: SocketIoService) { }

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
    this.subIo = this.socketIo.listenToSever().subscribe((order) => {
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
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subSwitch.unsubscribe();
    this.subIo.unsubscribe();
  }

  get ordersUnfl(): Order[] {
    return this.orders.filter((order) => !order.fulfilled && !order.pickup).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  get ordersFl(): Order[] {
    return this.orders.filter((order) => order.fulfilled && !order.pickup).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

}
