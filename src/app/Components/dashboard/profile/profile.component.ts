import { CommentsService } from './../../../services/comments.service';
import { Comentario } from './../../../../models/Comentarios';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { User } from 'src/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
    this.id=Number(sessionStorage.getItem('Id_Logged_User'))
    this.currentRoute = "Demo";
    this.imageValidate=this.fb.group({
    
      imgUrl:["",[Validators.required]],
  
    
    })
    this.router.events.subscribe((event: Event) => {
     
        if (event instanceof NavigationEnd) {
            this.currentRoute = event.url;
            if(this.currentRoute=='/app/perfil/comentarios'){
              this.izq='0px';
              this.opacidad1=1;
              this.opacidad2=0.5;
              this.opacidad3=0.5;
            }
            else if(this.currentRoute=='/app/perfil/reclamos'){
              this.izq='120px';
              this.opacidad1=0.5;
              this.opacidad2=1;
              this.opacidad3=0.5;
            }
            else if(this.currentRoute=='/app/perfil/edicion' ){
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
    this.router.navigate(["/app/perfil/comentarios"])
  }
  medio(){
    this.izq='120px';
    this.opacidad1=0.5;
    this.opacidad2=1;
    this.opacidad3=0.5;
    this.router.navigate(["/app/perfil/reclamos"])
  }
  ultimo(){
    this.izq='240px';
    this.opacidad1=0.5;
    this.opacidad2=0.5;
    this.opacidad3=1;
    this.router.navigate(["/app/perfil/edicion"])
  }
  validar(){
    let image = document.getElementById("image-cont") as HTMLImageElement;
   
    if(image.naturalHeight!=0){
      this.changeImage();
      this.avisomsg=true;
      this.msgfotovalidate=false;
    }
    else{
      this.errormsg=true;
      this.msgfotovalidate=false;
    }
  }
  enviarImagen(){
      console.log(this.imageValidate.get("imgUrl")?.value)
      this.imgvalidation=this.imageValidate.get("imgUrl")?.value;
      console.log(this.imgvalidation)
  }
  changeImage(){
    this.userService.getUser(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe((data:User)=>{
      this.user=data;
      this.user.urlImage=this.imageValidate.get("imgUrl")?.value;
      console.log(this.user)
      console.log(this.imageValidate.get("imgUrl")!.value)
      this.userService.changeImage(Number(sessionStorage.getItem('Id_Logged_User')),this.user).subscribe(
        {
          next:(data)=>{

              console.log("Imagen cambiada");
              console.log(data);
          },
          error:(err)=>{
              console.log("Error")
          }
        }
      )
    })
  }
  refrescarPagina(){
    window.location.reload();
  }
  
}
