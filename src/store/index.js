import Vue from "vue";
import Vuex from "vuex";
import * as pageServices from "../services/pageServices";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageLinks: [ { link: '' } ],
  },
  mutations: {
    SET_PAGE_LINKS(state, pageLinks) {
      state.pageLinks = pageLinks;
    },
    UPDATE_COORDS(state, payload) {
      let pageLink = state.pageLinks.find(el => el.link=== payload.link)
      if (pageLink) {
        pageLink.coords = payload.coords
      }
    },
  },
  getters: {
    links: (state) => state.pageLinks,
    link: (state) => (link) => state.pageLinks.find((page) => page.link === link)
  },
  actions: {
    updateCoords({ commit }, payload) {
      commit("UPDATE_COORDS", payload);
    },
    async getPages({ commit }) {
      const pageLinks = await pageServices.getPages()
      commit("SET_PAGE_LINKS", pageLinks)
    },
    async postPage({ commit }, payload) {
      const coords = await pageServices.postPage(payload)
      commit("UPDATE_COORDS", {
        link: payload,
        coords
      });
    },
  },
});
