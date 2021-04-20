import { Component, Input, OnInit } from '@angular/core';
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
  @Input() total: number;

  mapsLink: string;

  config: CountdownConfig;

  constructor() { }

  ngOnInit(): void {
    this.config = {
      leftTime: this.eta
    };
    const formattedAddress = this.address.split(' ').join('+');
    this.mapsLink = `https://maps.google.com/?q=${formattedAddress}+ON+Canada`;
  }

}
