import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { MensajeService } from 'src/app/servicios/mensaje.service';
import { Notification } from 'src/app/shared/notifications/notification';
import { MDBModalRef } from 'angular-bootstrap-md';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrls: ['./recuperar-contrasenia.component.css']
})
export class RecuperarContraseniaComponent implements OnInit, AfterContentInit {

  constructor(public modalRecuperarContrasenia: MDBModalRef, private mensajeService: MensajeService) { }

  email: string
  notification: Notification = new Notification()
  validatingForm: FormGroup
  id: number = 0
  deshabilitarBoton: boolean

  @ViewChild('focusThis') focusThis;

  ngAfterContentInit() {
    setTimeout(() => {
      this.focusThis.nativeElement.focus();
      if (this.id == 0) {
        this.id++
      }
    }, 10);
  }

  ngOnInit() {
    this.deshabilitarBoton = false
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
      this.deshabilitarBoton = true
      this.cerrarModal()
    } catch (error) {
      this.notification.showError(error)
      this.deshabilitarBotonTemporalmente()
    }
  }

  deshabilitarBotonTemporalmente() {
    this.deshabilitarBoton = true
    setTimeout(() => {
      this.deshabilitarBoton = false
    }, 1500);
  }

  cerrarModal() {
    setTimeout(() => {
      this.modalRecuperarContrasenia.hide()
    }, 2500)
  }

  noPusoEmail() {
    return !this.email || this.emailTieneErrores()
  }

  emailTieneErrores() {
    return this.inputEmail.invalid && (this.inputEmail.dirty || this.inputEmail.touched)
  }

}
