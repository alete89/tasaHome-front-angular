import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { LoginComponent } from '../../login/login.component';
import { FinalizarCompraComponent } from '../../finalizar-compra/finalizar-compra.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  modalRef: MDBModalRef;
  modalCarrito: MDBModalRef

  constructor(private usuarioService: UsuarioService, private router: Router, private modalService: MDBModalService) { }

  ngOnInit() {
  }

  estaLogueado() {
    return this.usuarioService.estaLogueado()
  }

  cerrarSesion() {
    this.usuarioService.cerrarSesion()
    this.router.navigateByUrl('/home')
  }

  itemsCarrito() {
    return this.usuarioService.itemsCarrito()
  }

  openModal() {
    this.modalRef = this.modalService.show(LoginComponent, {
      data: {
        returnUrl: this.router.url
      }
    });
  }

  // getImagenDePerfil() {
  //   if (this.estaLogueado()) {
  //     return this.usuarioService.getImagenDePerfil()
  //   }
  // }


}
