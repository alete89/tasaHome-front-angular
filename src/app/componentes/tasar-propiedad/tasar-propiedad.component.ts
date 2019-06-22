import { Component, OnInit } from '@angular/core';
import { Tasacion } from 'src/app/dominio/tasacion';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoPropiedad } from 'src/app/dominio/tipo_propiedad';
import { TasacionService } from 'src/app/servicios/tasacion.service';
import { Estado } from 'src/app/dominio/estado';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-tasar-propiedad',
  templateUrl: './tasar-propiedad.component.html',
  styleUrls: ['./tasar-propiedad.component.css']
})
export class TasarPropiedadComponent implements OnInit {

  tasacion: Tasacion
  tiposDePropiedad: Array<TipoPropiedad>
  tiposDeOperacion: Array<TipoPropiedad>
  estados: Array<Estado>
  numbersValidatingForm: FormGroup

  constructor(private usuarioService: UsuarioService, private tasacionService: TasacionService, private estadoService: EstadoService, private servicioService: ServicioService) {
    this.tasacion = new Tasacion()
    this.numbersValidatingForm = new FormGroup({
      superficie: new FormControl(null, [Validators.required, Validators.pattern(/^-?[0-9][^\.]*$/), Validators.min(1), Validators.max(100000000)]),
      ambientes: new FormControl(null, [Validators.required, Validators.pattern(/^-?[0-9][^\.]*$/), Validators.min(1), Validators.max(500)]),
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
    this.tasacion.servicios = await this.servicioService.servicios()
  }

  async tasar() {
    this.tasacion.valor = await this.tasacionService.tasarPropiedad(this.tasacion)
  }

  async guardar() {
    let respuesta = await this.usuarioService.guardarTasacion(this.tasacion)
  }

  async publicar() {

  }

}
