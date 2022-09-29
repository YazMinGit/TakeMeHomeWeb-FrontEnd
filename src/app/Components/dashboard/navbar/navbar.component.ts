import { Component, OnInit,Input } from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith, debounceTime} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { RegisterloginComponent } from '../../entrypage/registerlogin/registerlogin.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoading=false;
  currentRoute: string;
  active1=true;
  active2=false;
  active3=false;
  color1=' #04BFBF';
  color2='black';
  color3='black'
  showNotifications=false;
  showBarConfiguration=false;
  paths:string[]=['Viajes','Encargos','Soporte','Notificaciones']
  control = new FormControl();
  filpaths: Observable<string[]>
  constructor(private router:Router) {
    this.filpaths = this.control.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      map(val=>this._filter(val))
    );
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
  
    }
    
  });
   
   }

  ngOnInit(): void {
   
  }
  private _filter(val:string):string[]{
    const formatval = val.toLocaleLowerCase();
    return this.paths.filter(path=>path.toLocaleLowerCase().indexOf(formatval)===0);
  }
  public activo1(){
    this.active1=true;
    this.active2=false;
    this.active3=false;
    this.color1=' #04BFBF';
    this.color2='black';
    this.color3='black'
    this.showBarConfiguration=false;
    this.showNotifications=false;

  }
  public activo2(){
    this.active2=true;
    this.active1=false;
    this.active3=false;
    this.color2=' #04BFBF';
    this.color1='black';
    this.color3='black';
    this.showBarConfiguration=false;
    this.showNotifications=false;
  }
  public activo3(){
    this.active3=true;
    this.active1=false;
    this.active2=false;
    this.color3='#04BFBF';
    this.color1='black';
    this.color2='black';
    this.showBarConfiguration=false;
    this.showNotifications=false;
  }
  public acitveNotfications(){
    this.showNotifications=!this.showNotifications;
    this.showBarConfiguration=false;
  }
  public  activateSlider(){
    this.showBarConfiguration=!this.showBarConfiguration;
    this.showNotifications=false;
  }

}
