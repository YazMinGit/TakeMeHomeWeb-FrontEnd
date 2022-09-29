import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-configurationslider',
  templateUrl: './configurationslider.component.html',
  styleUrls: ['./configurationslider.component.css']
})
export class ConfigurationsliderComponent implements OnInit {
  show=true;
  currentRoute: string;
  mensajesalida=false;
  nombreCompleto:string="";
  constructor(private router:Router,private userService:UserService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
  
      }
    });
    if(this.currentRoute=='/dashboard/perfil' ||this.currentRoute=='/dashboard/historial'  ){
      this.show=true;
    }
  } 
   
  ngOnInit(): void {
    this.getUsuarioPedido();
  }
  cambioPagina(path:string){
    this.router.navigate(['/dashboard/'+path])
    this.show=false;
   
  }
  getUsuarioPedido(){
    const idusuario=Number(sessionStorage.getItem('Id_Logged_User'));
    this.userService.getUser(idusuario).subscribe(
      (data:User) => {
        this.nombreCompleto=data.name + " "+ data.lastname;
    
      }
    ); 
  
  }
  goToLink(url: string){ window.open(url, "_blank"); }

  public goOut(){
    this.router.navigate(['/entry'])
    sessionStorage.clear();

  }
  aparicionMensaje(){
    this.mensajesalida=true;
  }
}
