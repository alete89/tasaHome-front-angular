import { Component, OnInit } from '@angular/core';
import { MensajeService } from 'src/app/servicios/mensaje.service';
import { Notification } from 'src/app/shared/notifications/notification';
import { MDBModalRef } from 'angular-bootstrap-md';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrls: ['./recuperar-contrasenia.component.css']
})
export class RecuperarContraseniaComponent implements OnInit {

  constructor(public modalRecuperarContrasenia: MDBModalRef, private mensajeService: MensajeService) { }

  email: String
  notification: Notification = new Notification()
  validatingForm: FormGroup


  ngOnInit() {
    this.notification.cleanLoading()
    this.validatingForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(254)]),
    })
  }

  get inputEmail() { return this.validatingForm.get('email'); }


  cancelar() {
    this.modalRecuperarContrasenia.hide()
  }

  async recuperarContrasenia() {
    try {
      await this.mensajeService.recuperarContrasenia(this.email)
      this.notification.popUpMessage("Solicitud enviada.", "success", 1500)
      this.cerrarModal()
    } catch (error) {
      this.notification.showError(error)
    }
  }

  cerrarModal() {
    setTimeout(() => {
      this.modalRecuperarContrasenia.hide()
    }, 1500)
  }

  noPusoEmail() {
    return !this.email || this.emailTieneErrores()
  }

  emailTieneErrores() {
    return this.inputEmail.invalid && (this.inputEmail.dirty || this.inputEmail.touched)
  }

}
