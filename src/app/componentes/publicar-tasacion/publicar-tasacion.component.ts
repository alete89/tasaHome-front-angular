import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { SitioPublicacion } from 'src/app/dominio/sitio_publicacion';
import { Tasacion } from 'src/app/dominio/tasacion';
import { SitioPublicacionService } from 'src/app/servicios/sitio_publicacion.service';

@Component({
  selector: 'publicar-tasacion',
  templateUrl: './publicar-tasacion.component.html',
  styleUrls: ['./publicar-tasacion.component.css']
})
export class PublicarTasacionComponent implements OnInit {

  tasacion: Tasacion
  modalPublicarTasacion: MDBModalRef
  sitios: Array<SitioPublicacion>

  constructor(private sitiosService: SitioPublicacionService, public modalPublicar: MDBModalRef) { }

  async ngOnInit() {
    this.sitios = await this.sitiosService.sitios_publicacion()
  }

  async publicar() {
    this.modalPublicarTasacion.hide()
  }

  cancelar() {
    this.modalPublicar.hide()
  }

}
