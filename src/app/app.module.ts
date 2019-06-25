import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscarTasacionesComponent } from './componentes/buscar-tasaciones/buscar-tasaciones.component';
import { ContactarUsuarioComponent } from './componentes/contactar-usuario/contactar-usuario.component';
import { DatosPorZonaComponent } from './componentes/datos-por-zona/datos-por-zona.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { TasacionesAnterioresComponent } from './componentes/tasaciones-anteriores/tasaciones-anteriores.component';
import { TasarPropiedadComponent } from './componentes/tasar-propiedad/tasar-propiedad.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NotificationsComponent } from './shared/notifications/notifications.component';
import { MostrarTasacionComponent } from './componentes/mostrar-tasacion/mostrar-tasacion.component';
import { PublicarTasacionComponent } from './componentes/publicar-tasacion/publicar-tasacion.component';

// import { SafePipe } from './shared/pipes/url_sanitizer';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      NavbarComponent,
      LoginComponent,
      NotificationsComponent,
      TasacionesAnterioresComponent,
      RegistrarUsuarioComponent,
      DatosPorZonaComponent,
      BuscarTasacionesComponent,
      TasarPropiedadComponent,
      ContactarUsuarioComponent,
      MapaComponent,
      MostrarTasacionComponent,
      PublicarTasacionComponent
      // SafePipe
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      MDBBootstrapModule.forRoot(),
      AgmCoreModule.forRoot({
         apiKey: 'AIzaSyAykSBm-oMeyLr1S4rB_rqVSstWRgqMckM'
      }),
      AgmJsMarkerClustererModule

   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
