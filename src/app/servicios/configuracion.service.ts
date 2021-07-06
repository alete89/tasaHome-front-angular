import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuracion } from '../dominio/configuracion';
import { REST_SERVER_URL } from './configuration';

@Injectable({
  providedIn: 'root'
})

export class ConfiguracionService {

  constructor(private http: HttpClient) { }

  async configuraciones() {
    const url = REST_SERVER_URL + "/configuracion"
    const resp = await this.http.get<any[]>(url).toPromise()
    return resp.map(Configuracion.fromJson)
  }

  async actualizarConfiguraciones(configuracion: Configuracion) {
    const url = REST_SERVER_URL + "/configuracion/actualizar/" + configuracion.dataset 
    const resp = await this.http.get(url).toPromise()
  }

}

