import Api from '@/services/Api'

export default {
    register(credentials) {
        return Api().post('register', credentials)
    }, 
    login(credentials) {
        return Api().post('login', credentials)
    },
    authentification() {
        return Api().get('authentification')
    },
    async checkAuthentification() {
        try {
            const response = await this.authentification()
            return response.data.message
        }
        catch(error) {
            localStorage.clear()
            return error.response.data.error
        }  
    },
}