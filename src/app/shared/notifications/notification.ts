export class Notification {
    toastMessage: string = null
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

    showMessage(message) {
        this.message = message
    }

    cleanError() {
        this.error = undefined
    }

    cleanMessage() {
        this.message = undefined
    }

    popUpMessage(msg, type: string, delay: number) {
        this.toastMessage = msg
        this.type = type
        setTimeout(() => {
            this.toastMessage = null
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
