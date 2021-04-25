import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-pickup-item',
  templateUrl: './pickup-item.component.html',
  styleUrls: ['./pickup-item.component.scss']
})
export class PickupItemComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() eta: number;
  @Input() createdAt: Date;
  @Input() method: string;
  @Input() fulfilled: boolean;
  @Input() total: number;

  leftTime: number;

  config: CountdownConfig;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.leftTime = ((this.createdAt.getTime() / 1000) + this.eta) - (new Date().getTime() / 1000);
    this.config = {
      leftTime: this.leftTime >= 0 ? this.leftTime : 0
    };
  }

  onDetail() {
    this.router.navigateByUrl(`/pickup/${this.id}`);
  }

}
