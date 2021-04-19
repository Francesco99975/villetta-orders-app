import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { OrdersResolverService } from './shared/orders-resolver.service';

const routes: Routes = [
  {
    path: '', pathMatch: "full", redirectTo: 'coming'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'coming',
    loadChildren: () => import('./coming-orders/coming-orders.module').then((m) => m.ComingOrdersModule),
    canActivate: [AuthGuard],
    resolve: [OrdersResolverService]
  }, 
  {
    path: 'fulfilled',
    loadChildren: () => import('./fulfilled-orders/fulfilled-orders.module').then((m) => m.FulfilledOrdersModule),
    canActivate: [AuthGuard],
    resolve: [OrdersResolverService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
