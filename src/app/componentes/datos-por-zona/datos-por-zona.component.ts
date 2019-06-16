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

  constructor(private zonaService: ZonaService) {

  }

  async ngOnInit() {
    this.zonas = await this.zonaService.barrios()
  }

  prueba(){
    console.log(this.zonaSeleccionada)
  }

}
