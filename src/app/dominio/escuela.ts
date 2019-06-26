
export class Escuela {

    constructor(init?: Partial<Escuela>) {
        Object.assign(this, init)
    }

    id: number

    longitud: number

    latitud: number

    fecha_actualizacion: Date

    vigente: boolean

    static fromJson(escuelaJson: String) {
        return Object.assign(new Escuela(), escuelaJson)
    }

}