import { Injectable } from '@angular/core';
import { Usuario } from '../dominio/usuario';
import { REST_SERVER_URL } from './configuration';
import { Http } from '@angular/http';
import { Tasacion } from '../dominio/tasacion';
import { TasacionBusqueda } from '../dominio/tasacion_busqueda';
import { UsuarioBusqueda } from '../dominio/usuario_busqueda';

export interface IUsuarioService {
  userLogin(username: string, password: string)
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements IUsuarioService {

  constructor(private http: Http) { }

    esAdmin: boolean

  async userLogin(email: string, password: string) {
    const url = REST_SERVER_URL + "/login"
    let json: any = {}
    json.email = email
    json.contraseña = password
    const resp = await this.http.post(url, json).toPromise()
    const usuario: Usuario = Usuario.fromJson(resp.json())
    localStorage.setItem("userLoggedInId", String(usuario.id));
    this.esAdmin = usuario.esAdmin
    return usuario
  }

  async tasacionesAnteriores() {
    const url = REST_SERVER_URL + "/tasaciones_anteriores/" + this.userLoggedInId()
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Tasacion.fromJson)
  }

  esAdministrador() {
    return this.estaLogueado() && this.esAdmin
  }

  estaLogueado() {
    return this.userLoggedInId() !== undefined && this.userLoggedInId() !== null
  }

  userLoggedInId() {
    return localStorage.getItem("userLoggedInId")
  }


  cerrarSesion() {
    localStorage.clear()
  }

  async registrarUsuario(usuario: Usuario) {
    const json = JSON.parse(JSON.stringify(usuario))
    return await this.http.post(REST_SERVER_URL + '/registrar_usuario', json).toPromise()
  }

  async guardarTasacion(tasacion: Tasacion) {
    console.log(tasacion)
    const json = JSON.parse(JSON.stringify(tasacion))
    return await this.http.post(REST_SERVER_URL + '/guardar_tasacion/' + this.userLoggedInId(), json).toPromise()
  }

  async tasacionesSimilares(tasacionBusqueda: TasacionBusqueda) {
    const json = JSON.parse(JSON.stringify(tasacionBusqueda))
    const resp = await this.http.put(REST_SERVER_URL + '/tasaciones_similares/' + this.userLoggedInId(), json).toPromise()
    return resp.json().map(Tasacion.fromJson)
  }

  async getUsers(usuarioBusqueda: UsuarioBusqueda) {
    const url = REST_SERVER_URL + "/administracion?estado=" + usuarioBusqueda.estado_usuario + '&cant_tasaciones=' + usuarioBusqueda.cantidad_minima_tasaciones + '&fecha_alta=' + usuarioBusqueda.fecha_desde_alta + '&fecha_modificacion=' + usuarioBusqueda.fecha_desde_modificacion
    let json: any = {}
    const resp = await this.http.get(url, json).toPromise()
    return resp.json().map(Usuario.fromJson)
  }

  async getUserByToken(token: string) {
    const url = REST_SERVER_URL + "/usuarios/token"
    let json: any = {}
    json.token = token
    const resp = await this.http.post(url, json).toPromise()
    const usuario: Usuario = Usuario.fromJson(resp.json())
    return usuario
  }

  async reestablecerContrasenia(token: string, contrasenia_nueva: string) {
    const url = REST_SERVER_URL + "/reestablecer_contrasenia"
    let json: any = {}
    json.token = token
    json.contrasenia = contrasenia_nueva
    const resp = await this.http.put(url, json).toPromise()
    return resp
  }

}

