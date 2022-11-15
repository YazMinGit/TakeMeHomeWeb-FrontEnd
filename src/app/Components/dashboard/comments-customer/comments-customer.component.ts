import { Comentario } from './../../../../models/Comentarios';
import { CommentsService } from './../../../services/comments.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-comments-customer',
  templateUrl: './comments-customer.component.html',
  styleUrls: ['./comments-customer.component.css']
})
export class CommentsCustomerComponent implements OnInit {
  comentarios:Comentario[]=[];
  noComments=true;
  constructor(private commentService:CommentsService) { 
    this.commentService.getComments(Number(sessionStorage.getItem('Id_Info_User'))).subscribe(
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
