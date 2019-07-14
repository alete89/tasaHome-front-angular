import { Estado } from './estado';
import { Servicio } from './servicio';
import { TipoPropiedad } from './tipo_propiedad';
import { Usuario } from './usuario';
import { TipoOperacion } from './tipo_operacion';
import { Zona } from './zona';

export class Tasacion {

    id: number

    id_anterior: number

    descripcion: string

    ambientes: number

    superficie: number

    fecha: Date

    valor: number

    direccion: string

    barrio: Zona

    tipoDePropiedad: TipoPropiedad

    tipoDeOperacion: TipoOperacion

    estado: Estado

    usuario: Usuario

    servicios: Array<Servicio>

    privada: boolean = false

    constructor(init?: Partial<Tasacion>) {
        this.initialize()
        Object.assign(this, init)
    }

    initialize() {
        this.estado = new Estado
        this.usuario = new Usuario
        this.tipoDePropiedad = new TipoPropiedad
        this.tipoDeOperacion = new TipoOperacion
        this.servicios = []
    }

    calcularValor() {
        this.valor = 200
        return this.valor
    }

    static fromJson(tasacionJson) {
        let tasacion = Object.assign(new Tasacion(), tasacionJson)
        if (tasacionJson.servicios) {
            tasacion.servicios = tasacionJson.servicios.map(Servicio.fromJson)
        }
        return tasacion
    }

}