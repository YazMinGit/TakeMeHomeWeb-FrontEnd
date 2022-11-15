import { Order } from './../../models/Order';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  resourcePath:string = environment.serverJSON+environment.resourceOrder;
  constructor(private http:HttpClient) { }
  addOrder(id:number,order:Order){
    return this.http.post<Order>(this.resourcePath+"/"+id.toString(),order);
  }
  getOrdersFiltradas(id:number){
    return this.http.get<Order[]>(this.resourcePath+"/users/filter/"+id.toString());
  }
  getOrder(id:number){
    return this.http.get<Order>(this.resourcePath+"/"+id.toString());
  }
  getOrderComplete(id:number){
    return this.http.get<Order>(this.resourcePath+"/shipments/"+id.toString());
  }
  getOrdersFiltradasShipments(id:number){
    return this.http.get<Order[]>(this.resourcePath+"/users/"+id.toString()+"/shipments");
  }
  getOrdersFiltradasNoShipments(id:number){
    return this.http.get<Order[]>(this.resourcePath+"/users/"+id.toString()+"/noShipments");
  }
  getOrdersFiltradasShipmentsPay(id:number){
    return this.http.get<Order[]>(this.resourcePath+"/users/"+id.toString()+"/shipments/pay");
  }
  deleteOrder(id:number){
    return this.http.delete<Order[]>(this.resourcePath+"/"+id.toString());
  }
}
