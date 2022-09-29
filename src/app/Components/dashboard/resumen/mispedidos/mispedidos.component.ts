import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import { PedidoService } from 'src/app/services/pedido.service';
import {Pedido} from 'src/app/models/pedido'
import { ArrayBindingElement } from 'typescript';
import { ArrayDataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator'
import { UserService } from 'src/app/services/user.service';
import {User} from 'src/app/models/user';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
@Component({
  selector: 'app-mispedidos',
  templateUrl: './mispedidos.component.html',
  styleUrls: ['./mispedidos.component.css']
})
export class MispedidosComponent implements OnInit {
  displayedColumns:string[] = ["nameProd","categoria","precio","estado","actions"];
  dataSource = new MatTableDataSource<Pedido>();
  nombreCompleto:string="";
  correo:string="";
  telefono:number=0;
  pais:string="";
  ciudad:string="";
  direcccion:string="";
  nombreProducto:string="";
  precioProducto:number=0;
  urlProducto:string="";
  filtradoUser:Pedido[]=[];
  constructor(private pedidoService:PedidoService,private userService:UserService) { 
    
  }


  ngOnInit(): void {
    this.getPedidos();
  }
  getPedidos() {

    this.pedidoService.getPedido().subscribe(
      (data:Pedido[]) => {
          this.filtradoUser=data.filter(
              servicio=> servicio.idCliente==Number(sessionStorage.getItem('Id_Logged_User'))
          )
          this.dataSource=new MatTableDataSource(this.filtradoUser);
          console.log(this.dataSource)
      }
    );  
  }
  applyFilter(event: Event) {
    let filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLocaleLowerCase();
   
  }
  getUsuarioPedido(id:string){
    const idusuario=Number(id);
    this.userService.getUser(idusuario).subscribe(
      (data:User) => {
        this.nombreCompleto=data.name + " "+ data.lastname;
        this.correo=data.name;
        this.telefono=data.phone;
        console.log(this.nombreCompleto);
      }
    ); 
    console.log(this.nombreCompleto)

  }
  getPedido(id:string){
    const idpedio=Number(id);
    this.pedidoService.getPedidos(idpedio).subscribe(
      (data:Pedido) => {
        this.pais=data.paisRecibe;
        this.ciudad=data.ciudad;
        this.direcccion=data.direccion;
        this.nombreProducto=data.nameProd;
        this.precioProducto=data.precio;
        this.urlProducto=data.url;

      }
    ); 
    console.log(this.nombreCompleto)
 
  }
  
  deletePedido(id: number):void {
    this.pedidoService.deletePedido(id).subscribe({
      next: (data) => {
        this.getPedidos();
      }, 
      error: (err) => {
        console.log(err);
      }
    })
  }

}
