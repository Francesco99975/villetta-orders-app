import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss']
})
export class DetailItemComponent implements OnInit {
  @Input() name: string;
  @Input() price: number;
  @Input() quantity: number;

  constructor() { }

  ngOnInit(): void {
  }

}
