import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/dashboard/main/main.component';
import { SharedModule } from './components/shared/shared.module';
import { PresentationComponent } from './components/dashboard/presentation/presentation.component';
import { RealizarPedidoComponent } from './components/dashboard/realizar-pedido/realizar-pedido.component';
import { RealizarViajeComponent } from './components/dashboard/realizar-viaje/realizar-viaje.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { ServiciosComponent } from './components/dashboard/servicios/servicios.component';
import { EdicionDatosComponent } from './components/dashboard/edicion-datos/edicion-datos.component';
import { ComentariosComponent } from './components/dashboard/comentarios/comentarios.component';
import { ReclamosComponent } from './components/dashboard/reclamos/reclamos.component';
import { SoporteComponent } from './components/dashboard/soporte/soporte.component';
import { ResumenComponent } from './components/dashboard/resumen/resumen.component';
import { EntrypageComponent } from './components/entrypage/entrypage.component';
import { LoginComponent } from './components/entrypage/login/login.component';
import { RegisterComponent } from './components/entrypage/register/register.component';
import { SecondaryNavbarComponent } from './components/entrypage/secondary-navbar/secondary-navbar.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AboutusComponent } from './components/landing-page/aboutus/aboutus.component';
import { BeneficiosComponent } from './components/landing-page/beneficios/beneficios.component';
import { FooterComponent } from './components/landing-page/footer/footer.component';
import { PasosComponent } from './components/landing-page/pasos/pasos.component';
import { PresentacionComponent } from './components/landing-page/presentacion/presentacion.component';
import { ComentariosLandingComponent } from './components/landing-page/comentarios-landing/comentarios-landing.component';
import { HttpClientModule } from '@angular/common/http';
import { PedidosPendientesComponent } from './components/dashboard/resumen/pedidos-pendientes/pedidos-pendientes.component';
import { PedidosShipmentsComponent } from './components/dashboard/resumen/pedidos-shipments/pedidos-shipments.component';
import { EntregasNoPagadasComponent } from './components/dashboard/resumen/entregas-no-pagadas/entregas-no-pagadas.component';
import { EntregasPagadasComponent } from './components/dashboard/resumen/entregas-pagadas/entregas-pagadas.component';
import { ProfileCustomerComponent } from './components/dashboard/profile-customer/profile-customer.component';
import { CommentsCustomerComponent } from './components/dashboard/comments-customer/comments-customer.component';
import { ReclamosCustomerComponent } from './components/dashboard/reclamos-customer/reclamos-customer.component';
import { RealizarComentariosReclamosComponent } from './components/dashboard/realizar-comentarios-reclamos/realizar-comentarios-reclamos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PedidosPagadosComponent } from './components/dashboard/resumen/pedidos-pagados/pedidos-pagados.component';
import { Page404Component } from './components/dashboard/page404/page404.component';
import { HistorialClienteComponent } from './components/dashboard/resumen/historial-cliente/historial-cliente.component';
import { HistorialCourrierComponent } from './components/dashboard/resumen/historial-courrier/historial-courrier.component';
import { PdfCourrierComponent } from './components/dashboard/resumen/historial-courrier/pdf-courrier/pdf-courrier.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainComponent,
    PresentationComponent,
    RealizarPedidoComponent,
    RealizarViajeComponent,
    ProfileComponent,
    ServiciosComponent,
    EdicionDatosComponent,
    ComentariosComponent,
    ReclamosComponent,
    SoporteComponent,
    ResumenComponent,
    EntrypageComponent,
    LoginComponent,
    RegisterComponent,
    SecondaryNavbarComponent,
    LandingPageComponent,
    AboutusComponent,
    BeneficiosComponent,
    FooterComponent,
    PasosComponent,
    PresentacionComponent,
    ComentariosLandingComponent,
    PedidosPendientesComponent,
    PedidosShipmentsComponent,
    EntregasNoPagadasComponent,
    EntregasPagadasComponent,
    ProfileCustomerComponent,
    CommentsCustomerComponent,
    ReclamosCustomerComponent,
    RealizarComentariosReclamosComponent,
    PedidosPagadosComponent,
    Page404Component,
    HistorialClienteComponent,
    HistorialCourrierComponent,
    PdfCourrierComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
