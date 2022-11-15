import { Router } from '@angular/router';
import { Shipment } from 'src/models/Shipments';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { UserService } from 'src/app/services/user.service';
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort,Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/models/Order';
import { Notification } from 'src/models/Notification';
import { User } from 'src/models/User';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { State } from 'src/models/State';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-entregas-pagadas',
  templateUrl: './entregas-pagadas.component.html',
  styleUrls: ['./entregas-pagadas.component.css']
})
export class EntregasPagadasComponent implements OnInit {

  filtro='none';
  informacion=false;
  displayInfoPro='block';
  displayInfoUser='none';
  oderSelect!:Order;
  size!:number;
  userFound!:User;
  displayedColumns:string[] = ["originCountry","destinationCountry","limitDate","nameProduct","state","actions"];
  dataSource = new MatTableDataSource<Shipment>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public breakpointObserver: BreakpointObserver,private shipmentService:ShipmentsService,private orderService:OrderService,private router:Router,private userService:UserService, private notificationService:NotificationsService) {
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
    this.shipmentService.getShipmentUserIdPay(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
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

  showInfoUser(id:number){
    sessionStorage.setItem('Id_Info_User', id.toString());
    this.router.navigate(["/app/perfiluser/comentarios"])
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
  editShipment(id:number){
    this.shipmentService.getShipment(id).subscribe(
      (data:Shipment)=>{
        console.log(data)

        data.state=State.Delivered;
        this.shipmentService.editShipment(id,data).subscribe(
          {
            next:(data)=>{
              console.log("Editado");
              
            },
            error:(err)=>{
              console.log("Hay error")  
            }
          }
        )
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
  addNotificationPay(id:number){
    const notification:Notification={
      id:0,
      user:this.userFound,
      title:"Se realizo el envio",
      description:"Visualizalo en el estado de tu pedido. Disfrutelo.",
      urlImage:"https://cdn-icons-png.flaticon.com/512/8266/8266571.png",
      viewed:false,
      date:new Date()

    }
    const notification1:Notification={
      id:0,
      user:this.userFound,
      title:"Ha realizado el envio del pedido",
      description:"Muchas gracias por colaborar",
      urlImage:"https://cdn-icons-png.flaticon.com/512/3269/3269520.png",
      viewed:false,
      date:new Date()

    }
    this.notificationService.addNotification(Number(sessionStorage.getItem('Id_Logged_User')),notification1).subscribe(
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
    this.notificationService.addNotification(id,notification).subscribe(
      {
        next:(data)=>{
          console.log("Notificación Agregada")
          this.changeSizeNotification(id)
     
        },
        error:(err)=>{
          console.log("No se pudo")
        }
      }
    )
  }
  
}
