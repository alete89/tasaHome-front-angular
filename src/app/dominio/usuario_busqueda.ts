import { Usuario } from './usuario';

export class UsuarioBusqueda {

    cantidad_minima_tasaciones: number

    fecha_desde_alta: String

    fecha_desde_modificacion: String

    estado_usuario: String

    constructor(init?: Partial<UsuarioBusqueda>) {
        Object.assign(this, init)
    }

    static fromJson(usuarioJson) {
        let tasacion = Object.assign(new UsuarioBusqueda(), usuarioJson)
        return tasacion
    }
}