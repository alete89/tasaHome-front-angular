export class Tasacion {

    constructor(init?: Partial<Tasacion>) {
        Object.assign(this, init)
    }

    id: number

    descripcion: String

    ambientes: number

    superficie: number

    fecha: Date

    valor: number

    // usuario: Usuario

    // tipoDePropiedad: TipoPropiedad

    // tipoDeOperacion: TipoOperacion

    // estado: Estado

    // servicios: Servicio[]

    // sitios_publicados: SitioPublicacion[]

    // barrio: Barrio;

    // validar() {
    //     if (!this.descripcion || !this.ambientes || !this.superficie || !this.fecha || !this.valor) {
    //         throw "Tasacion inválida"
    //     }
    // }

    calcularValor() {
        this.valor = 200
        return this.valor
    }

    static fromJson(tasacionJson: String) {
        return Object.assign(new Tasacion(), tasacionJson)
    }
}