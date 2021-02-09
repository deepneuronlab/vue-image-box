import 'bulma'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueDragResize from 'vue-drag-resize'
import vuetify from './plugins/vuetify';


Vue.component('vue-drag-resize', VueDragResize)


new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
