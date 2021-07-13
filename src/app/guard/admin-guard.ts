import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

    constructor(private usuarioService: UsuarioService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.usuarioService.esAdministrador()) {
            return true;
        }
        this.router.navigate(['/home']);
        return false;
    }

}