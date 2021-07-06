export class Zona {

    id: number
    descripcion: string

    constructor(init?: Partial<Zona>) {
        Object.assign(this, init)
    }

    static fromJson(zonaJson) {
        return Object.assign(new Zona(), zonaJson)
    }

}