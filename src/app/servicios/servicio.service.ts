import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicio } from '../dominio/servicio';
import { REST_SERVER_URL } from './configuration';

@Injectable({
  providedIn: 'root'
})

export class ServicioService {

  constructor(private http: HttpClient) { }

  async servicios() {
    const url = REST_SERVER_URL + "/servicios"
    const resp = await this.http.get<Servicio[]>(url).toPromise()
    return resp.map(Servicio.fromJson)
  }

}

