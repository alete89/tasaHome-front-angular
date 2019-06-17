import { Injectable } from '@angular/core';
import { Usuario } from '../dominio/usuario';
import { REST_SERVER_URL } from './configuration';
import { Http } from '@angular/http';
import { Tasacion } from '../dominio/tasacion';

export interface IUsuarioService {
  userLogin(username: string, password: string)
}


@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements IUsuarioService {

  constructor(private http: Http) { }

  async userLogin(email: string, password: string) {
    const url = REST_SERVER_URL + "/login"
    let json: any = {}
    json.email = email
    json.contraseña = password
    console.log(json)
    const resp = await this.http.post(url, json).toPromise()
    const usuario: Usuario = Usuario.fromJson(resp.json())
    sessionStorage.setItem("userLoggedInId", String(usuario.id));
    return usuario
  }

  async tasacionesAnteriores() {
    const url = REST_SERVER_URL + "/tasaciones_anteriores/" + this.userLoggedInId()
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Tasacion.fromJson)
  }

  estaLogueado() {
    return this.userLoggedInId() !== undefined && this.userLoggedInId() !== null
  }

  userLoggedInId() {
    return sessionStorage.getItem("userLoggedInId")
  }

  cerrarSesion() {
    sessionStorage.clear()
  }

  async registrarUsuario(usuario: Usuario) {
    const json = JSON.parse(JSON.stringify(usuario))
    return this.http.post(REST_SERVER_URL + '/registrar-usuario', json).toPromise()
  }


}

