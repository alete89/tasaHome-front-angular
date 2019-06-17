import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Tasacion } from '../dominio/tasacion';
import { TasacionBusqueda } from '../dominio/tasacion_busqueda';
import { TipoPropiedad } from '../dominio/tipo_propiedad';
import { REST_SERVER_URL } from './configuration';

@Injectable({
  providedIn: 'root'
})

export class TasacionService {

  constructor(private http: Http) { }

  async tiposDePropiedad() {
    const url = REST_SERVER_URL + "/tipos-propiedad"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(TipoPropiedad.fromJson)
  }

  async tiposDeOperacion() {
    const url = REST_SERVER_URL + "/tipos-operacion"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(TipoPropiedad.fromJson)
  }


  async tasacionesSimilares(tasacionBusqueda: TasacionBusqueda) {
    const json = JSON.parse(JSON.stringify(tasacionBusqueda))
    const resp = await this.http.put(REST_SERVER_URL + '/tasaciones_similares', json).toPromise()
    return resp.json().map(Tasacion.fromJson)
  }

}

