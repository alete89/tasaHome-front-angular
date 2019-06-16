import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './componentes/login/login.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationsComponent } from './shared/notifications/notifications.component';
import { TasacionesAnterioresComponent } from './componentes/tasaciones-anteriores/tasaciones-anteriores.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { DatosPorZonaComponent } from './componentes/datos-por-zona/datos-por-zona.component';
import { BuscarTasacionesComponent } from './componentes/buscar-tasaciones/buscar-tasaciones.component';
import { TasarPropiedadComponent } from './componentes/tasar-propiedad/tasar-propiedad.component';
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
      TasarPropiedadComponent
      // SafePipe
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      MDBBootstrapModule.forRoot()
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
