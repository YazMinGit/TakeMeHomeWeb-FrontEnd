import { environment } from './../../environments/environment';

import { Pedido } from './../models/pedido';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  ruta:string = environment.serverJSON+environment.resourcePedidos;

  constructor(private http:HttpClient) { }

  addPedido(pedido:Pedido){
    return this.http.post<Pedido>(this.ruta,pedido);

    //return this.http.post<Pedido>("http://localhost:3000/Pedido",pedido);
  }

  getPedido() {
    return this.http.get<Pedido[]>(this.ruta);

    //return this.http.get<Pedido[]>("http://localhost:3000/Pedido");
   }
    
 
   getPedidos(id: number) {

    return this.http.get<Pedido>(this.ruta+"/"+id.toString());

     //return this.http.get<Pedido>("http://localhost:3000/Pedido"+"/"+id.toString());
 
   }
 
 
   updatePedido(pedido: Pedido) {

    return this.http.put<Pedido>(this.ruta+"/"+pedido.id.toString(),pedido);

     //return this.http.put<Pedido>("http://localhost:3000/Pedido"+"/"+pedido.id.toString(),pedido);
 

   }

   deletePedido(id: number) {
     return this.http.delete(this.ruta+"/"+id.toString());

     //return this.http.delete("http://localhost:3000/Pedido"+"/"+id.toString());
   }
}
