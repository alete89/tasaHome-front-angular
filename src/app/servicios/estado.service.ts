import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from '../dominio/estado';
import { REST_SERVER_URL } from './configuration';

@Injectable({
  providedIn: 'root'
})

export class EstadoService {

  constructor(private http: HttpClient) { }

  async estados() {
    const url = REST_SERVER_URL + "/estados"
    const resp = await this.http.get<Estado[]>(url).toPromise()
    return resp.map(Estado.fromJson)
  }


}

