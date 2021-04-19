import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { OrderItemComponent } from "./order-item/order-item.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
      OrderItemComponent,
      OrderDetailComponent,
      HeaderComponent
  ],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [
    OrderItemComponent,
    OrderDetailComponent,
    CommonModule,
    RouterModule,
    HeaderComponent,
    HttpClientModule
  ],
})
export class SharedModule {}