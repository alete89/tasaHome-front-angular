import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Estado } from '../dominio/estado';
import { REST_SERVER_URL } from './configuration';
import { SitioPublicacion } from '../dominio/sitio_publicacion';

@Injectable({
  providedIn: 'root'
})

export class SitioPublicacionService {

  constructor(private http: Http) { }

  async sitios_publicacion() {
    const url = REST_SERVER_URL + "/sitios_publicacion"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(SitioPublicacion.fromJson)
  }


}

