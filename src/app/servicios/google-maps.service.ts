import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  // apiKey = "&key=AIzaSyAykSBm-oMeyLr1S4rB_rqVSstWRgqMckM"
  apiKey = "&key=AIzaSyAykSBm-oMeyLr1S4rB_rqVSstWRgqMckM&libraries=places"
  googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?"
  placesUrl = "https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Sydney"

  constructor(private http: HttpClient) { }

  async getStringDireccionFromLatLong(marker: any) {
    // { latitude: lat, longitude: lng }

    const url = this.googleUrl + "latlng=" + marker.latitude + "," + marker.longitude + this.apiKey

    const response = await this.http.get<any>(url).toPromise()
    if (response.status != "OK") {
      throw response
    }

    const direccion = this.obtenerDireccion(response.results)
    return direccion
  }

  async getLatLongFromStringAddress(address: string) {
    // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
    let direccion = address.replace(" ", "+")
    direccion = direccion + "+Argentina"
    const url = this.googleUrl + "address=" + direccion + this.apiKey
    const resp = await this.http.get<any>(url).toPromise()
    return resp.results[0].geometry.location
  }

  obtenerDireccion(resultados) {
    let direccion
    let max = 0

    for (let resultado of resultados) {
      if (resultado.address_components.length > max) {
        direccion = resultado
        max = resultado.address_components.length
      }
    }
    return direccion
  }

}
