import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { MensajeService } from 'src/app/servicios/mensaje.service';

@Component({
  selector: 'contactar-usuario',
  templateUrl: './contactar-usuario.component.html',
  styleUrls: ['./contactar-usuario.component.css']
})
export class ContactarUsuarioComponent implements OnInit {

  id_emisor: string
  email_receptor: String
  mensaje: String

  constructor(public modalContactarUsuario: MDBModalRef, private mensajeService: MensajeService) { }

  ngOnInit() {
  }

  cancelar() {
    this.modalContactarUsuario.hide()
  }

  async aceptar() {
    await this.mensajeService.enviarMensaje(this.id_emisor, this.email_receptor, this.mensaje)
  }

}