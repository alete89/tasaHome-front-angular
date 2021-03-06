import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Tasacion } from '../dominio/tasacion';
import { TipoPropiedad } from '../dominio/tipo_propiedad';
import { REST_SERVER_URL } from './configuration';
import { TipoOperacion } from '../dominio/tipo_operacion';
import { Zona } from '../dominio/zona';

@Injectable({
  providedIn: 'root'
})

export class TasacionService {

  direccion: string
  barrio: Zona
  ultimaBusqueda: string

  constructor(private http: Http) {
    this.barrio = new Zona
    // this.barrio = undefined
  }

  async tiposDePropiedad() {
    const url = REST_SERVER_URL + "/tipos_propiedad"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(TipoPropiedad.fromJson)
  }

  async tiposDeOperacion() {
    const url = REST_SERVER_URL + "/tipos_operacion"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(TipoOperacion.fromJson)
  }

  async tasarPropiedad(tasacion: Tasacion) {
    tasacion.descripcion = ""
    tasacion.direccion = this.direccion
    tasacion.barrio = this.barrio
    const json = JSON.parse(JSON.stringify(tasacion))
    let resp = await this.http.put(REST_SERVER_URL + '/tasar_propiedad', json).toPromise()
    return resp.json()
  }

  async searchTasacionById(id_tasacion: number) {
    const url = REST_SERVER_URL + "/tasacion/" + id_tasacion
    const resp = await this.http.get(url).toPromise()
    const tasacion: Tasacion = Tasacion.fromJson(resp.json())
    return tasacion
  }

  async historialTasacion(id_tasacion: string) {
    const url = REST_SERVER_URL + "/historial_tasacion/" + id_tasacion
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Tasacion.fromJson)
  }

  setDireccionYBarrio(direccion: string, barrio: Zona) {
    this.direccion = direccion
    this.barrio = barrio
  }

  guardarDatos(direccion: string, barrio: string) {
    this.direccion = direccion
    this.barrio.descripcion = barrio
  }

  getDireccion() {
    return this.direccion
  }

  setUltimaBusqueda() {
    this.ultimaBusqueda = this.direccion
  }

  cambioDireccion() {
    return this.direccion != this.ultimaBusqueda
  }

  async datosBarrioPorNombre(longitud: number, latitud: number) {
    let jsonData: any = {}
    let latitudCasted = latitud.toString()
    let longitudCasted = longitud.toString()
    console.log(latitudCasted)
    console.log(longitudCasted)
    const urlEscuelas = "https://cors-anywhere.herokuapp.com/http://epok.buenosaires.gob.ar:80/reverseGeocoderLugares/?x=" + longitudCasted + "&y=" + latitudCasted + "&categorias=cuc_establecimientos_educativos&radio=500" 
    // const urlEscuelas = "http://epok.buenosaires.gob.ar:80/reverseGeocoderLugares/?x=" + longitudCasted + "&y=" + latitudCasted + "&categorias=cuc_establecimientos_educativos&radio=500"
    const respEscuelas = await this.http.get(urlEscuelas).toPromise()
    jsonData.escuelas = respEscuelas.json().totalFull

    console.log(jsonData.escuelas)

    const urlEspaciosVerdes = "https://cors-anywhere.herokuapp.com/http://epok.buenosaires.gob.ar:80/reverseGeocoderLugares/?x=" + longitudCasted + "&y=" + latitudCasted + "&categorias=espacios_verdes_publicos&radio=500"
    const respEspaciosVerdes = await this.http.get(urlEspaciosVerdes).toPromise()
    jsonData.espacios_verdes = respEspaciosVerdes.json().totalFull

    const urlHospitales = "https://cors-anywhere.herokuapp.com/http://epok.buenosaires.gob.ar:80/reverseGeocoderLugares/?x=" + longitudCasted + "&y=" + latitudCasted + "&categorias=centros_de_salud_y_accion_comunitaria,hospitales_de_ninos,hospitales_especializados,hospitales_generales_de_agudos&radio=500"
    const respHospitales = await this.http.get(urlHospitales).toPromise()
    jsonData.hospitales = respHospitales.json().totalFull

    const urlComisarias = "https://cors-anywhere.herokuapp.com/http://epok.buenosaires.gob.ar:80/reverseGeocoderLugares/?x=" + longitudCasted + "&y=" + latitudCasted + "&categorias=comisarias&radio=500"
    const respComisarias = await this.http.get(urlComisarias).toPromise()
    jsonData.comisarias = respComisarias.json().totalFull

    return jsonData
  }

  guardarBarrio(descripcionBarrio: string) {
    this.barrio = new Zona
    this.barrio.descripcion = descripcionBarrio
  }

}

