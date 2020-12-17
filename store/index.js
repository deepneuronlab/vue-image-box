import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageLinks: [],
  },
  mutations: {
    ADD_LINKS(state, pageLinks) {
      state.pageLinks = pageLinks;
    },
    UPDATE_COORDS(state, payload) {
      let pageLinks = state.pageLinks.map((el) => {
        if (el.id === payload.pageId) {
          el.tables = payload.coords;
          return el;
        } else {
          return el;
        }
      });
      state.pageLinks = pageLinks;
    },
  },
  getters: {
    links: (state) => state.pageLinks,
    link: (state) => {
      return (pageId) => {
        let finder = state.pageLinks.find((page) => page.id === pageId);
        return finder;
      };
    },
  },
  actions: {
    getDocs({ commit }) {
      return axios.get("/pages").then((res) => {
        commit("ADD_LINKS", res.data.links);
        return res.data.links;
      });
    },
    updateCoords({ commit }, payload) {
      commit("UPDATE_COORDS", payload);
    },
  },
});
