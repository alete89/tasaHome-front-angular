import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';

@Injectable({ providedIn: 'root' })
export class LogueadoGuard implements CanActivate {

    constructor(private usuarioService: UsuarioService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.usuarioService.estaLogueado()) {
            return true;
        }

        this.router.navigate(['/home']);
        return false;
    }
}