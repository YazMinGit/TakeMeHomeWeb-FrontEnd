import { CommentsService } from './../../../services/comments.service';
import { Comentario } from './../../../../models/Comentarios';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { User } from 'src/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-customer',
  templateUrl: './profile-customer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./profile-customer.component.css']
})
export class ProfileCustomerComponent implements OnInit {
  izq!:string;
  id:number;
  opacidad1!:number;
  opacidad2!:number;
  opacidad3!:number;
  currentRoute: string;
  user!:User;
  nombrecompleto!:string;
  nombre!:string;
  apellido!:string;
  correo!:string;
  telefono!:string;
  fecha_nac!:Date;
  pais!:string;
  contraseña!:string;
  urlImg!:string;
  imgvalidation!:string;
  imageValidate:FormGroup;
  changeFoto=false;
  msgfotovalidate=false;
  avisomsg=false;
  errormsg=false;
  filtroFlex='none'
  constructor(private router:Router, private userService:UserService, private fb:FormBuilder,private commentService:CommentsService) {
    this.id=Number(sessionStorage.getItem('Id_Info_User'))
    this.currentRoute = "Demo";
    this.imageValidate=this.fb.group({
    
      imgUrl:["",[Validators.required]],
  
    
    })
    this.router.events.subscribe((event: Event) => {
     
        if (event instanceof NavigationEnd) {
            this.currentRoute = event.url;
            if(this.currentRoute=='/app/perfiluser/comentarios'){
              this.izq='0px';
              this.opacidad1=1;
              this.opacidad2=0.5;
              this.opacidad3=0.5;
            }
            else if(this.currentRoute=='/app/perfiluser/reclamos'){
              this.izq='120px';
              this.opacidad1=0.5;
              this.opacidad2=1;
              this.opacidad3=0.5;
            }
            else if(this.currentRoute=='/app/perfiluser/acciones' ){
              this.izq='240px';
              this.opacidad1=0.5;
              this.opacidad2=0.5;
              this.opacidad3=1;
            }
              console.log(event);
        }
        this.userService.getUser(this.id).subscribe(
          (data:User) => {
            this.user=data;
            this.nombrecompleto=this.user.name+" @"+this.user.username;
            this.correo=this.user.email;
            this.urlImg=this.user.urlImage;
            this.telefono=this.user.phone;
            this.pais=this.user.country;
            this.fecha_nac=new Date(this.user.birthday);
            this.contraseña=this.user.password;
          }
        )

    });
   }

  ngOnInit(): void {
  }
  inicio(){
    this.izq='0px';
    this.opacidad1=1;
    this.opacidad2=0.5;
    this.opacidad3=0.5;
    this.router.navigate(["/app/perfiluser/comentarios"])
  }
  medio(){
    this.izq='120px';
    this.opacidad1=0.5;
    this.opacidad2=1;
    this.opacidad3=0.5;
    this.router.navigate(["/app/perfiluser/reclamos"])
  }
  ultimo(){
    this.izq='240px';
    this.opacidad1=0.5;
    this.opacidad2=0.5;
    this.opacidad3=1;
    this.router.navigate(["/app/perfiluser/acciones"])
  }


  
  refrescarPagina(){
    window.location.reload();
  }
 
}
