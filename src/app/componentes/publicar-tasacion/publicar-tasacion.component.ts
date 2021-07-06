import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { SitioPublicacion } from 'src/app/dominio/sitio_publicacion';
import { Tasacion } from 'src/app/dominio/tasacion';
import { SitioPublicacionService } from 'src/app/servicios/sitio_publicacion.service';
import { Notification } from 'src/app/shared/notifications/notification';

@Component({
  selector: 'publicar-tasacion',
  templateUrl: './publicar-tasacion.component.html',
  styleUrls: ['./publicar-tasacion.component.css']
})
export class PublicarTasacionComponent implements OnInit {

  tasacion: Tasacion
  modalPublicarTasacion: MDBModalRef
  sitios: Array<SitioPublicacion>
  notification: Notification = new Notification()


  constructor(private sitiosService: SitioPublicacionService, public modalPublicar: MDBModalRef) { }

  async ngOnInit() {
    try {
      this.sitios = await this.sitiosService.sitios_publicacion()
    } catch(error) {
      this.notification.showError(error)
    }
  }

  async publicar() {
    this.modalPublicarTasacion.hide()
  }

  cancelar() {
    this.modalPublicar.hide()
  }

}
