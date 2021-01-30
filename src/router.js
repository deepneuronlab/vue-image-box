import Vue from 'vue'
import VueRouter from 'vue-router'

// ROUTES 
import PdfPage from '@/pages/PdfPage'

Vue.use(VueRouter)

let router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            meta: { title: 'PDF page' },
            path: '/pdf-page/:PageId',
            name: 'PdfPage',
            props: true,
            component: PdfPage
        },
    ]
})

router.beforeEach((to, from, next) => {
    document.title = to.params.PageId,
        next()
})

export default router