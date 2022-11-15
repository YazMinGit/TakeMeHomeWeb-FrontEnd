import { SupportService } from './../../../services/support.service';
import { User } from './../../../../models/User';
import { UserService } from './../../../services/user.service';

import { Component, OnInit } from '@angular/core';
import { Support } from 'src/models/Support';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.css']
})
export class SoporteComponent implements OnInit {
  soporte:FormGroup;
  user!:User;
  aparicion=false;
  constructor(private fb:FormBuilder, private userService:UserService, private soporteService:SupportService) {
      this.soporte=this.fb.group({
        mensaje:["",[Validators.required]]
      }

      )
      this.userService.getUser(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
        (data:User)=>{
            this.user=data;
        })
   }

  ngOnInit(): void {
  }
  enviarSoporte(){
     const soportemsg:Support={
      id:0,
      user:this.user,
      comment:this.soporte.get("mensaje")!.value,
      date:new Date()
     }
     this.soporteService.addSupport(Number(sessionStorage.getItem('Id_Logged_User')),soportemsg).subscribe(
      {
        next:(data:Support)=>{
          console.log("Guardado")
        },
        error:(err)=>{
          console.log("Error")
        }
      }
     )
  }
  refrescar(){
    window.location.reload()
  }
}
