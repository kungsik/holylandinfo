import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Register from '@/components/Register'
import Test from '@/components/Test'
import Login from '@/components/Login'
import AddPost from '@/components/Info/AddPost'
import ViewPost from '@/components/Info/ViewPost'
import ListPost from '@/components/Info/ListPost'





Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            name: 'main',
            path: '*',
            component: Main        
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/post/addpost',
            component: AddPost
        },
        {
            path: '/post/viewpost/:postId',
            component: ViewPost
        },
        {
            path: '/post/listpost',
            component: ListPost
        },
        {
            path: '/test',
            component: Test
        }
    ]
})