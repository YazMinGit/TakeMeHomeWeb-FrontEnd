import {AfterViewInit,ViewChild,Component, OnInit } from '@angular/core';
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
interface Categoria {
  value: string;
  viewValue: string;
}
interface Paises {
  value: string;
  viewValue: string;
}
interface PaisesGroup {
  disabled?: boolean;
  name: string;
  pais: Paises[];
} 
@Component({
  selector: 'app-realizarviaje',
  templateUrl: './realizarviaje.component.html',
  styleUrls: ['./realizarviaje.component.css']
})
export class RealizarviajeComponent implements OnInit {
  listapedidos:Pedido[] = [];
  descripcion=false;
  selectedValue: string;
  paisesControl = new FormControl('');
  dataSource = new MatTableDataSource<Pedido>();
  displayedColumns:string[] = ["paisTrae","paisRecibe","fechaLimite","nameProd","actions"];
  nombreCompleto:string="";
  correo:string="";
  telefono:number=0;
  pais:string="";
  ciudad:string="";
  direcccion:string="";
  nombreProducto:string="";
  precioProducto:number=0;
  urlProducto:string="";
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private pedidoService:PedidoService, private userService:UserService) { 

    this.getPedidos();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  
  }
  descripcionActive(){
    this.descripcion=true;

  }
  descripcionOff(){
    this.descripcion=false;

  }
  getPedidos() {

    this.pedidoService.getPedido().subscribe(
      (data:Pedido[]) => {
        this.dataSource=new MatTableDataSource(data);
      }
    );  
  }
  applyFilter(event: Event) {
    let filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getUsuarioPedido(id:string){
    const idusuario=Number(id);
    this.userService.getUser(idusuario).subscribe(
      (data:User) => {
        this.nombreCompleto=data.name + " "+ data.lastname;
        this.correo=data.email;
        this.telefono=data.phone;
        console.log(this.nombreCompleto);
      }
    ); 
    console.log(this.nombreCompleto)
    this.descripcion=true;
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
    this.descripcion=true;
  }
}
