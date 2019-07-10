import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { UsuarioService } from '../servicios/usuario.service';

@Injectable({ providedIn: 'root' })
export class RecoveryGuard implements CanActivate {

    modalRef: MDBModalRef

    constructor(private usuarioService: UsuarioService, private modalService: MDBModalService, private router: Router) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.usuarioService.estaLogueado()) {
            this.router.navigate(['/not-found'])
        }
        try {
            let token = route.paramMap.get("token")
            await this.usuarioService.getUserByToken(token)
            return true;
        } catch (error) {
            this.router.navigate(['/not-found'])
        }
    }
}