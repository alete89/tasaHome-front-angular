import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lugar } from '../dominio/lugar';
import { REST_SERVER_URL } from './configuration';

@Injectable({
  providedIn: 'root'
})

export class LugarService {

  constructor(private http: HttpClient) { }

  async getEscuelas() {
    const url = REST_SERVER_URL + "/escuelas"
    const resp = await this.http.get<Lugar[]>(url).toPromise()
    return resp.map(Lugar.fromJson)
  }

  async getHospitales() {
    const url = REST_SERVER_URL + "/hospitales"
    const resp = await this.http.get<Lugar[]>(url).toPromise()
    return resp.map(Lugar.fromJson)
  }

  async getComisarias() {
    const url = REST_SERVER_URL + "/comisarias"
    const resp = await this.http.get<Lugar[]>(url).toPromise()
    return resp.map(Lugar.fromJson)
  }

  async getEspaciosVerdes() {
    const url = REST_SERVER_URL + "/espacios-verdes"
    const resp = await this.http.get<Lugar[]>(url).toPromise()
    return resp.map(Lugar.fromJson)
  }

}

