import Vue from 'vue'
import Router from 'vue-router'
import bmman from '@/components/BookmarkMan'
import bmone from '@/components/BookmarkOne'
import login from '@/components/Login'
import signup from '@/components/Signup'
import profile from '@/components/Profile'
import about from '@/components/About'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/main',
            name: 'main',
            component: bmman
        },
        {
            path:'/bookmark',
            name: 'bookmark',
            component: bmone
        },
        {
            path:'/login',
            name:'login',
            component: login
        },
        {
            path:'/signup',
            name:'signup',
            component: signup  
        },
        {
            path:'/profile',
            name:'profile',
            component: profile
        },
        {
            path:'/about',
            name:'about',
            component: about
        },
        {
            path:'*',
            redirect: {name: 'login'}
        }
    ],
    mode: 'history'
})