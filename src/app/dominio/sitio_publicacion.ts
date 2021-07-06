export class SitioPublicacion {

    id: number
    descripcion: string
    logo_url: string
    url_publicar: string

    constructor(init?: Partial<SitioPublicacion>) {
        Object.assign(this, init)
    }

    static fromJson(sitioJson) {
        return Object.assign(new SitioPublicacion(), sitioJson)
    }

}