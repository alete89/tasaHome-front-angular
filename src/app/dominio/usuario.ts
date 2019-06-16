import { Zona } from './zona';

export class Usuario {

    id: number

    nombre: String

    apellido: String

    edad: number

    email: String

    fecha_nacimiento: Date

    genero: String

    contrasenia: String

    partido: number

    provincia: number

    localidad: number

    constructor(init?: Partial<Usuario>) {
        Object.assign(this, init)
    }

    validar() {
        // if (!this.nombre || !this.apellido || !this.email || !this.contraseña) {
        //     throw "Usuario inválido"
        // }
    }

    static fromJson(usuarioJson: String) {
        return Object.assign(new Usuario(), usuarioJson)
    }
}