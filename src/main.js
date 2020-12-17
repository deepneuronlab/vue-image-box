import "bulma";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "../store";

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  function(error) {
    return Promise.reject(error);
  }
);

Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
