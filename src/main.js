import 'bulma'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueDragResize from 'vue-drag-resize'
import titleMixin from './mixins/titleMixin'
import store from './store'

Vue.mixin(titleMixin)
Vue.component('vue-drag-resize', VueDragResize)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
