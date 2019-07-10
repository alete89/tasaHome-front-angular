
export class TipoOperacion {

    constructor(init?: Partial<TipoOperacion>) {
        Object.assign(this, init)
    }

    id: number

    descripcion: string

    static fromJson(tipoOperacionJson) {
        return Object.assign(new TipoOperacion(), tipoOperacionJson)
    }
}