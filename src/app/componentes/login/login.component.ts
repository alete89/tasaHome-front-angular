import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { UsuarioService } from '../../servicios/usuario.service';
import { Notification } from '../../shared/notifications/notification';


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

  constructor(private router: Router, private usuarioService: UsuarioService, private route: ActivatedRoute, public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.notification.cleanLoading()
  }

  camposIncompletos() {
    return (!this.email || !this.password)
  }

  async iniciarSesion() {
    try {
      await this.usuarioService.userLogin(this.email, this.password)
      this.modalRef.hide()
      this.router.navigate([this.returnUrl])
    }
    catch (error) {
      this.notification.showError(error)
    }
  }

}
