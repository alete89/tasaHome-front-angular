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
declare var require: any
@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css']
})
export class AdministrarUsuariosComponent implements OnInit {

  moment = require('moment');
  estados = ["Activo", "Inactivo"]
  estadoSeleccionado: Array<String>
  usuarioBusqueda: UsuarioBusqueda
  validatingForm: FormGroup
  resultados: Array<Usuario>
  seLanzoBusqueda: boolean
  usuario: Usuario
  fecha_maxima = "9999-12-31"
  model: Date
  myDatePickerOptions: any
  cargando: boolean = false


  constructor(private router: Router, public modalService: MDBModalService, public modalBuscarTasaciones: MDBModalRef, private zonaService: ZonaService, private tasacionService: TasacionService, private usuarioService: UsuarioService) {
  }

  get inputTasaciones() { return this.validatingForm.get('tasaciones') }
  get inputFecha() { return this.validatingForm.get('fecha') }


  async ngOnInit() {
    this.inicializarFormulario()
    this.inicializarValidaciones()
    //this.barrios = await this.zonaService.barrios()
    //this.tiposDePropiedad = await this.tasacionService.tiposDePropiedad()
    //this.tiposDeOperacion = await this.tasacionService.tiposDeOperacion()
  }

  inicializarFormulario() {
    this.seLanzoBusqueda = false
    this.estadoSeleccionado = []
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
    return !this.usuarioBusqueda.cantidad_minima_tasaciones && !this.usuarioBusqueda.fecha_desde_alta && !this.usuarioBusqueda.fecha_desde_modificacion && this.estadoSeleccionado.length == 0 
  }

  async buscar() {

    this.cargando = true

    if (!this.usuarioBusqueda.fecha_desde_alta) {
      this.usuarioBusqueda.fecha_desde_alta = new Date()
    }
    if (!this.usuarioBusqueda.fecha_desde_modificacion) {
      this.usuarioBusqueda.fecha_desde_modificacion = new Date()
    }
    this.resultados = await this.usuarioService.getUsers()
    this.seLanzoBusqueda = true
    setTimeout(() => {
      this.cargando = false
    }, 350);

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
