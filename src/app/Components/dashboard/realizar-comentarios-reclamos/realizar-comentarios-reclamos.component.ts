import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comentario } from './../../../../models/Comentarios';
import { User } from './../../../../models/User';
import { CommentsService } from './../../../services/comments.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-realizar-comentarios-reclamos',
  templateUrl: './realizar-comentarios-reclamos.component.html',
  styleUrls: ['./realizar-comentarios-reclamos.component.css']
})
export class RealizarComentariosReclamosComponent implements OnInit {
  userSend!:User;
  userReceives!:User;
  form:FormGroup;
  aparicion=false;
  constructor(private userService:UserService, private commentService:CommentsService, private fb:FormBuilder) { 
    this.form=this.fb.group(
      {
        title:["",[Validators.required]],
        content:["",[Validators.required]],
        category:["",[Validators.required]]
      }
    )
    this.userService.getUser(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
      (data:User)=>{
        this.userSend=data;
      }
    )
    this.userService.getUser(Number(sessionStorage.getItem('Id_Info_User'))).subscribe(
      (data:User)=>{
        this.userReceives=data;
      }
    )
  }

  ngOnInit(): void {
  }
  addComment(){
   
    console.log(this.userSend)
    console.log(this.userReceives)
    const comentario:Comentario={
      id:0,
      userSend:this.userSend,
      userReceives:this.userReceives,
      title:this.form.get("title")!.value,
      content:this.form.get("content")!.value,
      category:this.form.get("category")!.value,
      date:new Date()

    }
    console.log(comentario)
    this.commentService.addComment(comentario).subscribe(
      {
        next:()=>{
          console.log("Comentario agregado");
        
        }, 
        error:()=>{
          console.log("Error al cargar")
        }
        
      }
    )
  }
  refrescar(){
    window.location.reload()
  }
}
