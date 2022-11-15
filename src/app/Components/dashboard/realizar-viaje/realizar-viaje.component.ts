import { NotificationsService } from './../../../services/notifications.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl,Validators, FormBuilder } from '@angular/forms';
import { UserService } from './../../../services/user.service';
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort,Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/models/Order';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { User } from 'src/models/User';
import { Shipment } from 'src/models/Shipments';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { State } from 'src/models/State';
import { Notification } from 'src/models/Notification';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-realizar-viaje',
  templateUrl: './realizar-viaje.component.html',
  styleUrls: ['./realizar-viaje.component.css']
})
export class RealizarViajeComponent implements OnInit {
 
  myFilter(d: Date | null):boolean{
    const day = (d || new Date());
    // Prevent Saturday and Sunday from being selected.
    return day> new Date();
  }
  size!:number;
  filtro='none';
  informacion=false;
  displayInfoPro='block';
  displayInfoUser='none';
  oderSelect!:Order;
  userFound!:User;
  fechallegada:FormGroup;
  aceptarpedido=false;
  displayedColumns:string[] = ["originCountry","destinationCountry","destinationCity","limitDate","nameProduct","actions"];
  dataSource = new MatTableDataSource<Order>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public breakpointObserver: BreakpointObserver,private orderService:OrderService, private userService:UserService, private shipmentService:ShipmentsService, private fb:FormBuilder, private router:Router, private notificationService:NotificationsService) {
    this.userService.getUser(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
      (data:User)=>{
        this.userFound=data;
      })
      this.fechallegada=this.fb.group({
        fechaLimite:["",[Validators.required]]
      }
      )
   
   
    this.breakpointObserver
    .observe(['(min-width: 1800px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
       this.size=8;
       
      } else {
        this.size=3
      }
    });
   }

   ngAfterViewInit() {
    
  }

  ngOnInit(): void {
    this.orderService.getOrdersFiltradas(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
      (data:Order[]) => {
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );  
  }
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  Informacion(id:number){
    this.informacion=true;
    this.filtro='flex';
    this.orderService.getOrder(id).subscribe(
      (data:Order)=>{
        
        this.oderSelect=data;
      }
    )
  }
  Cerrar(){
    this.informacion=false;
    this.filtro='none';
  }
  announceSortChange(sortState: Sort) {
   
   
  }
  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }
  showInfoUser(id:number){

    sessionStorage.setItem('Id_Info_User', id.toString());
    this.router.navigate(["/app/perfiluser/comentarios"])
  }
  showInfoPed(){
    this.displayInfoUser='none';
    this.displayInfoPro='block';
  }
  avisoShipment(fecha:Date){
     
     this.aceptarpedido=true;
  }
  addShipment(){

      const shipment:Shipment={
        id:0,
        user:this.userFound,
        order:this.oderSelect,
        arrivalDate:this.fechallegada.get("fechaLimite")!.value,
        payment:this.oderSelect.priceProduct + 30,
        paymentDate:new Date("2022/01/01"),
        state:State.Reserved
      }
      this.shipmentService.addShipment(this.userFound.id,this.oderSelect.id, shipment).subscribe({
        next:() =>{
          this.addNotification(this.oderSelect.user.id);
          console.log("Completado")
          this.orderService.getOrdersFiltradas(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
            (data:Order[]) => {
              this.dataSource=new MatTableDataSource(data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          ); 
       
       
        },
        error: () =>{
          console.log("Hay error");
        }
      }
       
      );

  }
  changeSizeNotification(id:number){
    this.userService.getUser(id).subscribe(
      (data:User)=>{
        data.cont=data.cont+1;
        this.userService.changeCont(id,data).subscribe(
          {
            next:(data)=>{
              console.log("Todo bien")
            },
            error:(err)=>{
              console.log("Incorrecto")
            }
          }
        )
      }
    )
  }
  addNotification(id:number){
    const notification:Notification={
      id:0,
      user:this.userFound,
      title:"Acepto una orden",
      description:"Visualizalo en encargos en progreso",
      urlImage:"https://img.freepik.com/vector-premium/avion-ilustracion-caja-paquete-icono-logotipo_9845-321.jpg",
      viewed:false,
      date:new Date()

    }
    const notification1:Notification={
      id:0,
      user:this.userFound,
      title:"Se acepto su orden",
      description:"Visualizalo en pedidos aceptados",
      urlImage:"https://static.vecteezy.com/system/resources/previews/010/153/967/non_2x/tick-icon-accept-approve-sign-design-free-png.png",
      viewed:false,
      date:new Date()

    }
    this.notificationService.addNotification(Number(sessionStorage.getItem('Id_Logged_User')),notification).subscribe(
      {
        next:(data)=>{
          console.log("Notificación Agregada")
          this.changeSizeNotification(Number(sessionStorage.getItem('Id_Logged_User')))
          window.location.reload();
        },
        error:(err)=>{
          console.log("No se pudo")
        }
      }
    )
    this.notificationService.addNotification(id,notification1).subscribe(
      {
        next:(data)=>{
          console.log("Notificación Agregada")
          this.changeSizeNotification(id);
        },
        error:(err)=>{
          console.log("No se pudo")
        }
      }
    )
  }
}
