import { Component, OnInit, ViewChild } from '@angular/core';
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
  email_receptor: string
  mensaje: string
  notification: Notification = new Notification()
  id: number = 0

  @ViewChild('focusThis') focusThis;

  constructor(public modalContactarUsuario: MDBModalRef, private mensajeService: MensajeService) { }

  ngOnInit() {
  }

  cancelar() {
    this.modalContactarUsuario.hide()
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.focusThis.nativeElement.focus();
      if (this.id == 0) {
        this.id++
      }
    }, 10);
  }

  async aceptar() {
    try {
      await this.mensajeService.enviarMensaje(this.id_emisor, this.email_receptor, this.mensaje)
      this.mensaje = undefined
      this.cerrarModal()
    } catch (error) {
      this.notification.showError(error)
    }
  }

  cerrarModal() {
    this.modalContactarUsuario.hide()
  }

}
