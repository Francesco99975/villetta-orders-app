import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "./header/header.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { DetailItemComponent } from "./detail-item/detail-item.component";



@NgModule({
  declarations: [HeaderComponent, OrderDetailComponent, DetailItemComponent],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    HeaderComponent,
    OrderDetailComponent,
    DetailItemComponent
  ],
})
export class SharedModule {}