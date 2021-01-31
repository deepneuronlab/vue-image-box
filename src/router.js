import Vue from 'vue'
import VueRouter from 'vue-router'

// ROUTES 
import PdfPage from '@/pages/PdfPage'

Vue.use(VueRouter)

let router = new VueRouter({
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

router.beforeEach((to, _, next) => {
    document.title = to.params.PageId || 'Home',
        next()
})

export default router