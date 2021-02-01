import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from 'vuex-persist';
import ApiImagesService from "@/services/images-service"
import ApiLabelsService from "@/services/labels-service"

const vuexLocalStorage = new VuexPersist({
  key: 'imagebox',
  storage: window.sessionStorage,
})

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    images: [],
    userLanguages: ['en', 'de'],
    selectedUserLanguage: 'de',
    labels: []
  },

  mutations: {
    ADD_BOX_COVER(state, payload) {
      const image = state.images.filter(item => item.id === payload.id)
      if (image[0]) {
        const index = state.images.indexOf(image[0])
        state.images[index].covers.push({
          key: `${payload.label}${state.images[index].covers.length + 1}${new Date().getTime()}`,
          label: payload.label,
          x: 15,
          y: 15,
          w: 250,
          h: 250
        })
      } else {
        state.images.push(payload)
      }
    },
    MODIFY_BOX_COVER(state, payload) {
      const image = state.images.filter(item => item.id === payload.id)[0]
      let cover = image.covers.filter(item => item.key === payload.cover.key)[0]
      Object.assign(cover, payload.cover)
    },
    REMOVE_BOX_COVER(state, payload) {
      const image = state.images.filter(item => item.id === payload.id)[0]
      let cover = image.covers.filter(item => item.key === payload.coverKey)[0]
      const index = image.covers.indexOf(cover)
      image.covers.splice(index, 1)
    },
    SET_USER_LANGUGE(state, language) {
      state.selectedUserLanguage = language
    },
    ADD_LABELS(state, payload) {
      state.labels = [...payload]
    },
    ADD_LABEL(state, payload) {
      const label = {
        id: `label${state.labels.length + 1}`,
        ...payload
      }
      state.labels.push(label)
    }
  },

  actions: {
    async getCovers({ dispatch }, { imageId }) {
      try {
        const covers = await ApiImagesService.fetchCovers(imageId)
        dispatch('addBoxCover', { id: imageId, covers })
      } catch (e) {
        console.log(e)
      }
    },
    async getLabels({ dispatch }) {
      try {
        const response = await ApiLabelsService.fetchLabels()
        dispatch('addLabels', response.labels)
      } catch (e) {
        console.log(e)
      }
    },
    addBoxCover({ commit }, item) {
      commit('ADD_BOX_COVER', item)
    },
    modifyBoxCover({ commit }, payload) {
      commit('MODIFY_BOX_COVER', payload)
    },
    removeBoxCover({ commit }, item) {
      commit('REMOVE_BOX_COVER', item)
    },
    addLabels({ commit }, labels) {
      commit('ADD_LABELS', labels)
    },
    addLabel({ commit }, label) {
      commit('ADD_LABEL', label)
    },
    setUserLanguage({ commit }, language) {
      commit('SET_USER_LANGUGE', language)
    }
  },

  plugins: [vuexLocalStorage.plugin]
});

export default store
