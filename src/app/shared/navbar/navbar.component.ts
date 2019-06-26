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

  openModalDatosPorZona() {
    this.router.navigate(['/home'])
    this.modalDatosPorZona = this.modalService.show(DatosPorZonaComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      containerClass: 'right',
      animated: true
    });
  }

  openModalBuscarTasaciones() {
    this.modalBuscarTasaciones = this.modalService.show(BuscarTasacionesComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog modal-lg',
      containerClass: 'right',
      animated: true

    });
  }
}
