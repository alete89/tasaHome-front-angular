import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Estado } from 'src/app/dominio/estado';
import { Tasacion } from 'src/app/dominio/tasacion';
import { TipoPropiedad } from 'src/app/dominio/tipo_propiedad';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { TasacionService } from 'src/app/servicios/tasacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MostrarTasacionComponent } from '../mostrar-tasacion/mostrar-tasacion.component';
import { Servicio } from 'src/app/dominio/servicio';
import { TipoOperacion } from 'src/app/dominio/tipo_operacion';

@Component({
  selector: 'tasar-propiedad',
  templateUrl: './tasar-propiedad.component.html',
  styleUrls: ['./tasar-propiedad.component.css']
})
export class TasarPropiedadComponent implements OnInit {

  @Input() tasacion: Tasacion
  tiposDePropiedad: Array<TipoPropiedad>
  tiposDeOperacion: Array<TipoOperacion>
  estados: Array<Estado>
  servicios: Array<Servicio>
  numbersValidatingForm: FormGroup
  modalTasacion: MDBModalRef;
  @Input() titulo: string
  @Input() titulo_boton: string
  @Input() esActualizacion: boolean


  constructor(private modalService: MDBModalService, private usuarioService: UsuarioService, private tasacionService: TasacionService, private estadoService: EstadoService, private servicioService: ServicioService) {
    this.titulo = "Tasar propiedad"
    this.titulo_boton = "Tasar"
    this.esActualizacion = false
    this.tasacion = new Tasacion()
    this.numbersValidatingForm = new FormGroup({
      superficie: new FormControl(null, [Validators.required, Validators.pattern(/^-?[0-9][^\.]*$/), Validators.min(15), Validators.max(2000)]),
      ambientes: new FormControl(null, [Validators.required, Validators.pattern(/^-?[0-9][^\.]*$/), Validators.min(1), Validators.max(15)]),
    })
  }

  get inputSuperficie() { return this.numbersValidatingForm.get('superficie') }
  get inputAmbientes() { return this.numbersValidatingForm.get('ambientes') }


  superficieInvalida() {
    return this.inputSuperficie.invalid && (this.inputSuperficie.dirty || this.inputSuperficie.touched)
  }

  ambientesInvalidos() {
    return this.inputAmbientes.invalid && (this.inputAmbientes.dirty || this.inputAmbientes.touched)
  }

  async ngOnInit() {
    this.tiposDePropiedad = await this.tasacionService.tiposDePropiedad()
    this.tiposDeOperacion = await this.tasacionService.tiposDeOperacion()
    this.estados = await this.estadoService.estados()
    this.servicios = await this.servicioService.servicios()
    this.chequearServicios()
  }

  chequearServicios() {
    let i = 0
    while (i < this.servicios.length) {
      if (this.tasacion.servicios[i] && this.tasacion.servicios[i].chequeado) {
        this.servicios[i].chequear()
      }
      i++
    }
  }

  async tasar() {
    let servicios_seleccionados = this.servicios.filter(servicio => servicio.chequeado)
    this.tasacion.servicios = servicios_seleccionados
    this.tasacion.valor = await this.tasacionService.tasarPropiedad(this.tasacion)
  }


  noPuedeTasar() {
    return this.superficieInvalida() || this.ambientesInvalidos() || !this.tasacion.direccion || !this.tasacion.superficie || !this.tasacion.tipoDePropiedad.id || !this.tasacion.tipoDeOperacion.id || !this.tasacion.ambientes || !this.tasacion.estado.id
  }


  async openModalTasacion() {
    await this.tasar()
    this.modalTasacion = this.modalService.show(MostrarTasacionComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog modal-frame modal-bottom ',
      containerClass: 'right',
      animated: true,
      data: {
        tasacion: this.tasacion
      }

    });
  }

}
