import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  apiKey = "&key=AIzaSyAykSBm-oMeyLr1S4rB_rqVSstWRgqMckM"
  googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?"

  constructor(private http: Http) { }

  async getStringDireccionFromLatLong(marker: any) {
    // { latitude: lat, longitude: lng }
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyAykSBm-oMeyLr1S4rB_rqVSstWRgqMckM

    const url = this.googleUrl + "latlng=" + marker.latitude + "," + marker.longitude + this.apiKey
    const resp = await this.http.get(url).toPromise()
    return resp.json().results[0].formatted_address
  }

  async getLatLongFromStringAddress(address: string){
    // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
    let direccion = address.replace(" ", "+")
    direccion = direccion + "+Argentina"
    const url = this.googleUrl + "address=" + direccion + this.apiKey
    const resp = await this.http.get(url).toPromise()
    return resp.json().results[0].geometry.location
  }

}
