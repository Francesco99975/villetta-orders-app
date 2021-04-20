import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ComingOrdersRoutingModule } from './coming-orders-routing.module';
import { HeaderComponent } from './header/header.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { CountdownModule } from "ngx-countdown";
import { ComingOrdersComponent } from './coming-orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { DetailItemComponent } from './detail-item/detail-item.component';



@NgModule({
  declarations: [ComingOrdersComponent, HeaderComponent, OrderItemComponent, OrderDetailComponent, DetailItemComponent],
  imports: [
    CountdownModule,
    ComingOrdersRoutingModule,
    SharedModule
  ]
})

export class ComingOrdersModule { }