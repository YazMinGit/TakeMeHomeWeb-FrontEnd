import { FooterComponent } from './Components/landpage/footer/footer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationsliderComponent } from './Components/dashboard/configurationslider/configurationslider.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistorialdepagosComponent } from './components/dashboard/historialdepagos/historialdepagos.component';
import { NotificationsComponent } from './components/dashboard/notifications/notifications.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { RealizarpedidoComponent } from './components/dashboard/realizarpedido/realizarpedido.component';
import { RealizarviajeComponent } from './components/dashboard/realizarviaje/realizarviaje.component';
import { MispedidosComponent } from './components/dashboard/resumen/mispedidos/mispedidos.component';
import { ResumenComponent } from './Components/dashboard/resumen/resumen.component';
import { SoporteComponent } from './Components/dashboard/soporte/soporte.component';
import { EntrypageComponent } from './components/entrypage/entrypage.component';
import { AboutusComponent } from './components/landpage/aboutus/aboutus.component';
import { BeneficiosComponent } from './components/landpage/beneficios/beneficios.component';
import { ComentariosComponent } from './components/landpage/comentarios/comentarios.component';
import { LandpageComponent } from './components/landpage/landpage.component';
import { PasosComponent } from './components/landpage/pasos/pasos.component';

const routes: Routes = [
  {path:'entry', component:EntrypageComponent},
  {path:'dashboard', component:DashboardComponent ,
  children:[
    {path:'perfil', component:ProfileComponent},
    {path:'historial', component:HistorialdepagosComponent},
    {path:'soporte', component:SoporteComponent},
    {path:'resumen',component:ResumenComponent,children:[
      {path:'mispedidos', component:MispedidosComponent}
    ]},
    {path:'realizarpedido', component:RealizarpedidoComponent},
    {path:'realizarviaje', component:RealizarviajeComponent}
  ]},
  {path:'', component:LandpageComponent},
  {path:'aboutus', component:AboutusComponent},
  {path:'pasos', component:PasosComponent},
  {path:'beneficios', component:BeneficiosComponent},
  {path:'comentarios', component:ComentariosComponent},
  {path:'footer', component:FooterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
