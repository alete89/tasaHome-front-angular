export class Usuario {

    constructor(init?: Partial<Usuario>) {
        Object.assign(this, init)
    }

    id: number

    nombre: String

    apellido: String

    edad: number

    email: String

    genero: String

    validar() {
        // if (!this.nombre || !this.apellido || !this.email || !this.contraseña) {
        //     throw "Usuario inválido"
        // }
    }

    static fromJson(usuarioJson: String) {
        return Object.assign(new Usuario(), usuarioJson)
    }
}