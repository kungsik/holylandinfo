import Api from '@/services/Api'
import router from '@/router/'

export default {
    addpost(postcontent) {
        return Api().post('post/addpost', postcontent)
    },
    viewpost(postId) {
        return Api().post('post/viewpost', postId)
    }
}