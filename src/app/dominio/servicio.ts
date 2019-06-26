export class Servicio {

    id: number
    descripcion: String
    chequeado: boolean = false

    constructor(init?: Partial<Servicio>) {
        Object.assign(this, init)
    }

    chequear() {
        this.chequeado = true
    }

    static fromJson(servicioJson: String) {
        return Object.assign(new Servicio(), servicioJson)
    }



}