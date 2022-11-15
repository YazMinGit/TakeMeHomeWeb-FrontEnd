import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
@Component({
  selector: 'app-entrypage',
  templateUrl: './entrypage.component.html',
  styleUrls: ['./entrypage.component.css']
})
export class EntrypageComponent implements OnInit {
  isChecked = true;
  color_button1='skyblue';
  color_button2='gray';
  opacidad1=1;
  opacidad2=0.5;
  currentRoute: string;
  text:string;
  constructor(private router:Router) {
    this.text="";
    this.currentRoute = "Demo";
    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
          if(this.currentRoute=='/entrypage/register'){
            this.color_button2='gray';
            this.opacidad2=0.5;
            this.color_button1='skyblue';
            this.opacidad1=1;
            this.text="Registrate"
          }
          else if(this.currentRoute=='/entrypage/login'){
            this.color_button1='gray';
            this.opacidad1=0.5;
            this.color_button2='skyblue';
            this.opacidad2=1;
            this.text="Iniciar Sesión"
          }
            console.log(event);
      }


  });
   }

  ngOnInit(): void {
  }
  iniciarSesion(){
    this.router.navigate(['/entrypage/login']);
    this.color_button1='gray';
    this.opacidad1=0.5;
    this.color_button2='skyblue';
    this.opacidad2=1;
  }
  registrate(){
    this.router.navigate(['/entrypage/register'])
    this.color_button2='gray';
    this.opacidad2=0.5;
    this.color_button1='skyblue';
    this.opacidad1=1;
  }
}
