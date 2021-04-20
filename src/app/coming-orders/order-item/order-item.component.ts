import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() id: string;
  @Input() address: string;
  @Input() eta: number;
  @Input() createdAt: Date;
  @Input() total: number;

  mapsLink: string;
  leftTime: number;

  config: CountdownConfig;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.leftTime = ((this.createdAt.getTime() / 1000) + this.eta) - (new Date().getTime() / 1000);
    console.log(this.leftTime);
    this.config = {
      leftTime: this.leftTime >= 0 ? this.leftTime : 0
    };
    const formattedAddress = this.address.split(' ').join('+');
    this.mapsLink = `https://maps.google.com/?q=${formattedAddress}+ON+Canada`;
  }

  onDetail() {
    this.router.navigateByUrl(`/orders/${this.id}`);
  }

}
