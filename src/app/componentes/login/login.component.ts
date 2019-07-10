import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { UsuarioService } from '../../servicios/usuario.service';
import { Notification } from '../../shared/notifications/notification';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RecuperarContraseniaComponent } from '../recuperar-contrasenia/recuperar-contrasenia.component';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string
  password: string
  returnUrl: string
  notification: Notification = new Notification()
  validatingForm: FormGroup
  modalRecuperarContrasenia: MDBModalRef;

  constructor(private router: Router, private usuarioService: UsuarioService, private route: ActivatedRoute, public modalRef: MDBModalRef, private modalService: MDBModalService) { }

  ngOnInit() {
    this.validatingForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(254)]),
      password: new FormControl(null, [Validators.required])
    })
    this.notification.cleanLoading()
  }

  get inputEmail() { return this.validatingForm.get('email'); }
  get inputPassword() { return this.validatingForm.get('password'); }

  noPuedeIniciar() {
    return !this.email || !this.password || this.emailTieneErrores()
  }

  noCompletoContrasenia() {
    return this.inputPassword.invalid && (this.inputPassword.dirty || this.inputPassword.touched)
  }

  emailTieneErrores() {
    return this.inputEmail.invalid && (this.inputEmail.dirty || this.inputEmail.touched)
  }

  async iniciarSesion() {
    try {
      await this.usuarioService.userLogin(this.email, this.password)
      this.modalRef.hide()
      // console.log(this.returnUrl)
      if (this.returnUrl) {
        if (this.returnUrl == '/registrar-usuario') {
          this.router.navigate(['/home'])
        } else {
          this.router.navigate([this.returnUrl])
        }
      }
    }
    catch (error) {
      let mensaje = JSON.parse(error._body).message
      this.notification.showError(error)
    }
  }

  irARegistrarUsuario() {
    this.modalRef.hide()
    this.router.navigate(["/registrar-usuario"])
  }

  abrirModalRecuperarContrasenia() {
    this.modalRecuperarContrasenia = this.modalService.show(RecuperarContraseniaComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      containerClass: 'right',
      animated: true,
      data: {
        // returnUrl: this.router.url
      }
    });
  }

}
