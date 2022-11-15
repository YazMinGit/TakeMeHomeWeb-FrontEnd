
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Notification } from 'src/models/Notification';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {


  resourcePath:string = environment.serverJSON+environment.resourceNotification;
  constructor(private http:HttpClient) { }
  addNotification(id:number,notification:Notification){
    return this.http.post<Notification>(this.resourcePath+"/"+id.toString(),notification  );
  }
  getNotificationView(id:number){
    return this.http.get<Notification[]>(this.resourcePath+"/"+id.toString());
  }
  editNotification(id:number, notificacion:Notification){
    return this.http.put<Notification>(this.resourcePath+"/"+id.toString(),notificacion); 
  }
  getNotification(id:number){
    return this.http.get<Notification>(this.resourcePath+"/one/"+id.toString());
  }
}
