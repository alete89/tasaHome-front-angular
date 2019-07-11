import { AgmMap, MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Lugar } from 'src/app/dominio/lugar';
import { GoogleMapsService } from 'src/app/servicios/google-maps.service';
import { LugarService } from 'src/app/servicios/lugar.service';
import { TasacionService } from 'src/app/servicios/tasacion.service';
import { Notification } from 'src/app/shared/notifications/notification';
import { Router } from '@angular/router';
declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  // zoom: number;
  marker?: Marker;
}
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {

  @ViewChild(AgmMap) map: AgmMap;

  latitude = -34.603729
  longitude = -58.381569
  direccion = ""
  direccionGoogle: string
  geocoder: any;
  escuelas: Array<Lugar>
  hospitales: Array<Lugar>
  comisarias: Array<Lugar>
  espacios_verdes: Array<Lugar>
  esModal: boolean
  barrio: string
  notification: Notification
  errores: Array<string>
  autocomplete
  esDatosPorZona: boolean
  lugarSeleccionado: Lugar
  opcion: string
  cargando: boolean
  map_loaded: boolean
  id: number = 0

  @ViewChild('focusThis') focusThis;

  clusterStyle = [{
    height: 53,
    url: 'assets/m1.png',
    width: 53
  },
  {
    height: 56,
    url: 'assets/m2.png',
    width: 56
  },
  {
    height: 66,
    url: 'assets/m3.png',
    width: 66
  },
  {
    height: 78,
    url: 'assets/m4.png',
    width: 78
  },
  {
    height: 90,
    url: 'assets/m5.png',
    width: 90
  }]

  // hospitalesClusterOptions = {
  //   gridSize: 50,
  //   styles: this.hospitalesClusterStyle,
  //   maxZoom: 15
  // };

  iconEscuela = {
    url: 'assets/escuela2.png',
    scaledSize: {
      width: 30,
      height: 30
    }
  }

  iconHospital = {
    url: 'assets/hospital3.png',
    scaledSize: {
      width: 30,
      height: 30
    }
  }

  iconComisaria = {
    url: 'assets/comisaria.png',
    scaledSize: {
      width: 30,
      height: 30
    }
  }

  iconEspacio = {
    url: 'assets/espacio3.png',
    // url: 'https://banner2.kisspng.com/20180706/gvh/kisspng-computer-icons-google-maps-school-student-5b3f228f73f853.247641171530864271475.jpg',
    scaledSize: {
      width: 30,
      height: 30
    }
  }

  @ViewChild("search")
  public searchElementRef: ElementRef;

  marker = { latitude: -34.603729, longitude: -58.381569 };

  constructor(private router: Router, private ngZone: NgZone, private mapsApiLoader: MapsAPILoader, private googleMapsService: GoogleMapsService, private lugarService: LugarService, private tasacionService: TasacionService, public modalMapa: MDBModalRef) {
    this.map_loaded = false
    this.errores = []
    this.notification = new Notification()
    this.cargando = false
    this.esModal = false
    this.opcion = "Ninguna"

  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.focusThis.nativeElement.focus();
      if (this.id == 0) {
        this.id++
      }
    }, 10);
  }

  esHome() {
    return this.router.url === '/home'
  }

  inicializarMapa() {
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        // types: ["address"],
        componentRestrictions: { country: 'ar' }
      });
      this.autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place = this.autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          if (this.esModal) {
            this.buscarBarrio(place.address_components)
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.marker = { latitude: this.latitude, longitude: this.longitude };
          this.map.zoom = 16
          this.direccion = place.formatted_address
          console.log(place)
          this.direccionGoogle = this.direccion
        });
      });
    });
  }

  seleccionarOpcion(opcion: string) {
    this.cargando = true
    setTimeout(() => {
      this.opcion = opcion
      this.cargando = false
    }, 700);
  }

  buscarBarrio(components: any) {
    this.barrio = undefined
    for (const component of components) {
      if (component.types[0] == 'sublocality_level_1' || component.types[0] == 'political' || component.types[0] == 'sublocality') {
        this.barrio = component.short_name
      }
    }
    this.tasacionService.guardarBarrio(this.barrio)
  }

  async placeMarker(position: any) {
    try {
      const lat = position.coords.lat;
      const lng = position.coords.lng;
      this.marker = { latitude: lat, longitude: lng };
      let respuesta = await this.googleMapsService.getStringDireccionFromLatLong(this.marker)
      this.direccion = respuesta.formatted_address
      if (this.esModal) {
        this.buscarBarrio(respuesta.address_components)
      }
      this.direccionGoogle = this.direccion
      this.errores = []
      // console.log(this.direccion)
    } catch (error) {
      this.errores.push(error)
    }
  }

  async ngOnInit() {
    this.notification.cleanLoading()
    this.inicializarMapa()
    this.map.zoom = 16
    if (!this.esModal) {
      this.escuelas = await this.lugarService.getEscuelas()
      this.hospitales = await this.lugarService.getHospitales()
      this.comisarias = await this.lugarService.getComisarias()
      this.espacios_verdes = await this.lugarService.getEspaciosVerdes()
    }
  }

  async updateOnMap() {
    try {
      const latLong = await this.googleMapsService.getLatLongFromStringAddress(this.direccion)
      console.log(latLong)
      if (this.marker.latitude !== latLong.lat || this.marker.longitude !== latLong.lng) {
        this.map.zoom = 16
        this.marker = { latitude: latLong.lat, longitude: latLong.lng };
        this.latitude = latLong.lat
        this.longitude = latLong.lng
        let respuesta = await this.googleMapsService.getStringDireccionFromLatLong(this.marker)
        this.direccion = respuesta.formatted_address
        this.direccionGoogle = this.direccion
        this.errores = []
      }
    } catch (error) {
      this.errores.push(error)
    }
  }

  borrarBusqueda() {
    this.direccion = undefined
  }

  cerrarModal() {
    this.modalMapa.hide()
  }

  seleccionarLugar(lugar: Lugar) {
    console.log(lugar)
    this.lugarSeleccionado = lugar
  }

  seleccionarNinguna() {
    this.opcion = "Ninguna"
  }


  aceptar() {
    this.tasacionService.guardarDatos(this.direccion, this.barrio)
    this.cerrarModal()
  }

  noPuedeAceptar() {
    return !this.direccionGoogle || this.direccionGoogle !== this.direccion || !this.barrio
  }

  ingresoDireccionNoDeCABA() {
    return this.direccion && this.direccionGoogle && !this.barrio
  }

  ngOnDestroy() {
    document.removeEventListener('keyup', this.autocomplete, false);
  }

}


// lo que veo en algunos ejemplos:

// export function initMap() {
//   const verga = new google();
//   console.log(verga)
//   const map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 8,
//     center: { lat: 40.731, lng: -73.997 }
//   });
//   const geocoder = new google.maps.Geocoder();
//   const infowindow = new google.maps.InfoWindow();

//   document.getElementById('submit').addEventListener('click', () => {
//     geocodeLatLng(geocoder, map, infowindow);
//   });
// }

// function geocodeLatLng(geocoder, map, infowindow) {
//   const input = "40.714224,-73.961452"
//   const latlngStr = input.split(',', 2);
//   const latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
//   geocoder.geocode({ location: latlng }, (results, status) => {
//     if (status === 'OK') {
//       if (results[0]) {
//         map.setZoom(11);
//         const marker = new google.maps.Marker({
//           position: latlng,
//           map: map
//         });
//         infowindow.setContent(results[0].formatted_address);
//         infowindow.open(map, marker);
//       } else {
//         window.alert('No results found');
//       }
//     } else {
//       window.alert('Geocoder failed due to: ' + status);
//     }
//   });
// }
