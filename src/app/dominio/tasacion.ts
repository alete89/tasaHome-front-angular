import { TipoPropiedad } from './tipo_propiedad';

export class Tasacion {


    id: number

    descripcion: String

    ambientes: number

    superficie: number

    fecha: Date

    valor: number

    // usuario: Usuario


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

    constructor(init?: Partial<Tasacion>) {
        Object.assign(this, init)
    }

    calcularValor() {
        this.valor = 200
        return this.valor
    }

    static fromJson(tasacionJson) {
        let tasacion = Object.assign(new Tasacion(), tasacionJson)
        tasacion.tipoDePropiedad = TipoPropiedad.fromJson(tasacionJson.tipoDePropiedad)
        return tasacion
    }
}