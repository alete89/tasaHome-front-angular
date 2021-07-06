import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Tasacion } from 'src/app/dominio/tasacion';
import { UsuarioBusqueda } from 'src/app/dominio/usuario_busqueda';
import { TipoOperacion } from 'src/app/dominio/tipo_operacion';
import { TipoPropiedad } from 'src/app/dominio/tipo_propiedad';
import { Usuario } from 'src/app/dominio/usuario';
import { Zona } from 'src/app/dominio/zona';
import { TasacionService } from 'src/app/servicios/tasacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ZonaService } from 'src/app/servicios/zona.service';
import { ContactarUsuarioComponent } from '../contactar-usuario/contactar-usuario.component';
import { Notification } from 'src/app/shared/notifications/notification';
declare var require: any
@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css']
})
export class AdministrarUsuariosComponent implements OnInit {

  moment = require('moment');
  estados = ["Activo", "Inactivo"]
  estadoSeleccionado: String
  fechaAlta: Date
  fechaModificacion: Date
  cantidadTasaciones: number
  usuarioBusqueda: UsuarioBusqueda
  validatingForm: FormGroup
  resultados: Array<Usuario>
  seLanzoBusqueda: boolean
  usuario: Usuario
  fecha_maxima = "9999-12-31"
  model: Date
  myDatePickerOptions: any
  cargando: boolean = false

  notification: Notification = new Notification()

  constructor(private router: Router, public modalService: MDBModalService, public modalBuscarTasaciones: MDBModalRef, private zonaService: ZonaService, private tasacionService: TasacionService, private usuarioService: UsuarioService) {
  }

  get inputTasaciones() { return this.validatingForm.get('tasaciones') }
  get inputFecha() { return this.validatingForm.get('fecha') }


  async ngOnInit() {
    this.inicializarFormulario()
    this.inicializarValidaciones()
  }

  inicializarFormulario() {
    this.seLanzoBusqueda = false
    this.estadoSeleccionado = ''
    this.resultados = undefined
    this.usuarioBusqueda = new UsuarioBusqueda()
  }

  inicializarValidaciones() {
    this.validatingForm = new FormGroup({
      tasaciones: new FormControl(null, [Validators.required, Validators.pattern(/^-?[0-9][^\.]*$/), Validators.min(0)]),
      fecha: new FormControl(null, [Validators.required]),
    })
  }

  cambiarSeleccion(select) {
    const [first] = select.itemsList.filteredItems;
    select.itemsList.markItem(first);
    if (select.dropdownPanel) {
      select.dropdownPanel.scrollTo(first);
    }
  }

  nuevaBusqueda() {
    this.inicializarFormulario()
    this.validatingForm.reset()
  }

  tasacionesInvalida() {
    return this.inputTasaciones.invalid && (this.inputTasaciones.dirty || this.inputTasaciones.touched)
  }

  noPusoFecha() {
    return this.inputFecha.invalid && (this.inputFecha.dirty || this.inputFecha.touched)
  }

  noPuedeBuscar() {
    return this.tasacionesInvalida() || this.formularioVacio()
  }

  formularioVacio() {
    return !this.usuarioBusqueda.cantidad_minima_tasaciones && !this.usuarioBusqueda.fecha_desde_alta && !this.usuarioBusqueda.fecha_desde_modificacion && this.usuarioBusqueda.estado_usuario == ''
  }

  async buscar() {

    try {

      this.cargando = true

      if (!this.estadoSeleccionado) {
        this.usuarioBusqueda.estado_usuario = ''
      } else {
        this.usuarioBusqueda.estado_usuario = this.estadoSeleccionado
      }

      if (!this.fechaAlta) {
        this.usuarioBusqueda.fecha_desde_alta = "1900-01-01"
      } else {
        this.usuarioBusqueda.fecha_desde_alta = this.fechaAlta.toString()
      }

      if (!this.fechaModificacion) {
        this.usuarioBusqueda.fecha_desde_modificacion = "1900-01-01"
      } else {
        this.usuarioBusqueda.fecha_desde_modificacion = this.fechaModificacion.toString()
      }

      if (!this.cantidadTasaciones) {
        this.usuarioBusqueda.cantidad_minima_tasaciones = 0
      } else {
        this.usuarioBusqueda.cantidad_minima_tasaciones = this.cantidadTasaciones
      }

      this.resultados = await this.usuarioService.getUsers(this.usuarioBusqueda)
      this.seLanzoBusqueda = true
    } catch (error) {
      this.notification.showError(error)
    } finally {
      this.cargando = false
    }
  }

  noHuboResultados() {
    return this.resultados.length == 0
  }

  /*openModalContactarUsuario(usuario: Usuario) {
    this.modalContactarUsuario = this.modalService.show(ContactarUsuarioComponent, {
      data: {
        id_emisor: this.usuarioService.userLoggedInId(),
        email_receptor: usuario.email
      },
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog modal-dialog-centered',
      containerClass: 'right',
      animated: true,
    })
  }*/

  /*  modalContactarYaAbierto() {
      return this.modalService.getModalsCount() == 2
    }
  
    seleccionarTipoDeOperacion(tipoDeOperacion: TipoOperacion) {
      this.tasacionBusqueda.id_tipo_operacion = tipoDeOperacion.id
    }*/

}
