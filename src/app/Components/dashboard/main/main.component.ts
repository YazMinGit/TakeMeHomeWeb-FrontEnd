import { Notification } from './../../../../models/Notification';
import { NotificationsService } from './../../../services/notifications.service';
import { User } from 'src/models/User';
import { UserService } from './../../../services/user.service';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDrawerMode} from '@angular/material/sidenav';
import { ReactiveFormsModule,FormGroup } from '@angular/forms';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  mode = new FormControl('over' as MatDrawerMode);
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  texto="";
  currentRoute: string;
  nameUser!:string;
  perfilUser!:string;
  id:number;
  cerrarMessage=false;
  displayFiltro='none'
  notification=false;
  notificationEdited!:Notification;
  notificationArray:Notification[]=[];
  notificationCount!:number;
  constructor(private router:Router,private userService:UserService,private notificationService:NotificationsService) {
    if(Number(sessionStorage.getItem('Id_Logged_User'))==0){
      console.log("Hola")
      this.router.navigate(["/"])
    }
    this.notificationService.getNotificationView(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
      (data:Notification[]) => {

          this.notificationArray=data;
      }
    ); 
    this.id=Number(sessionStorage.getItem('Id_Logged_User'))
      this.currentRoute = "Demo";
    this.router.events.subscribe((event: Event) => {

        if (event instanceof NavigationEnd) {
          
            this.currentRoute = event.url;
            if(this.currentRoute=='/app/inicio'){
              this.userService.getUser(this.id).subscribe(
                (data:User)=>{
                  this.nameUser=data.name;
                  this.perfilUser=data.urlImage;
                  this.notificationCount=data.cont;
                  console.log(this.nameUser)
                  this.texto="Bienvenido "+ this.nameUser;
                }
            )
              console.log(this.id)
              console.log(this.nameUser)
              
            }
            else if(this.currentRoute=='/app/perfil/comentarios' || this.currentRoute=='/app/perfil/reclamos' ||this.currentRoute=='/app/perfil/edicion' ){
              this.texto="Mi Perfil";
            }
            else if(this.currentRoute=='/app/soporte'){
              this.texto="Soporte";
            }
            else if(this.currentRoute=='/app/resumen'){
              this.texto="Resumen de cuenta";
            }
            else if(this.currentRoute=='/app/perfiluser/comentarios' || this.currentRoute=='/app/perfiluser/reclamos' ||this.currentRoute=='/app/perfil/acciones'){
              this.texto="Perfil del usuario";
            }
              console.log(event);
        }


    });
   }

  ngOnInit(): void {
   
  }
  changeState(id:number){
    this.notificationService.getNotification(id).subscribe(
      (data:Notification) => {

        this.notificationEdited=data;
        }
    )
    this.notificationService.editNotification(id,this.notificationEdited).subscribe(
      {
        next:(data:Notification)=>{
          console.log(data.viewed)
          console.log("Editado");
          this.notificationService.getNotificationView(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
            (data:Notification[]) => {
      
                this.notificationArray=data;
            }
          ); 
        
        },
        error:(err)=>{
          console.log("Hay error")
        }
      }
    )
  }
  changeText(){
   
    this.texto="Bienvenido "+this.nameUser;
  }
  changeText1(){
  
    this.texto="Mi Perfil"
  }
  changeText2(){
    this.texto="Resumen"
   
  }
  changeText3(){
    this.texto="Soporte"
  }
  cerrarSesion(){
    console.log("Hola")
    this.router.navigate(['/entrypage/login'])
    sessionStorage.clear();

  }
  changeSizeNotification(){
    this.userService.getUser(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
      (data:User)=>{
        data.cont=0;
        this.userService.changeCont(Number(sessionStorage.getItem('Id_Logged_User')),data).subscribe(
          {
            next:(data)=>{
              console.log("Todo bien")
              this.notificationCount=data.cont
            },
            error:(err)=>{
              console.log("Incorrecto")
            }
          }
        )
      }
    )
  }
  cerrar(){
  
      this.notification=!this.notification;
      this.changeSizeNotification();
    
  }
}
