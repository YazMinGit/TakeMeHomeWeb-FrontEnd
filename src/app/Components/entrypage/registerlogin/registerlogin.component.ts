import { User } from './../../../models/user';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit,Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { textChangeRangeIsUnchanged } from 'typescript';

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
  selector: 'app-registerlogin',
  templateUrl: './registerlogin.component.html',
  styleUrls: ['./registerlogin.component.css']
})
export class RegisterloginComponent implements OnInit {
  paisesControl = new FormControl('');
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
  register:FormGroup;
  login:FormGroup;
  loading = false;
  appearRegister:boolean;
  appearLogin=true;
  appearMessageRegister=false;
  appearArrow:boolean;
  endregister=false;
  hide = true;
  hide1=true;
  id!:number;
  idvalidacion!:number;
  users:Array<User>;
  UserFind:User;
  entra:number;

  constructor(private fb: FormBuilder, 
              private _snackBar: MatSnackBar, 
              private router:Router,
              private activatedRouter: ActivatedRoute,
              public breakpointObserver: BreakpointObserver,private userService:UserService) { 
     this.register=this.fb.group({
      id:[""],
      usuario:["",[Validators.required]],
      password:["",[Validators.required]],
      fecha:["",[Validators.required]],
      nombre:["",[Validators.required]],
      apellido:["",[Validators.required]],
      pais:["",[Validators.required]],
      telefono:[0,[Validators.required]],
    })

    this.id = this.activatedRouter.snapshot.params["id"];
    if (this.id!=0 && this.id!=undefined) {
      this.userService.getUser(this.id).subscribe(
        (data:User) => {
          this.register.get("usuario")!.setValue(data.email);
          this.register.get("password")!.setValue(data.contraseña);
          this.register.get("fecha")!.setValue(data.fecha);
          this.register.get("nombre")!.setValue(data.name);
          this.register.get("apellido")!.setValue(data.lastname);
          this.register.get("pais")!.setValue(data.pais);
          this.register.get("telefono")!.setValue(data.phone);
        }
      )
    } else {
      this.id=0;
    }


    this.login=this.fb.group({
      usuario:["",[Validators.required]],
      password:["",[Validators.required]],
    })
    this.breakpointObserver
    .observe(['(min-width: 1700px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.appearRegister = true;
        this.appearArrow = false;
       
      } else {
        this.appearRegister = false;
        this.appearArrow = true;
      }
    });
    this.entra=0;
  }

  ngOnInit(): void {
    
  }
  ingresarDashboard(){
    this.Login();
      console.log(this.entra);
      if(this.entra==1){
      this.router.navigate(['/dashboard'])
        this.validacion();
        
    }
     
      else{
        this.error();
      }
    
   
    
  }
  ingresar(){
    this.saveUser()
   this.fakeLoading()
  }

  saveUser(){
  
  const user:User = {
    id:this.id,
    name: this.register.get("nombre")!.value,
    lastname:this.register.get("apellido")!.value,
    email:this.register.get("usuario")!.value,
    fecha:this.register.get("fecha")!.value,
    phone:this.register.get("telefono")!.value,
    pais:this.register.get("pais")!.value,
    contraseña:this.register.get("password")!.value,
  }
  this.userService.addUser(user).subscribe({
    next:(data) =>{
      console.log("Completado")
      
    },
    error: (err) =>{
      console.log("Hay error");
    }

  })
  }

  Login() {

      this.userService.getUsers().subscribe(
        (data:User[])=>{
          this.users=data.slice();
          this.users.forEach(user => {
            if(user.email==this.login.get("usuario")!.value){
                console.log("Encontrado")
                if(user.contraseña==this.login.get("password")!.value){
                  this.entra=1;
                  this.id=user.id;
                  sessionStorage.setItem('Id_Logged_User', this.id.toString());
                }
                else{
                  this.entra=0;
                }
                
            }
          });
       
        }
      );
   
  }
  error(){
    this._snackBar.open('Usuario o contraseña ingresado son inválidos', 'Vale', {
      duration: 50000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
  validacion(){
    this._snackBar.open('Ingreso correctamente', 'Vale', {
      duration: 50000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
  fakeLoading(){
    this.loading =true;
   setTimeout(() => {
    this.appearMessageRegister=true;
    this.endregister=true;
    this.loading=false;
    this.register.reset()
    }, 1500);
  }
  appearLoginBack(){
    this.appearLogin=true;
    this.appearRegister = false;
  }
  ajusteRegistro(){
    this.appearLogin=false;
    this.appearRegister=true;
  }
  appearLoginActive(){
    this.appearLogin=true;
    this.appearMessageRegister=false;
    this.breakpointObserver
      .observe(['(min-width: 1700px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.appearRegister = true;
          this.endregister=false;
        } else {
          this.appearRegister = false;
        }
      });
    console.log("Aparecio El Login")
    console.log(this.appearLogin)
  }
  getIdUser(){
    return this.id;
  }
}
