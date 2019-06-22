export class Estado {

    id: number
    descripcion: String

    constructor(init?: Partial<Estado>) {
        Object.assign(this, init)
    }

    static fromJson(estadoJson: String) {
        return Object.assign(new Estado(), estadoJson)
    }

}