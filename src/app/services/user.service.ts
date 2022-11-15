import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  resourcePath:string = environment.serverJSON+environment.resourceUser;
  constructor(private http:HttpClient) {
    
   }
  
   getUsers(){
      return this.http.get<User[]>(this.resourcePath);
   }
   getUser(id:number){
    return this.http.get<User>(this.resourcePath+"/"+id.toString());
   }
   addUser(user:User){
    return this.http.post<User>(this.resourcePath,user);
   }
   validateUser(username:string,psw:string){
    return this.http.get<User>(this.resourcePath+"/username/"+username+"/password/"+psw);
   }
   editUser(id:number,user:User){
    return this.http.put<User>(this.resourcePath+"/"+id.toString(),user);
   }
   validateRepeatUsername(username:string){
    return this.http.get<User>(this.resourcePath+"/username/"+username);
   }
   changePassword(id:number,user:User){
    return this.http.put<User>(this.resourcePath+"/"+id.toString()+"/password",user);
   }
   changeImage(id:number, user:User){
    return this.http.put<User>(this.resourcePath+"/"+id.toString()+"/image",user);
   }
   changeCont(id:number,user:User){
    return this.http.put<User>(this.resourcePath+"/"+id.toString()+"/cont",user);
   }
}
