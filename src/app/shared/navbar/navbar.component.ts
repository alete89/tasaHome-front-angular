import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { BuscarTasacionesComponent } from 'src/app/componentes/buscar-tasaciones/buscar-tasaciones.component';
import { DatosPorZonaComponent } from 'src/app/componentes/datos-por-zona/datos-por-zona.component';
import { LoginComponent } from 'src/app/componentes/login/login.component';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  modalLogin: MDBModalRef;
  modalDatosPorZona: MDBModalRef;
  modalBuscarTasaciones: MDBModalRef;

  constructor(private router: Router, private usuarioService: UsuarioService, private modalService: MDBModalService) {

  }

  ngOnInit() {
  }

  esAdministrador() {
    return this.usuarioService.esAdministrador()
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
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      containerClass: 'right',
      animated: true,
      data: {
        returnUrl: this.router.url
      }
    });
  }

  irADatosPorZona() {
    this.router.navigate(['/datos-por-zona'])
  }

  openModalBuscarTasaciones() {
    this.router.navigate(['/buscar-tasaciones'])
  }

  modalLoginYaAbierto() {
    return this.modalService.getModalsCount() == 1
  }
}
