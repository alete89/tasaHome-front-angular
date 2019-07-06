import { Component, OnInit, ViewChild, Input, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsService } from 'src/app/servicios/google-maps.service';
import { Escuela } from 'src/app/dominio/escuela';
import { EscuelaService } from 'src/app/servicios/escuela.service';
import { MDBModalRef } from 'angular-bootstrap-md';
import { TasacionService } from 'src/app/servicios/tasacion.service';
import { Notification } from 'src/app/shared/notifications/notification';
import { ZonaService } from 'src/app/servicios/zona.service';
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
  escuelas: Array<Escuela>
  esModal: boolean = false
  barrio: string
  notification: Notification = new Notification()
  errores: Array<string> = []
  autocomplete
  esDatosPorZona: boolean

  icon = {
    url: 'https://cdn0.iconfinder.com/data/icons/learning-icons-rounded/110/School-512.png',
    // url: 'https://banner2.kisspng.com/20180706/gvh/kisspng-computer-icons-google-maps-school-student-5b3f228f73f853.247641171530864271475.jpg',
    scaledSize: {
      width: 30,
      height: 30
    }
  }

  @ViewChild("search")
  public searchElementRef: ElementRef;

  marker = { latitude: -34.603729, longitude: -58.381569 };

  constructor(private ngZone: NgZone, private mapsApiLoader: MapsAPILoader, private googleMapsService: GoogleMapsService, private escuelaService: EscuelaService, private tasacionService: TasacionService, public modalMapa: MDBModalRef) {
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
          this.direccion = place.formatted_address
          console.log(place)
          this.direccionGoogle = this.direccion
        });
      });
    });
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
      this.escuelas = await this.escuelaService.getEscuelas()
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
        this.direccion = await this.googleMapsService.getStringDireccionFromLatLong(this.marker)
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
