import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComingOrdersComponent } from './coming-orders.component';

const routes: Routes = [{ path: '', component: ComingOrdersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComingOrdersRoutingModule { }