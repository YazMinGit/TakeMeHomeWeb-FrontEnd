import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  panelOpenState = false;
  loading = false;
  
  constructor() { }

  ngOnInit(): void {
  }
  fakeLoading(){
    this.loading =true;
   setTimeout(() => {


    this.loading=false;
   
    }, 1500);
  }
}
