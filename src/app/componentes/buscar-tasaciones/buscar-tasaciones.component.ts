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

@Component({
  selector: 'app-buscar-tasaciones',
  templateUrl: './buscar-tasaciones.component.html',
  styleUrls: ['./buscar-tasaciones.component.css']
})
export class BuscarTasacionesComponent implements OnInit {

  barrios: Array<Zona>
  tiposDePropiedad: Array<TipoPropiedad>
  tiposDeOperacion: Array<TipoOperacion>
  tasacionBusqueda: TasacionBusqueda
  numbersValidatingForm: FormGroup
  resultados: Array<Tasacion>
  seLanzoBusqueda: boolean
  modalContactarUsuario: MDBModalRef

  constructor(private router: Router, public modalService: MDBModalService, public modalBuscarTasaciones: MDBModalRef, private zonaService: ZonaService, private tasacionService: TasacionService, private usuarioService: UsuarioService) {
  }

  get inputSuperficie() { return this.numbersValidatingForm.get('superficie') }
  get inputAmbientes() { return this.numbersValidatingForm.get('ambientes') }


  async ngOnInit() {
    this.setearFormulario()
    this.barrios = await this.zonaService.barrios()
    this.tiposDePropiedad = await this.tasacionService.tiposDePropiedad()
    this.tiposDeOperacion = await this.tasacionService.tiposDeOperacion()
  }

  setearFormulario() {
    this.seLanzoBusqueda = false
    this.resultados = undefined
    this.tasacionBusqueda = new TasacionBusqueda()
    this.numbersValidatingForm = new FormGroup({
      superficie: new FormControl(null, [Validators.required, Validators.pattern(/^-?[0-9][^\.]*$/), Validators.min(15), Validators.max(2000)]),
      ambientes: new FormControl(null, [Validators.required, Validators.pattern(/^-?[0-9][^\.]*$/), Validators.min(1), Validators.max(15)]),
    })
  }

  superficieInvalida() {
    return this.inputSuperficie.invalid && (this.inputSuperficie.dirty || this.inputSuperficie.touched)
  }

  ambientesInvalidos() {
    return this.inputAmbientes.invalid && (this.inputAmbientes.dirty || this.inputAmbientes.touched)
  }

  formularioVacio() {
    return !this.tasacionBusqueda.ambientes_minimos && !this.tasacionBusqueda.fecha_desde && !this.tasacionBusqueda.id_barrio && !this.tasacionBusqueda.id_tipo_operacion && !this.tasacionBusqueda.id_tipo_propiedad && !this.tasacionBusqueda.superficie_minima
  }

  async buscar() {
    this.resultados = await this.usuarioService.tasacionesSimilares(this.tasacionBusqueda)
    this.seLanzoBusqueda = true
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

}
