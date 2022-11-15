import { NotificationsService } from './../../../services/notifications.service';
import { Notification } from './../../../../models/Notification';
import { Shipment } from './../../../../models/Shipments';
import { User } from './../../../../models/User';
import { UserService } from './../../../services/user.service';
import { Order } from './../../../../models/Order';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl,Validators, FormBuilder } from '@angular/forms';

interface Paises {
  value: string;
  viewValue: string;
}
interface PaisesGroup {
  disabled?: boolean;
  name: string;
  pais: Paises[];
}
interface Categoria {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-realizar-pedido',
  templateUrl: './realizar-pedido.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./realizar-pedido.component.css']
})
export class RealizarPedidoComponent implements OnInit {
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date());
    // Prevent Saturday and Sunday from being selected.
    return day>new Date();
  };
  filtroDisplay='none'
  selectedValue!: string;
  aviso=false;
  paisesControl = new FormControl('');
  categorias=new FormControl('');
  userFound!:User;
  paisesGroup: PaisesGroup[]=[
    {
      name:'América del Sur',
      pais:[
        {value:'Argentina', viewValue:'Argentina'},
        {value:'Bolivia', viewValue:'Bolivia'},
        {value:'Brasil', viewValue:'Brasil'},
        {value:'Chile', viewValue:'Chile'},
        {value:'Colombia', viewValue:'Colombia'},
        {value:'Ecuador', viewValue:'Ecuador'},
        {value:'Guyana', viewValue:'Guyana'},
        {value:'Paraguay', viewValue:'Paraguay'},
        {value:'Perú', viewValue:'Perú'},
        {value:'Suriname', viewValue:'Suriname'},
        {value:'Uruguay', viewValue:'Uruguay'},
        {value:'Venezuela', viewValue:'Venezuela'}
      ]
    },

    {
      name:'América del Norte',
      pais:[
        {value:'Canadá', viewValue:'Canadá'},
        {value:'Estados Unidos', viewValue:'Estados Unidos'},
        {value:'México', viewValue:'México'}
      ]
    },


    {
      name:'America Central',
      pais:[
        {value:'Belice', viewValue:'Belice'},
        {value:'Costa Rica', viewValue:'Costa Rica'},
        {value:'El Salvador', viewValue:'El Salvador'},
        {value:'Guatemala', viewValue:'Guatemala'},
        {value:'Honduras', viewValue:'Honduras'},
        {value:'Nicaragua', viewValue:'Nicaragua'},
        {value:'Panamá', viewValue:'Panamá'}
      ]
    },


    {
      name:'Caribe',
      pais:[
        {value:'Antigua y Barbuda', viewValue:'Antigua y Barbuda'},
        {value:'Bahamas', viewValue:'Bahamas'},
        {value:'Barbados', viewValue:'Barbados'},
        {value:'Cuba', viewValue:'Cuba'},
        {value:'Dominica', viewValue:'Dominica'},
        {value:'Granada', viewValue:'Granada'},
        {value:'Haití', viewValue:'Haití'},
        {value:'Jamaica', viewValue:'Jamaica'},
        {value:'Puerto Rico', viewValue:'Puerto Rico'},
        {value:'República Dominicana', viewValue:'República Dominicana'},
        {value:'San Cristóbal y Nieves', viewValue:'San Cristóbal y Nieves'},
        {value:'San Vicente y las Granadinas', viewValue:'San Vicente y las Granadinas'},
        {value:'Santa Lucía', viewValue:'Santa Lucía'},
        {value:'Trinidad y Tobago', viewValue:'Trinidad y Tobago'}
      ]
    },


    {
      name:'Europa',
      pais:[
        {value:'Albania', viewValue:'Albania'},
        {value:'Alemania', viewValue:'Alemania'},
        {value:'Andorra', viewValue:'Andorra'},
        {value:'Austria', viewValue:'Austria'},
        {value:'Azerbaiyán', viewValue:'Azerbaiyán'},
        {value:'Bélgica', viewValue:'Bélgica'},
        {value:'Bielorrusia', viewValue:'Bielorrusia'},
        {value:'Bosnia y Herzegovina / Bosnia-Herzegovina', viewValue:'Bosnia y Herzegovina / Bosnia-Herzegovina'},
        {value:'Bulgaria', viewValue:'Bulgaria'},
        {value:'Chipre', viewValue:'Chipre'},
        {value:'Croacia', viewValue:'Croacia'},
        {value:'Dinamarca', viewValue:'Dinamarca'},
        {value:'Eslovenia', viewValue:'Eslovenia'},
        {value:'España', viewValue:'España'},
        {value:'Estonia', viewValue:'Estonia'},
        {value:'Finlandia', viewValue:'Finlandia'},
        {value:'Francia', viewValue:'Francia'},
        {value:'Grecia', viewValue:'Grecia'},
        {value:'Hungría', viewValue:'Hungría'},
        {value:'Irlanda', viewValue:'Irlanda'},
        {value:'Islandia', viewValue:'Islandia'},
        {value:'Italia', viewValue:'Italia'},
        {value:'Letonia', viewValue:'Letonia'},
        {value:'Liechtenstein', viewValue:'Liechtenstein'},
        {value:'Lituania', viewValue:'Lituania'},
        {value:'Luxemburgo', viewValue:'Luxemburgo'},
        {value:'Macedonia del Norte', viewValue:'Macedonia del Norte'},
        {value:'Malta', viewValue:'Malta'},
        {value:'Moldavia', viewValue:'Moldavia'},
        {value:'Mónaco', viewValue:'Mónaco'},
        {value:'Montenegro', viewValue:'Montenegro'},
        {value:'Noruega', viewValue:'Noruega'},
        {value:'Países Bajos', viewValue:'Países Bajos'},
        {value:'Polonia', viewValue:'Polonia'},
        {value:'Portugal', viewValue:'Portugal'},
        {value:'Reino Unido', viewValue:'Reino Unido'},
        {value:'República Checa', viewValue:'República Checa'},
        {value:'Rumania / Rumanía', viewValue:'Rumania / Rumanía'},
        {value:'Rusia', viewValue:'Rusia'},
        {value:'San Marino', viewValue:'San Marino'},
        {value:'Serbia', viewValue:'Serbia'},
        {value:'Suecia', viewValue:'Suecia'},
        {value:'Suiza', viewValue:'Suiza'},
        {value:'Ucrania', viewValue:'Ucrania'},
        {value:'Ciudad del Vaticano', viewValue:'Ciudad del Vaticano'}
      ]
      
    },

    {
      name:'Asia',
      pais:[
        {value:'Afganistan', viewValue:'Afganistan'},
        {value:'Arabia Saudita / Arabia Saudí', viewValue:'Arabia Saudita / Arabia Saudí'},
        {value:'Armenia', viewValue:'Armenia'},
        {value:'Azerbaiyán', viewValue:'Azerbaiyán'},
        {value:'Bangladés', viewValue:'Bangladés'},
        {value:'Baréin', viewValue:'Baréin'},
        {value:'Birmania / Myanmar', viewValue:'Birmania / Myanmar'},
        {value:'Brunei', viewValue:'Brunei'},
        {value:'Bután', viewValue:'Bután'},
        {value:'Camboya', viewValue:'Camboya'},
        {value:'Catar', viewValue:'Catar'},
        {value:'China', viewValue:'China'},
        {value:'Corea del Norte', viewValue:'Corea del Norte'},
        {value:'Corea del Sur', viewValue:'Corea del Sur'},
        {value:'Emiratos Árabes Unidos', viewValue:'Emiratos Árabes Unidos'},
        {value:'Filipinas', viewValue:'Filipinas'},
        {value:'Georgia', viewValue:'Georgia'},
        {value:'India', viewValue:'India'},
        {value:'Indonesia', viewValue:'Indonesia'},
        {value:'Irak', viewValue:'Irak'},
        {value:'Irán', viewValue:'Irán'},
        {value:'Israel', viewValue:'Israel'},
        {value:'Japón', viewValue:'Japón'},
        {value:'Jordania', viewValue:'Jordania'},
        {value:'Kazajistán', viewValue:'Kazajistán'},
        {value:'Kirguistán', viewValue:'Kirguistán'},
        {value:'Kuwait', viewValue:'Kuwait'},
        {value:'Laos', viewValue:'Laos'},
        {value:'Líbano', viewValue:'Líbano'},
        {value:'Malasia', viewValue:'Malasia'},
        {value:'Maldivas', viewValue:'Maldivas'},
        {value:'Mongolia', viewValue:'Mongolia'},
        {value:'Nepal', viewValue:'Nepal'},
      {value:'Omán', viewValue:'Omán'},
      {value:'Pakistán', viewValue:'Pakistán'},
      {value:'Rusia', viewValue:'Rusia'},
      {value:'Singapur', viewValue:'Singapur'},
      {value:'Sri Lanka', viewValue:'Sri Lanka'},
      {value:'Tailandia', viewValue:'Tailandia'},
      {value:'Tayikistán', viewValue:'Tayikistán'},
      {value:'Timor Oriental', viewValue:'Timor Oriental'},
      {value:'Turkmenistán', viewValue:'Turkmenistán'},
      {value:'Turquía', viewValue:'Turquía'},
      {value:'Uzbekistán', viewValue:'Uzbekistán'},
      {value:'Vietnam', viewValue:'Vietnam'},
      {value:'Yemen', viewValue:'Yemen'}
    ]
    
  },

  {
    name:'África',
    pais:[
      {value:'Angola', viewValue:'Angola'},
      {value:'Argelia', viewValue:'Argelia'},
      {value:'Benín', viewValue:'Benín'},
      {value:'Botsuana', viewValue:'Botsuana'},
      {value:'Burkina Faso', viewValue:'Burkina Faso'},
      {value:'Burundi', viewValue:'Burundi'},
      {value:'Cabo Verde', viewValue:'Cabo Verde'},
      {value:'Camerún', viewValue:'Camerún'},
      {value:'República Centroafricana', viewValue:'República Centroafricana'},
      {value:'Chad', viewValue:'Chad'},
      {value:'Comoras', viewValue:'Comoras'},
      {value:'República del Congo', viewValue:'República del Congo'},
      {value:'República Democrática del Congo', viewValue:'República Democrática del Congo'},
      {value:'Costa de Marfil', viewValue:'Costa de Marfil'},
      {value:'Egipto', viewValue:'Egipto'},
      {value:'Eritrea', viewValue:'Eritrea'},
      {value:'Etiopía', viewValue:'Etiopía'},
      {value:'Gabón', viewValue:'Gabón'},
      {value:'Gambia', viewValue:'Gambia'},
      {value:'Ghana', viewValue:'Ghana'},
      {value:'Guinea', viewValue:'Guinea'},
      {value:'Guinea-Bisáu', viewValue:'Guinea-Bisáu'},
      {value:'Guinea Ecuatorial', viewValue:'Guinea Ecuatorial'},
      {value:'Kenia', viewValue:'Kenia'},
      {value:'Lesoto', viewValue:'Lesoto'},
      {value:'Liberia', viewValue:'Liberia'},
      {value:'Libia', viewValue:'Libia'},
      {value:'Madagascar', viewValue:'Madagascar'},
      {value:'Malaui', viewValue:'Malaui'},
      {value:'Mali / Malí', viewValue:'Mali / Malí'},
      {value:'Marruecos', viewValue:'Marruecos'},
      {value:'Mauricio', viewValue:'Mauricio'},
      {value:'Mauritania', viewValue:'Mauritania'},
      {value:'Mozambique', viewValue:'Mozambique'},
      {value:'Namibia', viewValue:'Namibia'},
      {value:'República de Níger', viewValue:'República de Níger'},
      {value:'Nigeria', viewValue:'Nigeria'},
      {value:'Ruanda', viewValue:'Ruanda'},
      {value:'Senegal', viewValue:'Senegal'},
      {value:'Seychelles', viewValue:'Seychelles'},
      {value:'Sierra Leona', viewValue:'Sierra Leona'},
      {value:'Somalia', viewValue:'Somalia'},
      {value:'Suazilandia / Esuatini', viewValue:'Suazilandia / Esuatini'},
      {value:'Sudáfrica', viewValue:'Sudáfrica'},
      {value:'Sudán', viewValue:'Sudán'},
      {value:'Sudán del Sur', viewValue:'Sudán del Sur'},
      {value:'Tanzania', viewValue:'Tanzania'},
      {value:'Togo', viewValue:'Togo'},
      {value:'Túnez', viewValue:'Túnez'},
      {value:'Uganda', viewValue:'Uganda'},
      {value:'Yemen', viewValue:'Yemen'},
      {value:'Yibuti', viewValue:'Yibuti'},
      {value:'Zambia', viewValue:'Zambia'},
      {value:'Zimbabue', viewValue:'Zimbabue'}
    ]
    
  },

  {
    name:'Oceanía',
    pais:[
      {value:'Australia', viewValue:'Australia'},
      {value:'Fiyi', viewValue:'Fiyi'},
      {value:'Kiribati', viewValue:'Kiribati'},
      {value:'Islas Marshall', viewValue:'Islas Marshall'},
      {value:'Micronesia', viewValue:'Micronesia'},
      {value:'Nauru', viewValue:'Nauru'},
      {value:'Palaos', viewValue:'Palaos'},
      {value:'Papúa Nueva Guinea', viewValue:'Papúa Nueva Guinea'},
      {value:'Islas Salomón', viewValue:'Islas Salomón'},
      {value:'Samoa', viewValue:'Samoa'},
      {value:'Tonga', viewValue:'Tonga'},
      {value:'Tuvalu', viewValue:'Tuvalu'},
      {value:'Vanuatu', viewValue:'Vanuatu'}
    ]
    
  }
]
categories: Categoria[] = [
  {value: 'Tecnologia', viewValue: 'Tecnología'},
  {value: 'Cuidado Personal', viewValue: 'Cuidado Personal'},
  {value: 'Juguete', viewValue: 'Juguetes'},
  {value: 'Accesorio', viewValue: 'Accesorio'},
  {value: 'Calzado', viewValue: 'Calzado'}
];
ubicacionDestino:FormGroup;
ubicacionOrigen:FormGroup;
producto:FormGroup;
id:number;
  constructor(private _formBuilder: FormBuilder, private orderService:OrderService,private userService:UserService, private notificationService:NotificationsService) {
      this.id=Number(sessionStorage.getItem('Id_Logged_User'));
      this.ubicacionDestino=this._formBuilder.group(
        {
          paisDestino:["",[Validators.required]],
          ciudadDestino:["",[Validators.required]],
          direccionDestino:["",[Validators.required]],
          fechaLimite:["",[Validators.required]]
        }
      )
      this.ubicacionOrigen=this._formBuilder.group(
        {
          paisOrigen:["",[Validators.required]],
          ciudadOrigen:["",[Validators.required]],
         
        }
      )
      this.producto=this._formBuilder.group(
        {
          urlProducto:["",[Validators.required]],
          nombreProducto:["",[Validators.required]],
          precioProducto:["",[Validators.required]],
          categoriaProducto:["",[Validators.required]],
          dimensionesProducto:["",[Validators.required]]
        }
      )
      //id de la persona logeada a la que quiero que le llegue las notis sessionStorage.getItem('Id_Logged_User')) 
      this.userService.getUser(Number(sessionStorage.getItem('Id_Logged_User')) ).subscribe(
        (data:User)=>{
          this.userFound=data;
        }
    )
  }

  ngOnInit(): void {
  }
  deletePedido(id:number){
    
  }
  changeSizeNotification(){
    this.userService.getUser(Number(sessionStorage.getItem('Id_Logged_User'))).subscribe(
      (data:User)=>{
        data.cont=data.cont+1;
        this.userService.changeCont(Number(sessionStorage.getItem('Id_Logged_User')),data).subscribe(
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
  saveOrder(){
  
    const shipment:Shipment={
      id:0,
      state: 1,
      payment: 34,
      paymentDate:new Date("1971/08/25"),
      arrivalDate:new Date("1971/08/25"),
      order: null,
      user:this.userFound
    }
    console.log(this.userFound);
    const order:Order = {
      id:0,
      limitDate:this.ubicacionDestino.get("fechaLimite")!.value ,
      destinationCountry:this.ubicacionDestino.get("paisDestino")!.value,
      destinationCity:this.ubicacionDestino.get("ciudadDestino")!.value,
      destinationAddress:this.ubicacionDestino.get("direccionDestino")!.value,
      originCountry:this.ubicacionOrigen.get("paisOrigen")!.value,
      originCity:this.ubicacionOrigen.get("ciudadOrigen")!.value,
      nameProduct:this.producto.get("nombreProducto")!.value,
      priceProduct:this.producto.get("precioProducto")!.value,
      urlProduct:this.producto.get("urlProducto")!.value,
      dimensionsProduct:this.producto.get("dimensionesProducto")!.value,
      categoryProduct:this.producto.get("categoriaProducto")!.value,
      user:this.userFound,
      shipment:shipment,
      
    }
    console.log(order)
    this.orderService.addOrder(this.id,order).subscribe({
      next:(data) =>{
       
        console.log("Completado");
        const notification:Notification={
          id:0,
          user:this.userFound,
          title:"Se agrego una orden",
          description:"Visualizalo en pedidos en progreso",
          urlImage:"https://png.pngtree.com/png-vector/20220919/ourlarge/pngtree-package-received-png-image_6206891.png",
          viewed:false,
          date:new Date()

        }
        console.log(notification)
        this.notificationService.addNotification(Number(sessionStorage.getItem('Id_Logged_User')), notification).subscribe(
        {
          next:(data)=>{
            console.log("Notificacion Agregada")
            this.changeSizeNotification();
            window.location.reload();
          },
          error:(err)=>{
            console.log("Problemas")
          }
        }
        )
      
     
      },
      error: (err) =>{
        console.log("Hay error");
      }
    })}
      
    
   
 
    
}
