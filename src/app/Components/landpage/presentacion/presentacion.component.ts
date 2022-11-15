import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css']
})
export class PresentacionComponent implements OnInit {
  colorNavbar='white';
  colorli='black';

  constructor() { }

  ngOnInit(): void {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
}
  cambiodeColorNavBarMorado(){
    this.colorNavbar='skyblue'
  }
  cambiodeColorNavBarBlanco(){
    this.colorNavbar='white'
  }
  cambiodeColorLiMorado(){
    this.colorli='white'
  }
  cambiodeColorLiBlanco(){
    this.colorli='black'
  }
}
