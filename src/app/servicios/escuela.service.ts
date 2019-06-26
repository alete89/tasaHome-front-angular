import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Estado } from '../dominio/estado';
import { REST_SERVER_URL } from './configuration';
import { Escuela } from '../dominio/escuela';

@Injectable({
  providedIn: 'root'
})

export class EscuelaService {

  constructor(private http: Http) { }

  async getEscuelas() {
    const url = REST_SERVER_URL + "/escuelas"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Escuela.fromJson)
  }


}

