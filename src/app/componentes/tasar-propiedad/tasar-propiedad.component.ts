import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Notification } from 'src/app/shared/notifications/notification';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Estado } from 'src/app/dominio/estado';
import { Servicio } from 'src/app/dominio/servicio';
import { Tasacion } from 'src/app/dominio/tasacion';
import { TipoOperacion } from 'src/app/dominio/tipo_operacion';
import { TipoPropiedad } from 'src/app/dominio/tipo_propiedad';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { TasacionService } from 'src/app/servicios/tasacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MostrarTasacionComponent } from '../mostrar-tasacion/mostrar-tasacion.component';
import { MapaComponent } from '../mapa/mapa.component';

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
  validatingForm: FormGroup
  modalTasacion: MDBModalRef;
  modalMapa: MDBModalRef;
  notification: Notification = new Notification()
  @Input() titulo: string
  @Input() titulo_boton: string
  @Input() esActualizacion: boolean
  cargando: boolean

  constructor(private modalService: MDBModalService, private usuarioService: UsuarioService, public tasacionService: TasacionService, private estadoService: EstadoService, private servicioService: ServicioService) {
    this.titulo = "Tasar propiedad"
    this.titulo_boton = "Tasar"
    this.esActualizacion = false
    this.tasacion = new Tasacion()
    this.validatingForm = new FormGroup({
      superficie: new FormControl(null, [Validators.required, Validators.pattern(/^-?[0-9][^\.]*$/), Validators.min(15), Validators.max(2000)]),
      ambientes: new FormControl(null, [Validators.required, Validators.pattern(/^-?[0-9][^\.]*$/), Validators.min(1), Validators.max(15)]),
      direccion: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.pattern(/^[a-zA-Z\s\d\/]*\d[a-zA-Z\s\d\/]*$/)]),
      //NO VALIDA BIEN LA DIRECCION. VER COMO VALIDARLA USANDO LA API DE GOOGLE
    })
  }

  get inputSuperficie() { return this.validatingForm.get('superficie') }
  get inputAmbientes() { return this.validatingForm.get('ambientes') }
  get inputDireccion() { return this.validatingForm.get('direccion') }


  superficieInvalida() {
    return this.inputSuperficie.invalid && (this.inputSuperficie.dirty || this.inputSuperficie.touched)
  }

  ambientesInvalidos() {
    return this.inputAmbientes.invalid && (this.inputAmbientes.dirty || this.inputAmbientes.touched)
  }

  direccionInvalida() {
    return this.inputDireccion.invalid && (this.inputDireccion.dirty || this.inputDireccion.touched)
  }

  async ngOnInit() {
    try {
      this.tiposDePropiedad = await this.tasacionService.tiposDePropiedad()
      this.tiposDeOperacion = await this.tasacionService.tiposDeOperacion()
      this.estados = await this.estadoService.estados()
      this.servicios = await this.servicioService.servicios()
      if (this.esActualizacion) {
        this.tasacionService.setDireccionYBarrio(this.tasacion.direccion, this.tasacion.barrio)
      } else {
        this.tasacionService.direccion = undefined
      }
      this.chequearServicios()
    } catch (error) {
      this.notification.showError(error)
    }
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
    this.tasacion.direccion = "dada"
    this.tasacion.valor = await this.tasacionService.tasarPropiedad(this.tasacion)
  }


  noPuedeTasar() {
    return this.camposInvalidos() || this.formularioIncompleto() || this.modalTasarYaAbierto()
  }

  camposInvalidos() {
    return this.superficieInvalida() || this.ambientesInvalidos()
  }

  formularioIncompleto() {
    return !this.tasacion.superficie || !this.tasacion.tipoDePropiedad.id || !this.tasacion.tipoDeOperacion.id || !this.tasacion.ambientes || !this.tasacion.estado.id
  }

  async openModalTasacion() {
    try {
      this.cargando = true
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
    } catch (error) {
      this.notification.showError(error)
      // let mensaje = JSON.parse(error.error).message
      // this.notification.popUpMessage(mensaje, "danger", 1500)
    } finally {
      this.cargando = false
    }
  }

  async openModalMapa() {
    this.modalMapa = this.modalService.show(MapaComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog modal-lg',
      containerClass: 'right',
      animated: true,
      data: {
        esModal: true,
        // modalMapa: this.modalMapa
      }
    });
  }

  modalTasarYaAbierto() {
    return this.modalService.getModalsCount() == 1
  }

}
