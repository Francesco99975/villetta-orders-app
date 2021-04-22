import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDetailComponent } from '../shared/order-detail/order-detail.component';
import { OrdersResolverService } from '../shared/orders-resolver.service';

import { PickupOrdersComponent } from './pickup-orders.component';

const routes: Routes = [
  { 
    path: '', 
    component: PickupOrdersComponent 
  },
  {
    path: ":id",
    component: OrderDetailComponent,
    resolve: [OrdersResolverService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PickupOrdersRoutingModule { }