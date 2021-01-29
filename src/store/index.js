import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from 'vuex-persist';

const vuexLocalStorage = new VuexPersist({
  key: 'covers',
  storage: window.sessionStorage,
})

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    items: [],
  },
  mutations: {
    ADD(state, val) {
      state.items.push(val)
    }

  },
  actions: {
    addItem({ commit }, val) {
      commit('ADD', val)
    }
  },
  getters: {

  },
  plugins: [vuexLocalStorage.plugin]
});

export default store
