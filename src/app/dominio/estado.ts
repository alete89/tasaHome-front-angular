export class Estado {

    id: number
    descripcion: string

    constructor(init?: Partial<Estado>) {
        Object.assign(this, init)
    }

    static fromJson(estadoJson: string) {
        return Object.assign(new Estado(), estadoJson)
    }

}