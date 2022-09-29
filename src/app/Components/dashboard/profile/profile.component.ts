import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import {FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  update:FormGroup;
  id:number;
  step = 0;
  user:User;
  nombrecompleto:string;
  nombre:string;
  apellido:string;
  correo:string;
  telefono:number;
  fecha_nac:string;
  pais:string;
  contraseña:string;
  constructor(private userService:UserService,private router:Router,
    private activatedRouter: ActivatedRoute,private fb: FormBuilder) { 
      if(sessionStorage.getItem('Id_Logged_User')!=undefined){
        this.id=Number(sessionStorage.getItem('Id_Logged_User'));
      }
      this.getUser();
      this.update=this.fb.group({
        telefono:["",[Validators.required]],
        usuario:["",[Validators.required]],
      })
     
    }

  ngOnInit(): void {
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  getUser(){
    this.userService.getUser(this.id).subscribe(
      (data:User) => {
        this.user=data;
        this.nombrecompleto=this.user.name+" "+this.user.lastname;
        this.correo=this.user.email;
        this.telefono=this.user.phone;
        this.pais=this.user.pais;
        this.fecha_nac=this.user.fecha;
        this.contraseña=this.user.contraseña;
      }
    )
  }
  editUser(){
    const user:User = {
      id:this.id,
      name: this.user.name,
      lastname:this.user.lastname,
      email:this.update.get("usuario")!.value,
      fecha:this.user.fecha,
      phone:this.update.get("telefono")!.value,
      pais:this.user.pais,
      contraseña:this.contraseña,
    }
    this.userService.updateUser(user).subscribe({
      next: (data) => {
        console.log("Usuario editado")
      },
      error: (err) => {
        console.log(err);
      }
    }
  )
  this.router.navigate(['/dashboard']);
    this.router.navigate(['/dashboard/perfil']);
  }
}
