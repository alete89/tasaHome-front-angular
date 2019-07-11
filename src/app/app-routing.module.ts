import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarTasacionComponent } from './componentes/actualizar-tasacion/actualizar-tasacion.component';
import { BuscarTasacionesComponent } from './componentes/buscar-tasaciones/buscar-tasaciones.component';
import { ContactarUsuarioComponent } from './componentes/contactar-usuario/contactar-usuario.component';
import { DatosPorZonaComponent } from './componentes/datos-por-zona/datos-por-zona.component';
import { EvolucionPreciosComponent } from './componentes/evolucion-precios/evolucion-precios.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { MostrarTasacionComponent } from './componentes/mostrar-tasacion/mostrar-tasacion.component';
import { PublicarTasacionComponent } from './componentes/publicar-tasacion/publicar-tasacion.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { TasacionesAnterioresComponent } from './componentes/tasaciones-anteriores/tasaciones-anteriores.component';
import { TasarPropiedadComponent } from './componentes/tasar-propiedad/tasar-propiedad.component';
import { AuthGuard } from './guard/auth-guard';
import { LogueadoGuard } from './guard/logueado-guard';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { RecuperarContraseniaComponent } from './componentes/recuperar-contrasenia/recuperar-contrasenia.component';
import { RestablecerContraseniaComponent } from './componentes/restablecer-contrasenia/restablecer-contrasenia.component';
import { RecoveryGuard } from './guard/recovery-guard';
import { NotFoundComponent } from './componentes/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'login', component: LoginComponent, canActivate: [LogueadoGuard] },
  { path: 'tasaciones-anteriores', component: TasacionesAnterioresComponent, canActivate: [AuthGuard] },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent, canActivate: [LogueadoGuard] },
  { path: 'datos-por-zona', component: DatosPorZonaComponent },
  { path: 'tasar-propiedad', component: TasarPropiedadComponent, canActivate: [AuthGuard] },
  { path: 'buscar-tasaciones', component: BuscarTasacionesComponent, canActivate: [AuthGuard] },
  { path: 'contactar-usuario', component: ContactarUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'mostrar-tasacion', component: MostrarTasacionComponent, canActivate: [AuthGuard] },
  { path: 'publicar-tasacion', component: PublicarTasacionComponent, canActivate: [AuthGuard] },
  { path: 'evolucion-precios/:id', component: EvolucionPreciosComponent, canActivate: [AuthGuard] },
  { path: 'actualizar-tasacion/:id', component: ActualizarTasacionComponent, canActivate: [AuthGuard] },
  { path: 'recuperar-contrasenia', component: RecuperarContraseniaComponent, canActivate: [LogueadoGuard] },
  { path: 'restablecer-contrasenia/:token', component: RestablecerContraseniaComponent, canActivate: [RecoveryGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
