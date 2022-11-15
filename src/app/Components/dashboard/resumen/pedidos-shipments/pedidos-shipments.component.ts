import { Router } from '@angular/router';
import { NotificationsService } from './../../../../services/notifications.service';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Shipment } from './../../../../../models/Shipments';
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
  selector: 'app-pedidos-shipments',
  templateUrl: './pedidos-shipments.component.html',
  styleUrls: ['./pedidos-shipments.component.css']
})
export class PedidosShipmentsComponent implements OnInit {
  avisoExito=false;
  avisoError=false;
  pswConfirm=false;
  user!:User;
  passwordForm:FormGroup;
  hide = true;
  paymentDetail=false;
  filtro='none';
  informacion=false;
  displayInfoPro='block';
  cancelandoPedido=false;
  displayInfoUser='none';
  size!:number;
  oderSelect!:Order;
  shipmentSelect!:Shipment;
  displayedColumns:string[] = ["originCountry","destinationCountry","destinationCity","limitDate","nameProduct","actions"];
  dataSource = new MatTableDataSource<Order>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  payForm:FormGroup;
  userFound!:User;
  
  constructor(public breakpointObserver: BreakpointObserver,private orderService:OrderService, private userService:UserService,private _liveAnnouncer: LiveAnnouncer, private fb:FormBuilder,private shipmentsService:ShipmentsService, private notificationService:NotificationsService,private router:Router) {
    this.userService.getUser(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
      (data:User)=>{
          this.userFound=data;
      })
     this.payForm=this.fb.group({
      cardNumber:["",[Validators.required]],
      cardHolderName:["",[Validators.required]],
      month:["",[Validators.required,Validators.maxLength(2)]],
      year:["",[Validators.required,Validators.maxLength(4)]],
      cvv:["",[Validators.required]]
     })
     this.passwordForm=this.fb.group(
      {
        password:["",[Validators.required]]
      }
     )
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
    this.orderService.getOrdersFiltradasShipments(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
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
    this.orderService.getOrderComplete(id).subscribe(
      (data:Order)=>{
        
        this.oderSelect=data;
        
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
  
 
  cancelarPedido(id:number,idCurrier:number){
   
    this.shipmentsService.deleteShipment(id).subscribe(
      {
        next:()=>{
          console.log("Eliminado el Shipment")
          this.addNotification(idCurrier);
          window.location.reload();
        },
        error:()=>{
          console.log("Hay error")
        }
      }
    )
  }
  editShipment(id:number){
    this.userService.getUser(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe((data:User)=>{
      this.user=data;
      if(this.user.password==this.passwordForm.get("password")!.value){
        this.shipmentsService.getShipment(id).subscribe(
          (data:Shipment)=>{
            console.log(data)
            data.paymentDate=new Date();
            data.state=State.Shipping;
            this.shipmentsService.editShipment(id,data).subscribe(
              {
                next:(data)=>{
                  console.log("Editado");
                  this.addNotificationPay(data.user.id);
                  this.avisoExito=true;
                },
                error:(err)=>{
                  console.log("Hay error")  
                }
              }
            )
          }
        )   
      }
      else{
        console.log("No Validado")
        this.avisoError=true;
      
      }
    })
  }
  refrescar(){
    window.location.reload()
  }

  addNotification(id:number){
    const notification:Notification={
      id:0,
      user:this.userFound,
      title:"Cancelo una orden",
      description:"Se ha cancelado satisfactoriamente",
      urlImage:"https://cdn-icons-png.flaticon.com/512/5579/5579454.png",
      viewed:false,
      date:new Date()

    }
    const notification1:Notification={
      id:0,
      user:this.userFound,
      title:"Se cancelo la entrega",
      description:"El usuario cancelo la entrega",
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
  addNotificationPay(id:number){
    const notification:Notification={
      id:0,
      user:this.userFound,
      title:"Se realizo el pago del encargo",
      description:"Visualizalo en encargos pagados",
      urlImage:"https://cdn-icons-png.flaticon.com/512/1019/1019607.png",
      viewed:false,
      date:new Date()

    }
    const notification1:Notification={
      id:0,
      user:this.userFound,
      title:"Se realizo el pago de su orden",
      description:"Visualizalo en pedidos pagados",
      urlImage:"https://cdn.iconscout.com/icon/free/png-256/pay-by-card-1841995-1564911.png",
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
          this.changeSizeNotification(id);
        },
        error:(err)=>{
          console.log("No se pudo")
        }
      }
    )
  }
}
