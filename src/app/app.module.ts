import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComingOrdersComponent } from './coming-orders/coming-orders.component';
import { FulfilledOrdersComponent } from './fulfilled-orders/fulfilled-orders.component';
import { OrderItemComponent } from './shared/order-item/order-item.component';
import { OrderDetailComponent } from './shared/order-detail/order-detail.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    ComingOrdersComponent,
    FulfilledOrdersComponent,
    OrderItemComponent,
    OrderDetailComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
