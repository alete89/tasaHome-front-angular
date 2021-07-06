import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Notification } from 'src/app/shared/notifications/notification';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-restablecer-contrasenia',
  templateUrl: './restablecer-contrasenia.component.html',
  styleUrls: ['./restablecer-contrasenia.component.css']
})
export class RestablecerContraseniaComponent implements OnInit {

  contrasenia: string
  confirmacion_contrasenia: string
  camposValidatingForm: FormGroup
  token: string
  notification: Notification
  yaClickeoReestablecer: boolean
  modalLogin: MDBModalRef;

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router, private modalService: MDBModalService) {
    this.token = this.route.snapshot.paramMap.get("token")
    this.yaClickeoReestablecer = false
    this.notification = new Notification

  }

  get inputPassword() { return this.camposValidatingForm.get('passwordForm') }
  get inputConfirmacionPassword() { return this.camposValidatingForm.get('confirmacionPasswordForm') }

  passwordTieneErrores() {
    return this.inputPassword.invalid && (this.inputPassword.dirty || this.inputPassword.touched)
  }

  confirmacionPasswordTieneErrores() {
    return this.inputConfirmacionPassword.invalid && (this.inputConfirmacionPassword.dirty || this.inputConfirmacionPassword.touched)
  }

  contraseniasNoCoinciden() {
    return (this.confirmacion_contrasenia != this.contrasenia) && (this.inputConfirmacionPassword.dirty || this.inputConfirmacionPassword.touched)
  }

  async reestablecerContrasenia() {
    try {
      this.yaClickeoReestablecer = true
      await this.usuarioService.reestablecerContrasenia(this.token, this.confirmacion_contrasenia)
      this.notification.popUpMessage("Contraseña reestablecida con éxito!.", "success", 2500)
      setTimeout(() => {
        this.router.navigate(['/home'])
        this.openModalLogin()
      }, 2500);
    } catch (error) {
      this.notification.showError(error)
    }
  }

  hayErrores() {
    return !this.contrasenia || !this.confirmacion_contrasenia || this.confirmacion_contrasenia != this.contrasenia || this.passwordTieneErrores() || this.confirmacionPasswordTieneErrores() || this.yaClickeoReestablecer
  }

  openModalLogin() {
    this.modalLogin = this.modalService.show(LoginComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      containerClass: 'right',
      animated: true,
      // data: {
      //   returnUrl: this.router.url
      // }
    });
  }

  ngOnInit() {
    this.camposValidatingForm = new FormGroup({
      passwordForm: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmacionPasswordForm: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

}
