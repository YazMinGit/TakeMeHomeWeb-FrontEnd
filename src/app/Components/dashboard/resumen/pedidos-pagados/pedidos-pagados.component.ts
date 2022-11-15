import { Router } from '@angular/router';
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
import { bufferToggle } from 'rxjs';
@Component({
  selector: 'app-pedidos-pagados',
  templateUrl: './pedidos-pagados.component.html',
  styleUrls: ['./pedidos-pagados.component.css']
})
export class PedidosPagadosComponent implements OnInit {

  paymentDetail=false;
  filtro='none';
  informacion=false;
  colorEstate='red'
  displayInfoPro='block';
  displayInfoUser='none';
  size!:number;
  oderSelect!:Order;
  shipmentSelect!:Shipment;
  displayedColumns:string[] = ["originCountry","destinationCountry","limitDate","nameProduct","estado","actions"];
  dataSource = new MatTableDataSource<Order>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  payForm:FormGroup;
  constructor(public breakpointObserver: BreakpointObserver,private orderService:OrderService, private userService:UserService,private _liveAnnouncer: LiveAnnouncer, private fb:FormBuilder,private shipmentsService:ShipmentsService,private router:Router) {
     this.payForm=this.fb.group({
      cardNumber:["",[Validators.required]],
      cardHolderName:["",[Validators.required]]
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
    this.orderService.getOrdersFiltradasShipmentsPay(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
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
  
  showInfoPed(){
    this.displayInfoUser='none';
    this.displayInfoPro='block';
  }
  editShipment(id:number){
    this.shipmentsService.getShipment(id).subscribe(
      (data:Shipment)=>{
        console.log(data)
        data.paymentDate=new Date();
        data.state=State.Shipping;
        this.shipmentsService.editShipment(id,data).subscribe(
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
  
}
