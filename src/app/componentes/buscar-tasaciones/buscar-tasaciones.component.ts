import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Tasacion } from 'src/app/dominio/tasacion';
import { TasacionBusqueda } from 'src/app/dominio/tasacion_busqueda';
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
  selector: 'app-buscar-tasaciones',
  templateUrl: './buscar-tasaciones.component.html',
  styleUrls: ['./buscar-tasaciones.component.css']
})
export class BuscarTasacionesComponent implements OnInit {

  moment = require('moment');
  barrios: Array<Zona>
  tiposDePropiedad: Array<TipoPropiedad>
  tiposDeOperacion: Array<TipoOperacion>
  tasacionBusqueda: TasacionBusqueda
  validatingForm: FormGroup
  resultados: Array<Tasacion>
  seLanzoBusqueda: boolean
  modalContactarUsuario: MDBModalRef
  barriosSeleccionados: Array<Zona>
  tipoDePropiedad: TipoPropiedad
  fecha_maxima = "9999-12-31"
  model: Date
  myDatePickerOptions: any
  cargando: boolean = false


  constructor(private router: Router, public modalService: MDBModalService, public modalBuscarTasaciones: MDBModalRef, private zonaService: ZonaService, private tasacionService: TasacionService, private usuarioService: UsuarioService) {
  }

  get inputSuperficie() { return this.validatingForm.get('superficie') }
  get inputAmbientes() { return this.validatingForm.get('ambientes') }
  get inputFecha() { return this.validatingForm.get('fecha') }


  async ngOnInit() {
    this.inicializarFormulario()
    this.inicializarValidaciones()
    this.barrios = await this.zonaService.barrios()
    this.tiposDePropiedad = await this.tasacionService.tiposDePropiedad()
    this.tiposDeOperacion = await this.tasacionService.tiposDeOperacion()
  }

  inicializarFormulario() {
    this.tipoDePropiedad = undefined
    this.barriosSeleccionados = []
    this.seLanzoBusqueda = false
    this.resultados = undefined
    this.tasacionBusqueda = new TasacionBusqueda()

  }

  inicializarValidaciones() {
    this.validatingForm = new FormGroup({
      superficie: new FormControl(null, [Validators.required, Validators.pattern(/^-?[0-9][^\.]*$/), Validators.min(15), Validators.max(2000)]),
      ambientes: new FormControl(null, [Validators.required, Validators.pattern(/^-?[0-9][^\.]*$/), Validators.min(1), Validators.max(15)]),
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

  superficieInvalida() {
    return this.inputSuperficie.invalid && (this.inputSuperficie.dirty || this.inputSuperficie.touched)
  }

  ambientesInvalidos() {
    return this.inputAmbientes.invalid && (this.inputAmbientes.dirty || this.inputAmbientes.touched)
  }

  noPusoFecha() {
    return this.inputFecha.invalid && (this.inputFecha.dirty || this.inputFecha.touched)
  }

  noPuedeBuscar() {
    return this.superficieInvalida() || this.ambientesInvalidos() || this.formularioVacio()
  }

  formularioVacio() {
    return !this.tasacionBusqueda.ambientes_minimos && !this.tasacionBusqueda.fecha_desde && this.barriosSeleccionados.length == 0 && !this.tasacionBusqueda.id_tipo_operacion && !this.tipoDePropiedad && !this.tasacionBusqueda.superficie_minima
  }

  async buscar() {
    // console.log(this.tasacionBusqueda)

    this.cargando = true
    if (this.barriosSeleccionados.length > 0) {
      this.tasacionBusqueda.ids_barrios = this.barriosSeleccionados.map(barrio => barrio.id)
    }
    if (this.tipoDePropiedad) {
      this.tasacionBusqueda.id_tipo_propiedad = this.tipoDePropiedad.id
    }
    if (!this.tasacionBusqueda.fecha_desde) {
      this.tasacionBusqueda.fecha_desde = new Date()
    }
    this.resultados = await this.usuarioService.tasacionesSimilares(this.tasacionBusqueda)
    this.seLanzoBusqueda = true
    setTimeout(() => {
      this.cargando = false
    }, 350);

  }

  noHuboResultados() {
    return this.resultados.length == 0
  }

  openModalContactarUsuario(usuario: Usuario) {
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
  }

  modalContactarYaAbierto() {
    return this.modalService.getModalsCount() == 2
  }

  seleccionarTipoDeOperacion(tipoDeOperacion: TipoOperacion) {
    this.tasacionBusqueda.id_tipo_operacion = tipoDeOperacion.id
  }

}
