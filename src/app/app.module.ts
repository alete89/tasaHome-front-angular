import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule, MDBModalRef } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActualizarTasacionComponent } from './componentes/actualizar-tasacion/actualizar-tasacion.component';
import { ActualizarConfiguracionesComponent } from './componentes/actualizar-configuraciones/actualizar-configuraciones.component';
import { AdministrarUsuariosComponent } from './componentes/administrar-usuarios/administrar-usuarios.component';
import { BuscarTasacionesComponent } from './componentes/buscar-tasaciones/buscar-tasaciones.component';
import { ContactarUsuarioComponent } from './componentes/contactar-usuario/contactar-usuario.component';
import { DatosPorZonaComponent } from './componentes/datos-por-zona/datos-por-zona.component';
import { EvolucionPreciosComponent } from './componentes/evolucion-precios/evolucion-precios.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { MostrarTasacionComponent } from './componentes/mostrar-tasacion/mostrar-tasacion.component';
import { PublicarTasacionComponent } from './componentes/publicar-tasacion/publicar-tasacion.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { TasacionesAnterioresComponent } from './componentes/tasaciones-anteriores/tasaciones-anteriores.component';
import { TasarPropiedadComponent } from './componentes/tasar-propiedad/tasar-propiedad.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NotificationsComponent } from './shared/notifications/notifications.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { RecuperarContraseniaComponent } from './componentes/recuperar-contrasenia/recuperar-contrasenia.component';
import { RestablecerContraseniaComponent } from './componentes/restablecer-contrasenia/restablecer-contrasenia.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
// import { SafePipe } from './shared/pipes/url_sanitizer';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      NavbarComponent,
      LoginComponent,
      NotificationsComponent,
      ActualizarConfiguracionesComponent,
      AdministrarUsuariosComponent,
      TasacionesAnterioresComponent,
      RegistrarUsuarioComponent,
      DatosPorZonaComponent,
      BuscarTasacionesComponent,
      TasarPropiedadComponent,
      ContactarUsuarioComponent,
      MapaComponent,
      MostrarTasacionComponent,
      PublicarTasacionComponent,
      EvolucionPreciosComponent,
      ActualizarTasacionComponent,
      RecuperarContraseniaComponent,
      RestablecerContraseniaComponent,
      NotFoundComponent
      // SafePipe
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      MDBBootstrapModule.forRoot(),
      AgmCoreModule.forRoot({
         apiKey: 'AIzaSyAykSBm-oMeyLr1S4rB_rqVSstWRgqMckM',
         libraries: ['places']
      }),
      AgmJsMarkerClustererModule,
      NgSelectModule,
      NgxPageScrollCoreModule

   ],
   providers: [MDBModalRef],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
