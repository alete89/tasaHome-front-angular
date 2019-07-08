import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { MensajeService } from 'src/app/servicios/mensaje.service';
import { Notification } from 'src/app/shared/notifications/notification';

@Component({
  selector: 'contactar-usuario',
  templateUrl: './contactar-usuario.component.html',
  styleUrls: ['./contactar-usuario.component.css']
})
export class ContactarUsuarioComponent implements OnInit {

  id_emisor: string
  email_receptor: String
  mensaje: String
  notification: Notification = new Notification()

  constructor(public modalContactarUsuario: MDBModalRef, private mensajeService: MensajeService) { }

  ngOnInit() {
    this.notification.cleanLoading()
  }

  cancelar() {
    this.modalContactarUsuario.hide()
  }

  async aceptar() {
    try {
      await this.mensajeService.enviarMensaje(this.id_emisor, this.email_receptor, this.mensaje)
      this.notification.popUpMessage("Mensaje enviado.", "success", 1500)
      this.mensaje = undefined
      this.cerrarModal()
    } catch (error) {
      this.notification.showError(error)
    }
  }

  cerrarModal() {
    setTimeout(() => {
      this.modalContactarUsuario.hide()
    }, 1500)
  }


}
