import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { OrdersResolverService } from './shared/orders-resolver.service';

const routes: Routes = [
  {
    path: '', pathMatch: "full", redirectTo: 'orders'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./coming-orders/coming-orders.module').then((m) => m.ComingOrdersModule),
    canActivate: [AuthGuard],
    resolve: [OrdersResolverService]
  },
  {
    path: 'pickup',
    loadChildren: () => import('./pickup-orders/pickup-orders.module').then((m) => m.PickupOrdersModule),
    canActivate: [AuthGuard],
    resolve: [OrdersResolverService]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
    canActivate: [AuthGuard],
    resolve: [OrdersResolverService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
