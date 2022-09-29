import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  iduser:number=0;
  mensaje:string;
  nombre:string="";
  constructor(private userService:UserService) { 
    this.iduser=Number(sessionStorage.getItem('Id_Logged_User'));
    this.mensaje="50% DE DESCUENTO EN LOS ENVIOS TODO EL MES DE SETIEMBRE";
  }

  ngOnInit(): void {
    this.getUsuarioPedido();
  }
  getUsuarioPedido(){
   const idusuario=this.iduser;
    this.userService.getUser(idusuario).subscribe(
       (data:User) => {
          this.nombre=data.name;
      }
    ); 

 }
}
