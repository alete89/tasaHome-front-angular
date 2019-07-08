import { Component, OnInit } from '@angular/core';
import { Tasacion } from 'src/app/dominio/tasacion';
import { Notification } from 'src/app/shared/notifications/notification';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import { PublicarTasacionComponent } from '../publicar-tasacion/publicar-tasacion.component';

@Component({
  selector: 'mostrar-tasacion',
  templateUrl: './mostrar-tasacion.component.html',
  styleUrls: ['./mostrar-tasacion.component.css']
})
export class MostrarTasacionComponent implements OnInit {

  tasacion: Tasacion
  notification: Notification = new Notification()
  yaGuardo: boolean = false
  modalPublicarTasacion: MDBModalRef

  constructor(private modalService: MDBModalService, private router: Router, private usuarioService: UsuarioService, private modalMostrarTasacion: MDBModalRef) { }

  ngOnInit() {
    this.notification.cleanLoading()

  }

  async guardar() {
    try {
      await this.usuarioService.guardarTasacion(this.tasacion)
      this.notification.popUpMessage("Tasación guardada.", "success", 1500)
      this.yaGuardo = true
    } catch (error) {
      let mensaje = JSON.parse(error._body).message
      this.notification.popUpMessage(mensaje, "danger", 1500)    }
  }

  publicar() {
    this.modalPublicarTasacion = this.modalService.show(PublicarTasacionComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog modal-dialog-centered',
      containerClass: 'right',
      animated: true,
      data: {
        tasacion: this.tasacion
      }
    });
  }

  volver() {
    this.modalMostrarTasacion.hide()
  }

  modalAbierto(){
    return this.modalService.getModalsCount() > 1
  }

}
