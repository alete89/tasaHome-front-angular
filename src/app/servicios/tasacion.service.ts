import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Tasacion } from '../dominio/tasacion';
import { TipoPropiedad } from '../dominio/tipo_propiedad';
import { REST_SERVER_URL } from './configuration';
import { TipoOperacion } from '../dominio/tipo_operacion';

@Injectable({
  providedIn: 'root'
})

export class TasacionService {

  constructor(private http: Http) { }

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
    const json = JSON.parse(JSON.stringify(tasacion))
    let resp = await this.http.put(REST_SERVER_URL + '/tasar_propiedad', json).toPromise()
    return resp.json()
  }

  async searchTasacionById(id_tasacion: number) {
    const url = REST_SERVER_URL + "/tasacion/" + id_tasacion
    const resp = await this.http.get(url).toPromise()
    const tasacion: Tasacion = Tasacion.fromJson(resp.json())
    // console.log(tasacion)
    return tasacion
  }

  async historialTasacion(id_tasacion: string) {
    const url = REST_SERVER_URL + "/historial_tasacion/" + id_tasacion
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Tasacion.fromJson)
  }

}

