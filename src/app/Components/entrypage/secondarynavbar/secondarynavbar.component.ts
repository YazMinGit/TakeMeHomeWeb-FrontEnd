import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secondarynavbar',
  templateUrl: './secondarynavbar.component.html',
  styleUrls: ['./secondarynavbar.component.css']
})
export class SecondarynavbarComponent implements OnInit {

  constructor(router:Router) { }

  ngOnInit(): void {
  }
  colorNavbar='white';
  colorli='black';

  cambiodeColorNavBarMorado(){
    this.colorNavbar='#04BFBF'
    this.colorNavbar='#04BFBF'
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
