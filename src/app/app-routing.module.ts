import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '/', pathMatch: "full", redirectTo: 'coming'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'coming',
    loadChildren: () => import('./coming-orders/coming-orders.module').then((m) => m.ComingOrdersModule)
  }, 
  {
    path: 'fulfilled',
    loadChildren: () => import('./fulfilled-orders/fulfilled-orders.module').then((m) => m.FulfilledOrdersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
