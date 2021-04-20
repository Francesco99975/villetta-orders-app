import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OrdersService } from './orders.service';
import { environment } from "../../environments/environment";
import { map, tap } from 'rxjs/operators';
import { Dish, Item, Order } from './models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersResolverService {

  constructor(private orders: OrdersService, private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.orders.get().length <= 0) {
      return this.http.get(`${environment.ORDERS_API}/orders`).pipe(
        map((res: any) => {
          return res.orders.map((order: any) => {
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
              eta: order.eta,
              fulfilled: order.fulfilled,
              createdAt: new Date(order.createdAt)
            });
          });
        }),
        tap((ordersList: Order[]) => this.orders.set(ordersList))
      );
    }
  }
}
