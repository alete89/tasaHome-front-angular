import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tasacion } from 'src/app/dominio/tasacion';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Notification } from 'src/app/shared/notifications/notification';

@Component({
  selector: 'tasaciones-anteriores',
  templateUrl: './tasaciones-anteriores.component.html',
  styleUrls: ['./tasaciones-anteriores.component.css']
})
export class TasacionesAnterioresComponent implements OnInit {

  tasaciones: Array<Tasacion>
  notification: Notification = new Notification()


  constructor(private router: Router, private usuarioService: UsuarioService) { }

  async ngOnInit() {
    this.traerTasaciones()
    this.notification.cleanLoading()
  }

  async traerTasaciones() {
    try {
      this.tasaciones = await this.usuarioService.tasacionesAnteriores()
    } catch (error) {
      this.notification.showError(error)
    }
  }

  hayTasacionesAnteriores() {
    if (this.tasaciones) {
      return this.tasaciones.length > 0
    }
  }

  irAActualizarTasacion(tasacion: Tasacion) {
    this.router.navigate(['/actualizar-tasacion', tasacion.id])
  }

  irAEvolucionDePrecios(tasacion: Tasacion) {
    if (tasacion.id) {
      this.router.navigate(['/evolucion-precios', tasacion.id])
    }
    if (tasacion.id_anterior) {
      this.router.navigate(['/evolucion-precios', tasacion.id_anterior])

    }

  }
}
