import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/componentes/login/login.component';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  modalRef: MDBModalRef;

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

  openModal() {
    this.modalRef = this.modalService.show(LoginComponent, {
      data: {
        returnUrl: this.router.url
      }
    });
  }

}
