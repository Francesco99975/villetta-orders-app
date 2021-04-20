import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/shared/orders.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  gains: number = 0.0;
  switch: boolean;

  sub: Subscription;

  constructor(private orders: OrdersService) { }

  ngOnInit(): void {
    this.gains = this.orders.gains;
    this.switch = this.orders.switch;
    this.sub = this.orders.switchChange.subscribe((sw: boolean) => this.switch = sw);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSwitch() {
    this.orders.toggleSwitch();
  }

}
