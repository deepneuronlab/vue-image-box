import { colors } from '@/lib/constants'

const commonData = {
  computed: {
    labels() {
      return this.$store.state.labels
    },
    selectedUserLanguage() {
      return this.$store.state.selectedUserLanguage
    },
    userLanguages() {
      return this.$store.state.userLanguages
    },
    existingCovers() {
      const image = this.$store.state.images.filter(item => item.id === this.PageId)
      const covers = image.length ? [...image[0].covers] : []
      return covers
    },
    existingImage() {
      const image = this.$store.state.images.filter(item => item.id === this.PageId)
      return image.length
    },
    colors() {
      return colors
    }
  }
}

const commonMethods = {
  methods: {
    setLanguage(e) {
      this.$store.dispatch('setUserLanguage', e.target.value)
    },
  }
}

export {
  commonData,
  commonMethods
}

