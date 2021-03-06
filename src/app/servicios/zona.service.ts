import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Zona } from '../dominio/zona';
import { REST_SERVER_URL } from './configuration';

@Injectable({
  providedIn: 'root'
})

export class ZonaService {

  constructor(private http: Http) { }

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

