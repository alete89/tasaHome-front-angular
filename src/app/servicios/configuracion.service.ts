import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Configuracion } from '../dominio/configuracion';
import { REST_SERVER_URL } from './configuration';

@Injectable({
  providedIn: 'root'
})

export class ConfiguracionService {

  constructor(private http: Http) { }

  async configuraciones() {
    const url = REST_SERVER_URL + "/configuracion"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Configuracion.fromJson)
  }


}

