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
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs=pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.component.html',
  styleUrls: ['./historial-cliente.component.css']
})
export class HistorialClienteComponent implements OnInit {

 
  paymentDetail=false;
  filtro='none';
  informacion=false;
  colorEstate='red'
  displayInfoPro='block';
  displayInfoUser='none';
  size!:number;
  oderSelect!:Order;
  shipmentSelect!:Shipment;
  displayedColumns:string[] = ["originCountry","username","limitDate","nameProduct","estado","actions"];
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
  createPdf(id:number){
    this.shipmentsService.getShipment(id).subscribe(
      (data:Shipment)=>{
        this.shipmentSelect=data;
      }
    )
    
    var options = { year: 'numeric', month: 'long', day: 'numeric' };

    const pdfDefinition:any={
      content:[
        {
          text:'TakemeHome',
          style:'header',
          margin: [0, 10,0,40],
        },
        {
          columns:[
            {
              text:'Nombre del Cliente: '+this.oderSelect.user.name,
          style:'bigger',
          margin: [0, 0,0,20],
            },
            {
              text:'Fecha de pago: '+new Date(this.oderSelect.shipment.paymentDate).getDate()+'/'+new Date(this.oderSelect.shipment.paymentDate).getMonth()+"/"+new Date(this.oderSelect.shipment.paymentDate).getFullYear(),
              style:'bigger',
              alignment: 'right',
            }
          ]
          
          
        },
        {
          style: 'tableExample',
          table: {
              widths: [100, 120,100,100,60],
            heights: [20, 10, 10],
            body: [
              ['Nombre del producto','País de origen', 'País de destino','Fecha Limite','Precio ($)'],
              [this.oderSelect.nameProduct,this.oderSelect.originCountry,this.oderSelect.destinationCountry,new Date(this.oderSelect.limitDate).getDate()+'/'+new Date(this.oderSelect.limitDate).getMonth()+"/"+new Date(this.oderSelect.limitDate).getFullYear(),this.shipmentSelect.payment],
              [{text: 'Total', style: 'tableHeader', colSpan: 4, alignment: 'left'},{},{},{},{text: this.shipmentSelect.payment, alignment: 'rigth'}]
            
            ]
          }
        },
        {
          text:'Estado del envio: '+this.oderSelect.shipment.state,
          bold:'true',
          margin: [0, 10,0,10],
            
        },
        {
          text:'Envio realizado por: '+this.shipmentSelect.user.name,
          bold:'true',
          margin: [0, 0,0,10],
        },
     
      ],
      styles: {
        header: {
          fontSize: 25,
          bold: true
        },
        bigger: {
          fontSize: 13,
          italics: true,
          bold:true
        }
      }
    }
    
    const pdf=pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }
  
}
