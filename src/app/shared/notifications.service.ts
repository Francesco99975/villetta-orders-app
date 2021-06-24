import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from "../../environments/environment";
import { OrdersService } from './orders.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private orders: OrdersService, private swPush: SwPush) { }

  subscribeToNotifications() {
    this.swPush.subscription.subscribe(subscription => {
      if(subscription == null) {
        this.swPush.requestSubscription({
          serverPublicKey: environment.PUBLIC_VAPID_KEY
        }).then((sub: any) => {
            this.orders.setNotifSub(sub).subscribe();
        }).catch((err: any) => console.error("Could not subscribe to notifications", err));
      } else {
        console.log("Already Subscribed");
      }
    });
  }
}
