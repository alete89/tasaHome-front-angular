import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Estado } from '../dominio/estado';
import { REST_SERVER_URL } from './configuration';

@Injectable({
  providedIn: 'root'
})

export class EstadoService {

  constructor(private http: Http) { }

  async estados() {
    const url = REST_SERVER_URL + "/estados"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Estado.fromJson)
  }


}

