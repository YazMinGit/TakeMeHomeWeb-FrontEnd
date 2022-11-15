import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secondary-navbar',
  templateUrl: './secondary-navbar.component.html',
  styleUrls: ['./secondary-navbar.component.css']
})
export class SecondaryNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  colorNavbar='white';
  colorli='black';

  cambiodeColorNavBarMorado(){
    this.colorNavbar='skyblue'
   
    this.colorli='white'
    console.log(this.colorNavbar)
    console.log(this.colorli)
  }
  cambiodeColorNavBarBlanco(){
    this.colorNavbar='white'
    this.colorli='black'
    console.log(this.colorNavbar)
    console.log(this.colorli)
  }
}
