export class Estado {

    id: number
    descripcion: string

    constructor(init?: Partial<Estado>) {
        Object.assign(this, init)
    }

    static fromJson(estadoJson) {
        return Object.assign(new Estado(), estadoJson)
    }

}