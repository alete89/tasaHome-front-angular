import { Usuario } from './usuario';

export class UsuarioBusqueda {

    cantidad_minima_tasaciones: number

    fecha_desde_alta: Date

    fecha_desde_modificacion: Date

    estado_usuario: String

    constructor(init?: Partial<UsuarioBusqueda>) {
        Object.assign(this, init)
    }

    static fromJson(usuarioJson) {
        let tasacion = Object.assign(new UsuarioBusqueda(), usuarioJson)
        return tasacion
    }
}