import { NotificationsService } from './../../../../services/notifications.service';
import { Router } from '@angular/router';
import { Shipment } from './../../../../../models/Shipments';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { UserService } from 'src/app/services/user.service';
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort,Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/models/Order';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { User } from 'src/models/User';
import { State } from 'src/models/State';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Notification } from 'src/models/Notification';
@Component({
  selector: 'app-entregas-no-pagadas',
  templateUrl: './entregas-no-pagadas.component.html',
  styleUrls: ['./entregas-no-pagadas.component.css']
})
export class EntregasNoPagadasComponent implements OnInit {
  filtro='none';
  informacion=false;
  displayInfoPro='block';
  displayInfoUser='none';
  oderSelect!:Order;
  eliminacion=false;
  size!:number;
  userFound!:User;
  displayedColumns:string[] = ["originCountry","destinationCountry","destinationCity","limitDate","nameProduct","actions"];
  dataSource = new MatTableDataSource<Shipment>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public breakpointObserver: BreakpointObserver,private orderService:OrderService, private userService:UserService,private _liveAnnouncer: LiveAnnouncer, private shipmentService:ShipmentsService,private router:Router,private notificationService:NotificationsService) {
    this.userService.getUser(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
      (data:User)=>{
          this.userFound=data;
      })
    this.breakpointObserver
    .observe(['(min-width: 1800px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
       this.size=10;
       
      } else {
        this.size=4
      }
    });
   }

   ngAfterViewInit() {
    
  }

  ngOnInit(): void {
    this.shipmentService.getShipmentUserIdNoPay(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
      (data:Shipment[]) => {
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
  showInfoUser(id:number){
    sessionStorage.setItem('Id_Info_User', id.toString());
    this.router.navigate(["/app/perfiluser/comentarios"])
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
  cancelarEncargo(id:number){
   
    this.shipmentService.deleteShipment(id).subscribe(
      {
        next:()=>{
          console.log("Eliminado el Shipment")
          this.addNotification(this.oderSelect.user.id)
          window.location.reload();
        },
        error:()=>{
          console.log("Hay error")
        }
      }
    )
  }
  addNotification(id:number){
    const notification:Notification={
      id:0,
      user:this.userFound,
      title:"Cancelo un encargo",
      description:"Se ha cancelado satisfactoriamente.",
      urlImage:"https://cdn-icons-png.flaticon.com/512/5579/5579454.png",
      viewed:false,
      date:new Date()

    }
    const notification1:Notification={
      id:0,
      user:this.userFound,
      title:"Se cancelo su entrega",
      description:"El courrier cancelo la entrega",
      urlImage:"https://cdn-icons-png.flaticon.com/512/5579/5579454.png",
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
    this.notificationService.addNotification(id,notification1).subscribe(
      {
        next:(data)=>{
          console.log("Notificación Agregada")
          this.changeSizeNotification(id);
          window.location.reload()
        },
        error:(err)=>{
          console.log("No se pudo")
        }
      }
    )
  }
}
