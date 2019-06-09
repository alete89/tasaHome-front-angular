import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { TasacionesAnterioresComponent } from './componentes/tasaciones-anteriores/tasaciones-anteriores.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'tasaciones-anteriores', component: TasacionesAnterioresComponent, pathMatch: 'full' },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
