import { Component, OnInit } from '@angular/core';
import { Zona } from 'src/app/dominio/zona';
import { ZonaService } from 'src/app/servicios/zona.service';

@Component({
  selector: 'registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  partidos: Array<Zona>
  provincias: Array<Zona>
  localidades: Array<Zona>

  constructor(private zonaService: ZonaService) {

  }

  async ngOnInit() {
    this.partidos = await this.zonaService.partidos()
    this.provincias = await this.zonaService.provincias()
    this.localidades = await this.zonaService.localidades()
    console.log(this.provincias)
  }

}
