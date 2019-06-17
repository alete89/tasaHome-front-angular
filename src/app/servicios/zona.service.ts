import { Injectable } from '@angular/core';
import { Usuario } from '../dominio/usuario';
import { REST_SERVER_URL } from './configuration';
import { Http } from '@angular/http';
import { Tasacion } from '../dominio/tasacion';
import { Zona } from '../dominio/zona';
import { TipoPropiedad } from '../dominio/tipo_propiedad';

@Injectable({
  providedIn: 'root'
})

export class ZonaService {

  constructor(private http: Http) { }

  async provincias() {
    const url = REST_SERVER_URL + "/provincias"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Zona.fromJson)
  }

  async partidos(provincia_id: number) {
    const url = REST_SERVER_URL + "/partidos/" + provincia_id
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Zona.fromJson)
  }

  async localidades(partido_id: number) {
    const url = REST_SERVER_URL + "/localidades/" + partido_id
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Zona.fromJson)
  }

  async barrios() {
    const url = REST_SERVER_URL + "/barrios"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Zona.fromJson)
  }

  async comunas() {
    const url = REST_SERVER_URL + "/comunas"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Zona.fromJson)
  }

  async datosBarrio(id: number) {
    const url = REST_SERVER_URL + "/datos/barrio/" + id
    const resp = await this.http.get(url).toPromise()
    return resp.json()
  }

  async datosComuna(id: number) {
    const url = REST_SERVER_URL + "/datos/comuna/" + id
    const resp = await this.http.get(url).toPromise()
    return resp.json()
  }

}

