import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
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

  constructor(private orders: OrdersService, private auth: AuthService) { }

  ngOnInit(): void {
    this.gains = this.orders.gains;
    this.switch = this.orders.switch;
    this.sub = this.orders.switchChange.subscribe((sw: boolean) => this.switch = sw);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onOpenNav() {
    document.querySelector('.backdrop').classList.add('open');
    document.querySelector('.mobile-nav').classList.add('open');
  }

  onCloseNav() {
    document.querySelector('.mobile-nav').classList.remove('open');
    document.querySelector('.backdrop').classList.remove('open');
  }

  onLogout() {
    this.auth.logout();
  }

  onSwitch() {
    this.orders.toggleSwitch();
  }

}
