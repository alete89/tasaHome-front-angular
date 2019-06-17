import { Component, OnInit } from '@angular/core';
import { Zona } from 'src/app/dominio/zona';
import { ZonaService } from 'src/app/servicios/zona.service';
import { Tasacion } from 'src/app/dominio/tasacion';
import { Usuario } from 'src/app/dominio/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TasacionBusqueda } from 'src/app/dominio/tasacion_busqueda';
import { TipoPropiedad } from 'src/app/dominio/tipo_propiedad';
import { TasacionService } from 'src/app/servicios/tasacion.service';

@Component({
  selector: 'app-buscar-tasaciones',
  templateUrl: './buscar-tasaciones.component.html',
  styleUrls: ['./buscar-tasaciones.component.css']
})
export class BuscarTasacionesComponent implements OnInit {

  barrios: Array<Zona>
  tiposDePropiedad: Array<TipoPropiedad>
  tiposDeOperacion: Array<TipoPropiedad>
  tasacionBusqueda: TasacionBusqueda
  numbersValidatingForm: FormGroup
  resultados: Array<Tasacion>

  constructor(private zonaService: ZonaService, private tasacionService: TasacionService, private usuarioService: UsuarioService) {
    this.setearFormulario()
  }

  get inputSuperficie() { return this.numbersValidatingForm.get('superficie') }
  get inputAmbientes() { return this.numbersValidatingForm.get('ambientes') }


  async ngOnInit() {
    this.barrios = await this.zonaService.barrios()
    this.tiposDePropiedad = await this.tasacionService.tiposDePropiedad()
    this.tiposDeOperacion = await this.tasacionService.tiposDeOperacion()
  }

  setearFormulario() {
    this.resultados = undefined
    this.tasacionBusqueda = new TasacionBusqueda()
    this.numbersValidatingForm = new FormGroup({
      superficie: new FormControl(null, [Validators.required, Validators.pattern(/^-?[0-9][^\.]*$/), Validators.min(1), Validators.max(100000000)]),
      ambientes: new FormControl(null, [Validators.required, Validators.pattern(/^-?[0-9][^\.]*$/), Validators.min(1), Validators.max(500)]),
    })
  }

  superficieInvalida() {
    return this.inputSuperficie.invalid && (this.inputSuperficie.dirty || this.inputSuperficie.touched)
  }

  ambientesInvalidos() {
    return this.inputAmbientes.invalid && (this.inputAmbientes.dirty || this.inputAmbientes.touched)
  }

  formularioVacio() {
    return !this.tasacionBusqueda.ambientes && !this.tasacionBusqueda.fecha_desde && !this.tasacionBusqueda.id_barrio && !this.tasacionBusqueda.id_tipo_operacion && !this.tasacionBusqueda.id_tipo_propiedad && !this.tasacionBusqueda.superficie_minima
  }

  async buscar() {
    this.resultados = await this.tasacionService.tasacionesSimilares(this.tasacionBusqueda)
  }

}
