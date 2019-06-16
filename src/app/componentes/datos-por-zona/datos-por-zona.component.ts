import { Component, OnInit } from '@angular/core';
import { Zona } from 'src/app/dominio/zona';
import { ZonaService } from 'src/app/servicios/zona.service';

@Component({
  selector: 'app-datos-por-zona',
  templateUrl: './datos-por-zona.component.html',
  styleUrls: ['./datos-por-zona.component.css']
})
export class DatosPorZonaComponent implements OnInit {

  zonas: Array<Zona>
  zonaSeleccionada: String
  zonaId: number
  barrios: Array<Zona>
  comunas: Array<Zona>
  direcciones: Array<Zona>
  datos: Array<any>

  constructor(private zonaService: ZonaService) {

  }

  async ngOnInit() {
    this.barrios = await this.zonaService.barrios()
    this.comunas = await this.zonaService.comunas()
  }

  seleccionarBarrio() {
    this.zonas = this.barrios
    this.datos = undefined
    this.zonaId = undefined
  }

  seleccionarDireccion() {
    this.zonas = undefined
    this.zonaId = undefined
    this.datos = undefined

  }

  seleccionarComuna() {
    this.zonas = this.comunas
    this.datos = undefined
    this.zonaId = undefined
  }

  async traerDatosBarrio() {
    this.datos = await this.zonaService.datosBarrio(this.zonaId)
  }

  async traerDatosComuna() {
    this.datos = await this.zonaService.datosComuna(this.zonaId)
  }


}
