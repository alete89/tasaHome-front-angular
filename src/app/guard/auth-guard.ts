import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { LoginComponent } from '../componentes/login/login.component';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    modalRef: MDBModalRef

    constructor(private usuarioService: UsuarioService, private modalService: MDBModalService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.usuarioService.estaLogueado()) {
            return true;
        }
        this.openModal(state.url)
        return false;
    }

    openModal(url: string) {
        this.modalRef = this.modalService.show(LoginComponent, {
            data: {
                returnUrl: url
            }
        });
    }
}