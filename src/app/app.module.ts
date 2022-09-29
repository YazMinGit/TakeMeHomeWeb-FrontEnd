import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntrypageComponent } from './components/entrypage/entrypage.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SecondarynavbarComponent } from './components/entrypage/secondarynavbar/secondarynavbar.component';
import { RegisterloginComponent } from './components/entrypage/registerlogin/registerlogin.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { MainpageComponent } from './components/dashboard/mainpage/mainpage.component';
import { SharedModule } from './shared/shared.module';
import { NotificationsComponent } from './components/dashboard/notifications/notifications.component';
import { ConfigurationsliderComponent } from './Components/dashboard/configurationslider/configurationslider.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { LandpageComponent } from './components/landpage/landpage.component';
import { PresentationComponent } from './components/landpage/presentation/presentation.component';
import { AboutusComponent } from './components/landpage/aboutus/aboutus.component';
import { PasosComponent } from './components/landpage/pasos/pasos.component';
import { BeneficiosComponent } from './components/landpage/beneficios/beneficios.component';
import { ComentariosComponent } from './components/landpage/comentarios/comentarios.component';
import { FooterComponent } from './components/landpage/footer/footer.component';
import { ResumenComponent } from './Components/dashboard/resumen/resumen.component';

import { HistorialdepagosComponent } from './components/dashboard/historialdepagos/historialdepagos.component';
import { SoporteComponent } from './Components/dashboard/soporte/soporte.component';
import { RealizarpedidoComponent } from './components/dashboard/realizarpedido/realizarpedido.component';
import { RealizarviajeComponent } from './components/dashboard/realizarviaje/realizarviaje.component';
import { HistorialentregasComponent } from './components/dashboard/historialentregas/historialentregas.component';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MispedidosComponent } from './components/dashboard/resumen/mispedidos/mispedidos.component';

@NgModule({
  declarations: [
    AppComponent,
    EntrypageComponent,
    DashboardComponent,
    SecondarynavbarComponent,
    RegisterloginComponent,
    NavbarComponent,
    MainpageComponent,
    NotificationsComponent,  
   ConfigurationsliderComponent, ProfileComponent, 
   LandpageComponent, 
   PresentationComponent, 
   AboutusComponent, 
   PasosComponent, 
   BeneficiosComponent, 
   ComentariosComponent, 
   FooterComponent, ResumenComponent , HistorialdepagosComponent, SoporteComponent, RealizarpedidoComponent, RealizarviajeComponent, HistorialentregasComponent, MispedidosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    MatPaginatorModule,
 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
