import { CommentsService } from './../../../services/comments.service';
import { Comentario } from 'src/models/Comentarios';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.css']
})
export class ReclamosComponent implements OnInit {
  claims:Comentario[]=[];
  noComments=true;
  constructor(private commentService:CommentsService ) {
    this.commentService.getClaims(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
      (data:Comentario[]) => {
        if(data.length==0){
          this.noComments=true;

        }
        else{
          this.noComments=false;
          this.claims=data;
          console.log(this.claims)
        }
     
      }
    ); 
   }

  ngOnInit(): void {
  }

}
