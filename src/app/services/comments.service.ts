import { Comentario } from './../../models/Comentarios';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  resourcePath:string = environment.serverJSON+environment.resourceComment;
  constructor(private http:HttpClient) { }
  addComment(comentario:Comentario){
    return this.http.post<Comentario>(this.resourcePath,comentario);
  }
  getComments(id:number){
    return this.http.get<Comentario[]>(this.resourcePath+"/"+id.toString()+"/positive");
  }
  getClaims(id:number){
    return this.http.get<Comentario[]>(this.resourcePath+"/"+id.toString()+"/negative"); 
  }
}
