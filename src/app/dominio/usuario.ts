import { Zona } from './zona';

export class Usuario {

    id: number

    nombre: string

    apellido: string

    edad: number

    email: string

    fecha_nacimiento: Date

    genero: string

    contrasenia: string

    direccion: string

    token_recuperacion: string

    constructor(init?: Partial<Usuario>) {
        Object.assign(this, init)
    }

    validar() {
        // if (!this.nombre || !this.apellido || !this.email || !this.contraseña) {
        //     throw "Usuario inválido"
        // }
    }

    static fromJson(usuarioJson: string) {
        return Object.assign(new Usuario(), usuarioJson)
    }
}