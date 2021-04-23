import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from 'src/app/shared/orders.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  order: Order;
  sub: Subscription;
  isLoading: boolean;

  constructor(private orderService: OrdersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.isLoading = false;
      this.order = this.orderService.getOrder(params["id"]);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onBack() {
    this.router.navigateByUrl('/orders');
  }

  onToggleStatus() {
    this.isLoading = true;
    if(this.order.fulfilled) {
      this.orderService.unfulfill(this.order.id).subscribe((res: any) => {
        this.order = this.orderService.getOrder(res.id);
        this.isLoading = false;
      });
    } else {
      this.orderService.fulfill(this.order.id).subscribe((res: any) => {
        this.order = this.orderService.getOrder(res.id);
        this.isLoading = false;
      });
    }
  }

}
