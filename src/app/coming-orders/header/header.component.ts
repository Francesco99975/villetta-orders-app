import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onOpenNav() {
    document.querySelector('.backdrop').classList.add('open');
    document.querySelector('.mobile-nav').classList.add('open');
  }

  onCloseNav() {
    document.querySelector('.backdrop').classList.remove('open');
    document.querySelector('.mobile-nav').classList.remove('open');
  }

}
