import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FulfilledOrdersComponent } from './fulfilled-orders.component';

const routes: Routes = [{ path: '', component: FulfilledOrdersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FulfilledOrdersRoutingModule { }