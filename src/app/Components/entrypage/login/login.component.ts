import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { User } from 'src/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:FormGroup;
  hide=true;
  aviso=false;
  exito=false;
  flexFiltro='none';
  constructor(private fb: FormBuilder, private userService:UserService, private router:Router
  ) { 
    this.login=this.fb.group({
    
      username:["",[Validators.required]],
      password:["",[Validators.required]],
    
    })
   }
  

  ngOnInit(): void {
  }
  validateUser(){
    this.userService.validateUser(this.login.get("username")?.value,this.login.get("password")?.value).subscribe({
      next:(data)=>{
        console.log("Encontrado");
        
        this.exito=true;
        this.flexFiltro='flex';
        sessionStorage.setItem('Id_Logged_User', data.id.toString());
        console.log(sessionStorage.getItem('Id_Logged_User'))
      },
      error:(err)=>{
        console.log("No encontrado")
        this.flexFiltro='flex';
        this.aviso=true;
      }
    }
      
    )
  }
  cambiarFlex(){
    this.flexFiltro='none';
  }
}
