import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersResolverService } from '../shared/orders-resolver.service';

import { ComingOrdersComponent } from './coming-orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  { 
    path: '', 
    component: ComingOrdersComponent 
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
export class ComingOrdersRoutingModule { }