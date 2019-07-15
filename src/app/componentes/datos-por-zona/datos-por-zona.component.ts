import { Component, OnInit, Input } from '@angular/core';
import { Zona } from 'src/app/dominio/zona';
import { ZonaService } from 'src/app/servicios/zona.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { MapaComponent } from '../mapa/mapa.component';
import { TasacionService } from 'src/app/servicios/tasacion.service';
import { GoogleMapsService } from 'src/app/servicios/google-maps.service';

@Component({
  selector: 'app-datos-por-zona',
  templateUrl: './datos-por-zona.component.html',
  styleUrls: ['./datos-por-zona.component.css']
})
export class DatosPorZonaComponent implements OnInit {

  zonas: Array<Zona>
  zonaSeleccionada: string
  zona: Zona
  barrios: Array<Zona>
  comunas: Array<Zona>
  datos: Array<any>
  modalMapa: MDBModalRef;
  titulo: string
  cargando: boolean
  direccion: string
  searchTerm: string

  constructor(public tasacionService: TasacionService, private modalService: MDBModalService, public modalRef: MDBModalRef, private zonaService: ZonaService, private googleMapsService: GoogleMapsService) {

  }

  cambiarSeleccion(select) {
    const [first] = select.itemsList.filteredItems;
    select.itemsList.markItem(first);
    if (select.dropdownPanel) {
      select.dropdownPanel.scrollTo(first);
    }
  }

  async ngOnInit() {
    this.titulo = "zona"
    this.tasacionService.direccion = undefined
    this.barrios = await this.zonaService.barrios()
    this.comunas = await this.zonaService.comunas()
  }

  seleccionarBarrio() {
    this.titulo = "barrio"
    this.zonas = this.barrios
    this.datos = undefined
    this.zona = undefined
  }

  async seleccionarDireccion() {
    this.titulo = "dirección"
    this.tasacionService.direccion = undefined
    this.datos = undefined
  }

  seleccionarComuna() {
    this.titulo = "comuna"
    this.zonas = this.comunas
    this.datos = undefined
    this.zona = undefined
  }

  async traerDatosBarrio() {
    this.datos = undefined
    if (this.zona) {
      this.datos = await this.zonaService.datosBarrio(this.zona.id)
      this.esperar()
    }
  }

  esperar() {
    this.cargando = true
    setTimeout(() => {
      this.cargando = false
    }, 350);
  }

  async traerDatosComuna() {
    this.datos = undefined
    if (this.zona) {
      this.datos = await this.zonaService.datosComuna(this.zona.id)
      this.esperar()
    }
  }

  async traerDatosBarrioPorNombre() {
    this.datos = undefined

    // this.tasacionService.setUltimaBusqueda()
    // this.direccion = this.tasacionService.direccion
    //this.datos = await this.tasacionService.datosBarrioPorNombre()
    // console.log(this.googleMapsService.getLatLongFromStringAddress(this.direccion))
    // this.esperar()
    this.tasacionService.setUltimaBusqueda()
    this.direccion = this.tasacionService.direccion
    this.cargando = true
    let coordenadas = await this.googleMapsService.getLatLongFromStringAddress(this.direccion)
    this.datos = await this.tasacionService.datosBarrioPorNombre(coordenadas.lng, coordenadas.lat)
    setTimeout(async () => {
      this.cargando = false
    }, 10);
  }

  cambioDireccion() {
    return this.tasacionService.cambioDireccion()
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
        esDatosPorZona: true
        // modalMapa: this.modalMapa
      }
    });
  }

  borrarBusqueda() {
    this.tasacionService.direccion = undefined
    this.datos = undefined
  }

  noPuedeBuscar() {
    return !this.tasacionService.direccion || !this.tasacionService.barrio || !this.cambioDireccion()
  }

  noPuedeBorrar() {
    return !this.tasacionService.direccion
  }

  modalYaAbierto() {
    return this.modalService.getModalsCount() > 1
  }

  mostrarDatos() {
    if (this.zonaSeleccionada == "Direccion") {
      return this.datos && !this.cambioDireccion()
    }
    return this.datos
  }

}
