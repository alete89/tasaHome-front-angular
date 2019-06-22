import { Component, OnInit } from '@angular/core';
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


  constructor(private usuarioService: UsuarioService) { }

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
}
