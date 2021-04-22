import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ComingOrdersRoutingModule } from './coming-orders-routing.module';
import { OrderItemComponent } from './order-item/order-item.component';
import { CountdownModule } from "ngx-countdown";
import { ComingOrdersComponent } from './coming-orders.component';



@NgModule({
  declarations: [ComingOrdersComponent, OrderItemComponent],
  imports: [
    CountdownModule,
    ComingOrdersRoutingModule,
    SharedModule
  ]
})

export class ComingOrdersModule { }