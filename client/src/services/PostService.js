import Api from '@/services/Api'
//import router from '@/router/'

export default {
    addpost(postcontent) {
        return Api().post('post/addpost', postcontent)
    },
    editpost(query) {
        return Api().post('post/editpost', query)
    },
    viewpost(postId) {
        return Api().post('post/viewpost', postId)
    },
    listpost() {
        return Api().get('post/listpost')
    }
}