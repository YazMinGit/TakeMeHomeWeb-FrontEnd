import { HistorialCourrierComponent } from './components/dashboard/resumen/historial-courrier/historial-courrier.component';
import { HistorialClienteComponent } from './components/dashboard/resumen/historial-cliente/historial-cliente.component';
import { Page404Component } from './components/dashboard/page404/page404.component';
import { PedidosPagadosComponent } from './components/dashboard/resumen/pedidos-pagados/pedidos-pagados.component';
import { RealizarComentariosReclamosComponent } from './components/dashboard/realizar-comentarios-reclamos/realizar-comentarios-reclamos.component';
import { ReclamosCustomerComponent } from './components/dashboard/reclamos-customer/reclamos-customer.component';
import { CommentsCustomerComponent } from './components/dashboard/comments-customer/comments-customer.component';
import { ProfileCustomerComponent } from './components/dashboard/profile-customer/profile-customer.component';
import { EntregasNoPagadasComponent } from './components/dashboard/resumen/entregas-no-pagadas/entregas-no-pagadas.component';
import { EntregasPagadasComponent } from './components/dashboard/resumen/entregas-pagadas/entregas-pagadas.component';
import { PedidosShipmentsComponent } from './components/dashboard/resumen/pedidos-shipments/pedidos-shipments.component';
import { PedidosPendientesComponent } from './components/dashboard/resumen/pedidos-pendientes/pedidos-pendientes.component';
import { MainComponent } from './components/dashboard/main/main.component';
import { FooterComponent } from './components/landing-page/footer/footer.component';
import { ComentariosLandingComponent } from './components/landing-page/comentarios-landing/comentarios-landing.component';
import { BeneficiosComponent } from './components/landing-page/beneficios/beneficios.component';
import { PasosComponent } from './components/landing-page/pasos/pasos.component';
import { AboutusComponent } from './components/landing-page/aboutus/aboutus.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterComponent } from './components/entrypage/register/register.component';
import { LoginComponent } from './components/entrypage/login/login.component';
import { EntrypageComponent } from './components/entrypage/entrypage.component';
import { ResumenComponent } from './components/dashboard/resumen/resumen.component';
import { SoporteComponent } from './components/dashboard/soporte/soporte.component';
import { ReclamosComponent } from './components/dashboard/reclamos/reclamos.component';
import { ComentariosComponent } from './components/dashboard/comentarios/comentarios.component';
import { EdicionDatosComponent } from './components/dashboard/edicion-datos/edicion-datos.component';
import { ServiciosComponent } from './components/dashboard/servicios/servicios.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { RealizarPedidoComponent } from './components/dashboard/realizar-pedido/realizar-pedido.component';
import { PresentationComponent } from './components/dashboard/presentation/presentation.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'entrypage', component:EntrypageComponent, children:
    [
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent}
    ]
  },
  {path:'app',component:MainComponent, children:
    [
      {path:'inicio', component:ServiciosComponent},
      {path:'resumen', component:ResumenComponent, children:[
        {path:'noshipment', component:PedidosPendientesComponent},
        {path:'shipment', component:PedidosShipmentsComponent},
        {path:'sendpay', component:EntregasPagadasComponent},
        {path:'sendnopay', component:EntregasNoPagadasComponent},
        {path:'shipmentpay', component:PedidosPagadosComponent},
        {path:'historialpagos', component:HistorialClienteComponent},
        {path:'historialcobros',component:HistorialCourrierComponent}
      ]},
      {path:'perfil', component:ProfileComponent, children:[
        {path:'edicion', component:EdicionDatosComponent},
        {path:'comentarios', component:ComentariosComponent},
        {path:'reclamos', component:ReclamosComponent},
       
    
      ]},
      {path:'perfiluser', component:ProfileCustomerComponent, children:[
        {path:'comentarios', component:CommentsCustomerComponent},
        {path:'reclamos', component:ReclamosCustomerComponent},
        {path:'acciones', component:RealizarComentariosReclamosComponent}
      ]},
      {path:'soporte', component:SoporteComponent},
    ]

  },
 

  {path:'', component:LandingPageComponent},
  {path:'aboutus', component:AboutusComponent},
  {path:'pasos', component:PasosComponent},
  {path:'beneficios', component:BeneficiosComponent},
  {path:'comentarios', component:ComentariosLandingComponent},
  {path:'footer', component:FooterComponent},
  {path:'**', component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
