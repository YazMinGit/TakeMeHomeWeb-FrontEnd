import { Injectable } from '@angular/core';
import { Support } from 'src/models/Support';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SupportService {
  resourcePath:string = environment.serverJSON+environment.resourceSupport;
  constructor(private http:HttpClient) {

    
   }
   addSupport(id:number,support:Support){
    return this.http.post<Support>(this.resourcePath+"/"+id.toString(),support);
  }  
}
