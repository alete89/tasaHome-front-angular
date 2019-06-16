export class Zona {

    id: number
    descripcion: String

    constructor(init?: Partial<Zona>) {
        Object.assign(this, init)
    }

    static fromJson(zonaJson: String) {
        return Object.assign(new Zona(), zonaJson)
    }

}