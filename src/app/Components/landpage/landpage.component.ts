import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.css']
})
export class LandpageComponent implements OnInit {
  pageHeight = window.innerHeight;
  constructor() { }

  ngOnInit(): void {
  }
  @HostListener("window:scroll", ['$event'])
  doSomethingOnWindowsScroll($event:Event){
    console.log("Hola")
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
