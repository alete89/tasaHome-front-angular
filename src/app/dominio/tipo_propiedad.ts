
export class TipoPropiedad {

    constructor(init?: Partial<TipoPropiedad>) {
        Object.assign(this, init)
    }

    id: number

    descripcion: string

    static fromJson(tipoPropiedadJson) {
        return Object.assign(new TipoPropiedad(), tipoPropiedadJson)
    }
}