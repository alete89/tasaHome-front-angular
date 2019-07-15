import { Component, OnInit, Inject, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/dominio/usuario';
import { Zona } from 'src/app/dominio/zona';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ZonaService } from 'src/app/servicios/zona.service';
import { Notification } from 'src/app/shared/notifications/notification';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
declare var require: any
declare var google: any;
@Component({
  selector: 'registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  moment = require('moment');
  usuario: Usuario
  confirmacion_contrasenia: string
  camposValidatingForm: FormGroup
  notification: Notification = new Notification()
  fecha_maxima = "9999-12-31"
  mail_invalido: string
  autocomplete
  direccionAutocomplete: string
  id: number = 0

  @ViewChild('focusThis') focusThis;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private mapsApiLoader: MapsAPILoader, private ngZone: NgZone, private router: Router, private zonaService: ZonaService, private usuarioService: UsuarioService, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {
    this.inicializarFormulario()
    this.inicializarValidaciones()
  }

  async ngOnInit() {
    this.notification.cleanLoading()
    this.inicializarAutocomplete()
  }

  get inputNombre() { return this.camposValidatingForm.get('nombreForm') }
  get inputFecha() { return this.camposValidatingForm.get('fechaForm') }
  get inputApellido() { return this.camposValidatingForm.get('apellidoForm') }
  get inputDireccion() { return this.camposValidatingForm.get('direccionForm') }
  get inputEmail() { return this.camposValidatingForm.get('emailForm') }
  get inputPassword() { return this.camposValidatingForm.get('passwordForm') }
  get inputConfirmacionPassword() { return this.camposValidatingForm.get('confirmacionPasswordForm') }



  ngAfterContentInit(): void {
    this.focusThis.nativeElement.focus();
    if (this.id == 0) {
      this.id++
    }
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  nombreInvalido() {
    return this.inputNombre.invalid && (this.inputNombre.dirty || this.inputNombre.touched)
  }

  apellidoInvalido() {
    return this.inputApellido.invalid && (this.inputApellido.dirty || this.inputApellido.touched)
  }

  direccionInvalido() {
    return (this.inputDireccion.invalid && (this.inputDireccion.dirty || this.inputDireccion.touched))
  }

  emailInvalido() {
    return this.inputEmail.invalid && (this.inputEmail.dirty || this.inputEmail.touched)
  }

  passwordInvalido() {
    return this.inputPassword.invalid && (this.inputPassword.dirty || this.inputPassword.touched)
  }

  confirmacionPasswordInvalido() {
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
    return this.inputNombre.invalid
      || this.inputApellido.invalid
      || !this.usuario.genero
      || !this.usuario.direccion
      || !this.usuario.fecha_nacimiento
      || !this.usuario.email
      || this.contraseniasTienenErrores()
      || this.fechaInvalida()
      || (this.mail_invalido == this.usuario.email)
      || !hasNumber(this.usuario.direccion)
      || (!this.direccionAutocomplete || (this.direccionAutocomplete != this.usuario.direccion))
  }

  direccionNotieneNumeros() {
    return !hasNumber(this.usuario.direccion) && (this.inputDireccion.dirty || this.inputDireccion.touched) && (this.usuario.direccion == this.direccionAutocomplete)
  }

  noUsoAutoComplete() {
    return this.usuario.direccion != this.direccionAutocomplete
  }

  contraseniasTienenErrores() {
    return !this.usuario.contrasenia
      || !this.confirmacion_contrasenia
      || (this.usuario.contrasenia != this.confirmacion_contrasenia)
      || this.passwordInvalido()
      || this.confirmacionPasswordInvalido()
  }

  async aceptar() {
    this.notification = new Notification
    this.notification.cleanLoading()
    try {
      await this.usuarioService.registrarUsuario(this.usuario)
      this.notification.popUpMessage("Usuario registrado.", "success", 2500)
      this.limpiarFormulario()
      setTimeout(() => {
        this.router.navigate(['/home'])
      }, 2500)
    } catch (error) {
      console.log(error)
      this.notification.showError(error)
      this.mail_invalido = this.usuario.email
    }
  }

  inicializarFormulario() {
    this.mail_invalido = "invalido"
    this.confirmacion_contrasenia = undefined
    this.usuario = new Usuario()
    this.direccionAutocomplete = undefined
  }

  inicializarValidaciones() {
    this.camposValidatingForm = new FormGroup({
      nombreForm: new FormControl(null, [Validators.required, Validators.maxLength(70), Validators.pattern("[a-zA-Z ]*")]),
      apellidoForm: new FormControl(null, [Validators.required, Validators.maxLength(70), Validators.pattern("[a-zA-Z ]*")]),
      direccionForm: new FormControl(null, [Validators.required]),
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
    return !this.usuario.nombre && !this.usuario.apellido && !this.usuario.genero && !this.usuario.fecha_nacimiento && !this.usuario.direccion && !this.usuario.email && !this.usuario.contrasenia && !this.confirmacion_contrasenia
  }

  seleccionarGenero(genero: string) {
    this.usuario.genero = genero
  }

  inicializarAutocomplete() {
    this.mapsApiLoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
        componentRestrictions: { country: 'ar' }
      });
      this.autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place = this.autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.usuario.direccion = place.formatted_address
          this.direccionAutocomplete = place.formatted_address
          console.log("direccion usuario", this.usuario.direccion)
        });
      });
    });
  }

}

function hasNumber(myString) {
  return /\d/.test(myString);
}
