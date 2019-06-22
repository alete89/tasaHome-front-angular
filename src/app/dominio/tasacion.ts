import { TipoPropiedad } from './tipo_propiedad';
import { Servicio } from './servicio';

export class Tasacion {

    id: number

    descripcion: String

    ambientes: number

    superficie: number

    fecha: Date

    valor: number

    direccion: String

    id_tipo_propiedad: number

    id_tipo_operacion: number

    id_estado: number

    servicios: Array<Servicio>

    privada: boolean = false

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