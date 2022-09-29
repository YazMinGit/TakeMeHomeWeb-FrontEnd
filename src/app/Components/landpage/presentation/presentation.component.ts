import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {
  colorNavbar='white';
  colorli='black';
  constructor() { }

  ngOnInit(): void {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
}
  cambiodeColorNavBarMorado(){
    this.colorNavbar='#04BFBF'
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
