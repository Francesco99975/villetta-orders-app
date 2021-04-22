import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PickupOrdersRoutingModule } from './pickup-orders-routing.modules';
import { CountdownModule } from "ngx-countdown";
import { PickupOrdersComponent } from './pickup-orders.component';
import { PickupItemComponent } from './pickup-item/pickup-item.component';



@NgModule({
  declarations: [PickupOrdersComponent, PickupItemComponent],
  imports: [
    CountdownModule,
    PickupOrdersRoutingModule,
    SharedModule
  ]
})

export class PickupOrdersModule { }