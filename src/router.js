import Vue from 'vue'
import VueRouter from 'vue-router'
// ROUTE
import PageViewer from '@/pages/PageViewer'
import Home from '@/pages/home'

Vue.use(VueRouter)

const router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            meta: {title: 'PDF viewer'},
            path: '/page-viewer',
            name: 'PageViewer',
            props: true,
            component: PageViewer
        },
    ]
})

export default router