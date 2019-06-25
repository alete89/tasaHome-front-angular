export class SitioPublicacion {

    id: number
    descripcion: String
    logo_url: String
    url_publicar: String

    constructor(init?: Partial<SitioPublicacion>) {
        Object.assign(this, init)
    }

    static fromJson(sitioJson: String) {
        return Object.assign(new SitioPublicacion(), sitioJson)
    }

}