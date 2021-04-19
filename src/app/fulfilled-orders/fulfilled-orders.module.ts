import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FulfilledOrdersRoutingModule } from './fulfilled-orders-routing.module';



@NgModule({
  declarations: [],
  imports: [
    FulfilledOrdersRoutingModule,
    SharedModule
  ]
})

export class FulfilledOrdersModule { }