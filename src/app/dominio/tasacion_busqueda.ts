import { TipoPropiedad } from './tipo_propiedad';

export class TasacionBusqueda {

    ambientes_minimos: number

    superficie_minima: number

    fecha_desde: Date

    ids_barrios: Array<number> = []

    id_tipo_propiedad: number

    id_tipo_operacion: number

    constructor(init?: Partial<TasacionBusqueda>) {
        Object.assign(this, init)
    }

    static fromJson(tasacionJson) {
        let tasacion = Object.assign(new TasacionBusqueda(), tasacionJson)
        return tasacion
    }
}