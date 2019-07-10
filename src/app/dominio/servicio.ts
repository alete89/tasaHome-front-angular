export class Servicio {

    id: number
    descripcion: string
    chequeado: boolean = false

    constructor(init?: Partial<Servicio>) {
        Object.assign(this, init)
    }

    chequear() {
        this.chequeado = true
    }

    static fromJson(servicioJson: string) {
        return Object.assign(new Servicio(), servicioJson)
    }



}