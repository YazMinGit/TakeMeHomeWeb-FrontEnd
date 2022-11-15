import { CommentsService } from './../../../services/comments.service';
import { Comentario } from 'src/models/Comentarios';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reclamos-customer',
  templateUrl: './reclamos-customer.component.html',
  styleUrls: ['./reclamos-customer.component.css']
})
export class ReclamosCustomerComponent implements OnInit {
  claims:Comentario[]=[];
  noComments=true;
  constructor(private commentService:CommentsService ) {
    this.commentService.getClaims(Number(sessionStorage.getItem('Id_Info_User'))).subscribe(
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
