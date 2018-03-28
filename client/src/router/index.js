import Vue from 'vue'
import Router from 'vue-router'
import Info from '@/components/Info/Index'
import Main from '@/components/Main'
import Register from '@/components/Register'
import Test from '@/components/Test'



Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: '*',
            component: Main        
        },
        {
            path: '/info',
            component: Info
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/test',
            component: Test
        }
    ]
})