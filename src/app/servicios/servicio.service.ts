import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Tasacion } from '../dominio/tasacion';
import { TasacionBusqueda } from '../dominio/tasacion_busqueda';
import { TipoPropiedad } from '../dominio/tipo_propiedad';
import { REST_SERVER_URL } from './configuration';
import { Estado } from '../dominio/estado';
import { Servicio } from '../dominio/servicio';

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

