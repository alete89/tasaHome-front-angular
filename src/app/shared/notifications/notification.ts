export class Notification {
    message: string = null
    error: string = null
    loading: boolean = true
    type: string

    showError(error) {
        if (!error._body) {
            this.error = error
        } else {
            let mensaje = JSON.parse(error._body).message
            console.log(error);
            if (error.status == 0) {
                this.error = "No se pudo comunicar con el servidor."
            } else if (mensaje) {
                this.error = mensaje
            } else {
                this.error = error
            }
        }
    }

    cleanError() {
        this.error = undefined
    }

    popUpMessage(msg, type: string, delay: number) {
        this.message = msg
        this.type = type
        setTimeout(() => {
            this.message = null
            this.type = null
        }, delay)
    }

    showLoading() {
        this.loading = true
    }

    cleanLoading() {
        this.loading = false
    }

    noErrors() {
        return this.error === null
    }
}
