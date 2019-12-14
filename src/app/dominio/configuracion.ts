export class Configuracion {

    descripcion: string
    dataset: string
    fecha_actualizacion: Date

    constructor(init?: Partial<Configuracion>) {
        Object.assign(this, init)
    }

    static fromJson(estadoJson: string) {
        return Object.assign(new Configuracion(), estadoJson)
    }

}