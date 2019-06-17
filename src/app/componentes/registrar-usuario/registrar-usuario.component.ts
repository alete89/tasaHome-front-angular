import { Component, OnInit } from '@angular/core';
import { Zona } from 'src/app/dominio/zona';
import { ZonaService } from 'src/app/servicios/zona.service';
import { Tasacion } from 'src/app/dominio/tasacion';
import { Usuario } from 'src/app/dominio/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  partidos: Array<Zona>
  provincias: Array<Zona>
  localidades: Array<Zona>
  usuario: Usuario
  confirmacion_contrasenia: string
  camposValidatingForm: FormGroup

  constructor(private zonaService: ZonaService, private usuarioService: UsuarioService) {
    this.setearFormulario()
  }

  async ngOnInit() {
    this.provincias = await this.zonaService.provincias()
  }

  get inputNombre() { return this.camposValidatingForm.get('nombreForm') }
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

  hayErrores() {
    return this.inputNombre.invalid || this.inputApellido.invalid || !this.usuario.genero || !this.usuario.direccion || !this.usuario.fecha_nacimiento || !this.usuario.provincia || !this.usuario.partido || !this.usuario.localidad || !this.usuario.email || !this.usuario.contrasenia || !this.confirmacion_contrasenia || (this.usuario.contrasenia != this.confirmacion_contrasenia)
  }

  async aceptar() {
    await this.usuarioService.registrarUsuario(this.usuario)
    this.setearFormulario()
  }

  setearFormulario() {
    this.confirmacion_contrasenia = undefined
    this.usuario = new Usuario()
    this.camposValidatingForm = new FormGroup({
      nombreForm: new FormControl(null, [Validators.required]),
      apellidoForm: new FormControl(null, [Validators.required]),
      direccionForm: new FormControl(null, [Validators.required]),
      emailForm: new FormControl(null, [Validators.required, Validators.email]),
      passwordForm: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmacionPasswordForm: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
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

}
