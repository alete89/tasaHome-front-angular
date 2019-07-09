import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Estado } from '../dominio/estado';
import { REST_SERVER_URL } from './configuration';
import { Lugar } from '../dominio/lugar';

@Injectable({
  providedIn: 'root'
})

export class LugarService {

  constructor(private http: Http) { }

  async getEscuelas() {
    const url = REST_SERVER_URL + "/escuelas"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Lugar.fromJson)
  }

  async getHospitales() {
    const url = REST_SERVER_URL + "/hospitales"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Lugar.fromJson)
  }

  async getComisarias() {
    const url = REST_SERVER_URL + "/comisarias"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Lugar.fromJson)
  }

  async getEspaciosVerdes() {
    const url = REST_SERVER_URL + "/espacios-verdes"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Lugar.fromJson)
  }

}

