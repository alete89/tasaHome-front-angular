
export class Lugar {

    constructor(init?: Partial<Lugar>) {
        Object.assign(this, init)
    }

    id: number

    longitud: number

    latitud: number

    descripcion: string

    direccion: string

    fecha_actualizacion: Date

    vigente: boolean

    static fromJson(lugarJson: string) {
        return Object.assign(new Lugar(), lugarJson)
    }

}