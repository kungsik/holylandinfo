import Api from '@/services/Api'
import router from '@/router/'

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
        if(!localStorage.token) {
            alert('로그인이 필요합니다. 로그인 창으로 이동합니다.')
            router.push({path: '/login'})
        }
        else {
            try {
                const response = await this.authentification()
                return response.data.user
            }
            catch(error) {
                localStorage.clear()
                alert('인증과정 중에 문제가 발생했습니다. 로그인 창으로 이동합니다')
                router.push({path: '/login'})
            }  
        }
    },
}