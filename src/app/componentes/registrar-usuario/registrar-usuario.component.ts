import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/dominio/usuario';
import { Zona } from 'src/app/dominio/zona';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ZonaService } from 'src/app/servicios/zona.service';
import { Notification } from 'src/app/shared/notifications/notification';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
declare var require: any

@Component({
  selector: 'registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  moment = require('moment');
  partidos: Array<Zona>
  provincias: Array<Zona>
  localidades: Array<Zona>
  usuario: Usuario
  confirmacion_contrasenia: string
  camposValidatingForm: FormGroup
  notification: Notification = new Notification()
  fecha_maxima = "9999-12-31"

  constructor(private zonaService: ZonaService, private usuarioService: UsuarioService, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {
    this.inicializarFormulario()
    this.inicializarValidaciones()
  }

  async ngOnInit() {
    this.notification.cleanLoading()
    this.provincias = await this.zonaService.provincias()
  }

  get inputNombre() { return this.camposValidatingForm.get('nombreForm') }
  get inputFecha() { return this.camposValidatingForm.get('fechaForm') }
  get inputApellido() { return this.camposValidatingForm.get('apellidoForm') }
  get inputDireccion() { return this.camposValidatingForm.get('direccionForm') }
  get inputEmail() { return this.camposValidatingForm.get('emailForm') }
  get inputPassword() { return this.camposValidatingForm.get('passwordForm') }
  get inputConfirmacionPassword() { return this.camposValidatingForm.get('confirmacionPasswordForm') }


  nombreTieneErrores() {
    return this.inputNombre.invalid && (this.inputNombre.dirty || this.inputNombre.touched)
  }

  apellidoTieneErrores() {
    return this.inputApellido.invalid && (this.inputApellido.dirty || this.inputApellido.touched)
  }

  direccionTieneErrores() {
    return this.inputDireccion.invalid && (this.inputDireccion.dirty || this.inputDireccion.touched)
  }

  emailTieneErrores() {
    return this.inputEmail.invalid && (this.inputEmail.dirty || this.inputEmail.touched)
  }

  passwordTieneErrores() {
    return this.inputPassword.invalid && (this.inputPassword.dirty || this.inputPassword.touched)
  }

  confirmacionPasswordTieneErrores() {
    return this.inputConfirmacionPassword.invalid && (this.inputConfirmacionPassword.dirty || this.inputConfirmacionPassword.touched)
  }

  contraseniasNoCoinciden() {
    return (this.confirmacion_contrasenia != this.usuario.contrasenia) && (this.inputConfirmacionPassword.dirty || this.inputConfirmacionPassword.touched)
  }

  fechaInvalida() {
    return this.esMenorDeEdad() || this.noPusoFecha()
  }

  noPusoFecha() {
    return this.inputFecha.invalid && (this.inputFecha.dirty || this.inputFecha.touched)
  }

  esMenorDeEdad() {
    let hoy = new Date()
    let hace18Anios = new Date((hoy.getFullYear() - 18), hoy.getMonth() + 1, hoy.getDay())
    let formateada = this.moment(hace18Anios).format('YYYY-MM-DD')
    // console.log(formateada)
    return this.usuario.fecha_nacimiento > formateada
  }

  hayErrores() {
    return this.inputNombre.invalid || this.inputApellido.invalid || !this.usuario.genero || !this.usuario.direccion || !this.usuario.fecha_nacimiento || !this.usuario.provincia || !this.usuario.partido || !this.usuario.localidad || !this.usuario.email || !this.usuario.contrasenia || !this.confirmacion_contrasenia || (this.usuario.contrasenia != this.confirmacion_contrasenia) || this.fechaInvalida()
  }

  async aceptar() {
    try {
      await this.usuarioService.registrarUsuario(this.usuario)
      this.notification.popUpMessage("Usuario registrado.", "success", 1500)
      this.limpiarFormulario()
    } catch (error) {
      this.notification.showError(error._body)
    }
  }

  inicializarFormulario() {
    this.confirmacion_contrasenia = undefined
    this.usuario = new Usuario()
  }

  inicializarValidaciones() {
    this.camposValidatingForm = new FormGroup({
      nombreForm: new FormControl(null, [Validators.required, Validators.maxLength(70), Validators.pattern("[a-zA-Z ]*")]),
      apellidoForm: new FormControl(null, [Validators.required, Validators.maxLength(70), Validators.pattern("[a-zA-Z ]*")]),
      direccionForm: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.pattern(/^[a-zA-Z\s\d\/]*\d[a-zA-Z\s\d\/]*$/)]),
      //NO VALIDA BIEN LA DIRECCION. VER COMO VALIDARLA USANDO LA API DE GOOGLE
      emailForm: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(254)]),
      fechaForm: new FormControl(null, [Validators.required]),
      passwordForm: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmacionPasswordForm: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  limpiarFormulario() {
    this.inicializarFormulario()
    this.camposValidatingForm.reset()
    this.scrollToTop()
  }

  scrollToTop() {
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: `.top`,
      scrollOffset: 99,
      duration: 300,
    });
  }

  formularioVacio() {
    return !this.usuario.nombre && !this.usuario.apellido && !this.usuario.genero && !this.usuario.fecha_nacimiento && !this.usuario.provincia && !this.usuario.partido && !this.usuario.localidad && !this.usuario.direccion && !this.usuario.email && !this.usuario.contrasenia && !this.confirmacion_contrasenia
  }

  async getPartidos() {
    this.partidos = await this.zonaService.partidos(this.usuario.provincia)
  }

  async getLocalidades() {
    this.localidades = await this.zonaService.localidades(this.usuario.partido)
  }

  seleccionarGenero(genero: string) {
    this.usuario.genero = genero
  }

}
