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

    static fromJson(servicioJson) {
        // console.log("serivicio")
        // console.log(Object.assign(new Servicio({}), servicioJson))
        return Object.assign(new Servicio({}), servicioJson)
    }



}