export class Notification {
    message: string = null
    error: any = null
    loading: boolean = false
    type: string

    showError(error) {
        console.log(error)
        if (error.status == 0) {
            this.error = { message: "No se pudo comunicar con el servidor." }
            return
        }
        this.error = error.error.message ? error.error : JSON.parse(error.error)
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

    // cleanLoading() {
    //     this.loading = false
    // }

    noErrors() {
        return this.error === null
    }
}
