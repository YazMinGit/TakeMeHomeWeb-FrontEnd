
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  ruta:string = environment.serverJSON+environment.resourceUsers;


  constructor(private http:HttpClient) { }
  addUser(user: User) {
    
    return this.http.post<User>(this.ruta,user);

    //return this.http.post<User>("http://localhost:3000/users",user);
    
    //this.employees.unshift(employee);
  }
 
  getUsers() {
   
    return this.http.get<User[]>(this.ruta);

    //return this.http.get<User[]>("http://localhost:3000/users");
  }
  getUser(id: number) {

    return this.http.get<User>(this.ruta+"/"+id.toString());

    //return this.http.get<User>("http://localhost:3000/users"+"/"+id.toString());

    //return this.employees.slice();
  }


  updateUser(user: User) {

    return this.http.put<User>(this.ruta+"/"+user.id.toString(),user);

    //return this.http.put<User>("http://localhost:3000/users"+"/"+user.id.toString(),user);

    //this.employees.unshift(employee);
  }

  deleteUser(id: number) {
    
    return this.http.delete(this.ruta+"/"+id.toString());
    
    //return this.http.delete("http://localhost:3000/user"+"/"+id.toString());

    //this.employees.unshift(employee);
  }
 
}
