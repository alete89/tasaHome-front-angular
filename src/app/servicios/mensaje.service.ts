import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { REST_SERVER_URL } from './configuration';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private http: HttpClient) { }

  async enviarMensaje(id_emisor: string, email_receptor: string, mensaje: string) {
    const url = REST_SERVER_URL + "/enviar_mensaje/" + id_emisor
    let json: any = {}
    json.email_receptor = email_receptor
    json.mensaje = mensaje
    const resp = await this.http.post(url, json, { responseType: 'text' }).toPromise()
    return resp
  }

  async recuperarContrasenia(email: string) {
    const url = REST_SERVER_URL + "/recuperar_contrasenia/"
    let json: any = {}
    json.email = email
    const resp = await this.http.post(url, json, { responseType: 'text' }).toPromise()
    return resp
  }


}

