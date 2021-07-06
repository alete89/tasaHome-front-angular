import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SitioPublicacion } from '../dominio/sitio_publicacion';
import { REST_SERVER_URL } from './configuration';

@Injectable({
  providedIn: 'root'
})

export class SitioPublicacionService {

  constructor(private http: HttpClient) { }

  async sitios_publicacion() {
    const url = REST_SERVER_URL + "/sitios_publicacion"
    const resp = await this.http.get<SitioPublicacion[]>(url).toPromise()
    return resp.map(SitioPublicacion.fromJson)
  }

}

