import { Comentario } from './../../../../models/Comentarios';
import { CommentsService } from './../../../services/comments.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  comentarios:Comentario[]=[];
  noComments=true;
  constructor(private commentService:CommentsService) { 
    this.commentService.getComments(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
      (data:Comentario[]) => {
        if(data.length==0){
          this.noComments=true;

        }
        else{
          this.noComments=false;
          this.comentarios=data;
          console.log(this.comentarios);
        }
     

      }
    ); 
  }

  ngOnInit(): void {
  }

}
