import { Shipment } from 'src/models/Shipments';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ShipmentsService {
  resourcePath:string = environment.serverJSON+environment.resourceShipment;
  constructor(private http:HttpClient) { }
  addShipment(idu:number, ido:number, shipment:Shipment){
    return this.http.post<Shipment>(this.resourcePath+"/"+idu.toString()+"/orders/"+ido.toString(), shipment);
  }
  getShipmentUserIdNoPay(id:number){
    return this.http.get<Shipment[]>(this.resourcePath+"/users/"+id.toString()+"/noPay");
  }
  getShipmentUserIdPay(id:number){
    return this.http.get<Shipment[]>(this.resourcePath+"/users/"+id.toString()+"/Pay");
  }
  getShipmentComplete(id:number){
    return this.http.get<Shipment[]>(this.resourcePath+"/users/"+id.toString()+"/complete");
  }
  editShipment(id:number, shipment:Shipment){
    return this.http.put<Shipment>(this.resourcePath+"/"+id.toString(),shipment)
  }
  getShipment(id:number){
    return this.http.get<Shipment>(this.resourcePath+"/"+id.toString())
  }
  deleteShipment(id:number){
    return this.http.delete<Shipment>(this.resourcePath+"/"+id.toString())
  }
}
