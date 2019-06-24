import { Component, OnInit } from '@angular/core';
import { Tasacion } from 'src/app/dominio/tasacion';
import { Notification } from 'src/app/shared/notifications/notification';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'mostrar-tasacion',
  templateUrl: './mostrar-tasacion.component.html',
  styleUrls: ['./mostrar-tasacion.component.css']
})
export class MostrarTasacionComponent implements OnInit {

  tasacion: Tasacion
  notification: Notification = new Notification()
  yaGuardo: boolean = false

  constructor(private usuarioService: UsuarioService, private modalMostrarTasacion: MDBModalRef) { }

  ngOnInit() {
    this.notification.cleanLoading()

  }

  async guardar() {
    try {
      await this.usuarioService.guardarTasacion(this.tasacion)
      this.notification.popUpMessage("Tasación guardada.", "success", 1500)
      this.yaGuardo = true
    } catch (error) {
      this.notification.showError(error._body)
    }
  }

  async publicar() {

  }

  volver() {
    this.modalMostrarTasacion.hide()
  }

}
