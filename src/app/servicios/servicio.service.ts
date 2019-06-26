import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Servicio } from '../dominio/servicio';
import { REST_SERVER_URL } from './configuration';

@Injectable({
  providedIn: 'root'
})

export class ServicioService {

  constructor(private http: Http) { }

  async servicios() {
    const url = REST_SERVER_URL + "/servicios"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Servicio.fromJson)
  }


}

