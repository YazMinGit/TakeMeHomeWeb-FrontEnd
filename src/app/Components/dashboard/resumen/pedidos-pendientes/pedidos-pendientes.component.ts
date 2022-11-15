import { NotificationsService } from './../../../../services/notifications.service';

import { UserService } from 'src/app/services/user.service';
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort,Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/models/Order';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { User } from 'src/models/User';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Notification } from 'src/models/Notification';
@Component({
  selector: 'app-pedidos-pendientes',
  templateUrl: './pedidos-pendientes.component.html',
  styleUrls: ['./pedidos-pendientes.component.css']
})
export class PedidosPendientesComponent implements OnInit {
  filtro='none';
  informacion=false;
  displayInfoPro='block';
  displayInfoUser='none';
  oderSelect!:Order;
  eliminacion=false;
  size!:number;
  userFound!:User;
  displayedColumns:string[] = ["originCountry","destinationCountry","destinationCity","limitDate","nameProduct","actions"];
  dataSource = new MatTableDataSource<Order>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public breakpointObserver: BreakpointObserver,private orderService:OrderService, private userService:UserService,private _liveAnnouncer: LiveAnnouncer,private notificationService:NotificationsService) {
    this.breakpointObserver
    .observe(['(min-width: 1800px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
       this.size=10;
       
      } else {
        this.size=4
      }
    });
    this.userService.getUser(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
      (data:User)=>{
          this.userFound=data;
      })
   }

   ngAfterViewInit() {
    
  }

  ngOnInit(): void {
    this.orderService.getOrdersFiltradasNoShipments(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
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
   
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }
  showInfoUser(){
      this.displayInfoUser='block';
      this.displayInfoPro='none';
  }
  showInfoPed(){
    this.displayInfoUser='none';
    this.displayInfoPro='block';
  }
  deletePedido(id:number){
    this.orderService.deleteOrder(id).subscribe({
      next:(data) =>{
       
        console.log("Completado")
        this.orderService.getOrdersFiltradasNoShipments(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
          (data:Order[]) => {
            this.addNotification()
          }
        
        );  
          this.informacion=false;
          this.filtro="none"
      },
      error: (err) =>{
        console.log("Hay error");
      }
    }
    
    )
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
  addNotification(){
    const notification:Notification={
      id:0,
      user:this.userFound,
      title:"Elimino una orden",
      description:"Se ha eliminado satisfactoriamente tu orden",
      urlImage:"https://cdn-icons-png.flaticon.com/128/5164/5164018.png",
      viewed:false,
      date:new Date()

    }
    this.notificationService.addNotification(Number(sessionStorage.getItem('Id_Logged_User')),notification).subscribe(
      {
        next:(data)=>{
          console.log("Notificación Agregada")
          this.changeSizeNotification(Number(sessionStorage.getItem('Id_Logged_User')));
          window.location.reload()
        },
        error:(err)=>{
          console.log("No se pudo")
        }
      }
    )
  }
}
