import { Component, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsService } from 'src/app/servicios/google-maps.service';
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
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  longitude = 20.728218;
  latitude = 52.128973;
  direccion: string = ""
  geocoder: any;
  public location: Location = {
    lat: -34.5783994,
    lng: -58.5268406,
    zoom: 16
  };

  marker = { latitude: -34.5783994, longitude: -58.5268406 };

  async placeMarker(position: any) {
    const lat = position.coords.lat;
    const lng = position.coords.lng;

    this.marker = { latitude: lat, longitude: lng };
    this.direccion = await this.googleMapsService.getStringDireccionFromLatLong(this.marker)
    console.log(this.direccion)
  }

  @ViewChild(AgmMap) map: AgmMap;


  constructor(public mapsApiLoader: MapsAPILoader, private googleMapsService: GoogleMapsService) {
    this.mapsApiLoader = mapsApiLoader;

    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit(): void { }

  async updateOnMap() {

    const latLong = await this.googleMapsService.getLatLongFromStringAddress(this.direccion)
    console.log(latLong)
    this.marker = { latitude: latLong.lat, longitude: latLong.lng };
    var center = new google.maps.LatLng(latLong.lat, latLong.lng);
    this.map.usePanning = true;
    // this.map.
    this.location.zoom = 16
    this.location.lat = latLong.lat
    this.location.lng = latLong.lng
    // this.location.viewport = this.marker

    // this.findLocation(full_address);
  }

  findLocation(address) {
    if (!this.geocoder) { this.geocoder = new google.maps.Geocoder(); }
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        for (var i = 0; i < results[0].address_components.length; i++) {
          let types = results[0].address_components[i].types;

          if (types.indexOf('locality') !== -1) {
            this.location.address_level_2 = results[0].address_components[i].long_name;
          }
          if (types.indexOf('country') !== -1) {
            this.location.address_country = results[0].address_components[i].long_name;
          }
          if (types.indexOf('postal_code') !== -1) {
            this.location.address_zip = results[0].address_components[i].long_name;
          }
          if (types.indexOf('administrative_area_level_1') !== -1) {
            this.location.address_state = results[0].address_components[i].long_name;
          }
        }

        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.location.marker.lat = results[0].geometry.location.lat();
          this.location.marker.lng = results[0].geometry.location.lng();
          this.location.marker.draggable = true;
          this.location.viewport = results[0].geometry.viewport;
        }

        this.map.triggerResize();
      } else {
        alert("Sorry, this search produced no results.");
      }
    });
  }


  findAddressByCoordinates() {
    this.geocoder.geocode({
      'location': {
        lat: this.location.marker.lat,
        lng: this.location.marker.lng
      }
    }, (results, status) => {
      this.decomposeAddressComponents(results);
    });
  }

  decomposeAddressComponents(addressArray) {
    if (addressArray.length == 0) { return false; }
    let address = addressArray[0].address_components;

    for (let element of address) {
      if (element.length == 0 && !element['types']) { continue; }

      if (element['types'].indexOf('street_number') > -1) {
        this.location.address_level_1 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('route') > -1) {
        this.location.address_level_1 += ', ' + element['long_name'];
        continue;
      }
      if (element['types'].indexOf('locality') > -1) {
        this.location.address_level_2 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('administrative_area_level_1') > -1) {
        this.location.address_state = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('country') > -1) {
        this.location.address_country = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('postal_code') > -1) {
        this.location.address_zip = element['long_name'];
        continue;
      }
    }
  }
}




// import { Component, OnInit } from '@angular/core';
// import { google } from '@agm/core/services/google-maps-types';

// @Component({
//   selector: 'app-mapa',
//   templateUrl: './mapa.component.html',
//   styleUrls: ['./mapa.component.css']
// })
// export class MapaComponent implements OnInit {


//   constructor() { }
//   title = 'TASITA';
//   lat = 51.678418;
//   lng = 7.809007;


//   ngOnInit() {
//   }



// }



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
