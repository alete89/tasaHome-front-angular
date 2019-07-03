import { Component, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsService } from 'src/app/servicios/google-maps.service';
import { Escuela } from 'src/app/dominio/escuela';
import { EscuelaService } from 'src/app/servicios/escuela.service';
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
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  @ViewChild(AgmMap) map: AgmMap;

  latitude = -34.5783994
  longitude = -58.5268406
  direccion = ""
  geocoder: any;
  escuelas: Array<Escuela>

  icon = {
    url: 'https://cdn0.iconfinder.com/data/icons/learning-icons-rounded/110/School-512.png',
    // url: 'https://banner2.kisspng.com/20180706/gvh/kisspng-computer-icons-google-maps-school-student-5b3f228f73f853.247641171530864271475.jpg',
    scaledSize: {
      width: 30,
      height: 30
    }
  }

  marker = { latitude: -34.5783994, longitude: -58.5268406 };

  async placeMarker(position: any) {
    const lat = position.coords.lat;
    const lng = position.coords.lng;
    this.marker = { latitude: lat, longitude: lng };
    this.direccion = await this.googleMapsService.getStringDireccionFromLatLong(this.marker)
    console.log(this.direccion)
  }
  constructor(public mapsApiLoader: MapsAPILoader, private googleMapsService: GoogleMapsService, private escuelaService: EscuelaService) {
    this.mapsApiLoader = mapsApiLoader;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  async ngOnInit() {
    this.map.zoom = 16
    this.escuelas = await this.escuelaService.getEscuelas()
    console.log(this.escuelas)
  }

  async updateOnMap() {
    const latLong = await this.googleMapsService.getLatLongFromStringAddress(this.direccion)
    console.log(latLong)
    if (this.marker.latitude !== latLong.lat || this.marker.longitude !== latLong.lng) {
      this.map.zoom = 16
      this.marker = { latitude: latLong.lat, longitude: latLong.lng };
      this.latitude = latLong.lat
      this.longitude = latLong.lng
      this.direccion = await this.googleMapsService.getStringDireccionFromLatLong(this.marker)
    }
  }

  borrarBusqueda() {
    this.direccion = undefined
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
