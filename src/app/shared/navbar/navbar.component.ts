import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/componentes/login/login.component';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DatosPorZonaComponent } from 'src/app/componentes/datos-por-zona/datos-por-zona.component';
import { BuscarTasacionesComponent } from 'src/app/componentes/buscar-tasaciones/buscar-tasaciones.component';
import { RegistrarUsuarioComponent } from 'src/app/componentes/registrar-usuario/registrar-usuario.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  modalLogin: MDBModalRef;
  modalDatosPorZona: MDBModalRef;
  modalBuscarTasaciones: MDBModalRef;
  modalRegistrarUsuario: MDBModalRef;

  constructor(private router: Router, private usuarioService: UsuarioService, private modalService: MDBModalService) {

  }

  ngOnInit() {
  }

  estaLogueado() {
    return this.usuarioService.estaLogueado()
  }

  cerrarSesion() {
    this.usuarioService.cerrarSesion()
    this.router.navigateByUrl('/home')
  }

  openModalLogin() {
    this.modalLogin = this.modalService.show(LoginComponent, {
      data: {
        returnUrl: this.router.url
      }
    });
  }

  openModalDatosPorZona() {
    this.modalDatosPorZona = this.modalService.show(DatosPorZonaComponent, {
    });
  }

  openModalBuscarTasaciones() {
    this.modalBuscarTasaciones = this.modalService.show(BuscarTasacionesComponent, {
    });
  }

  openModalRegistrarUsuario() {
    this.modalRegistrarUsuario = this.modalService.show(RegistrarUsuarioComponent, {
    });
  }

}
