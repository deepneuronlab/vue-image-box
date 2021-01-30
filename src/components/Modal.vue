<template lang="pug">
.dialog-modal(
  v-if="isDialogVisible"
) 
  .dialog-modal__content
    h1.title {{ title }}
    slot
    span.dialog-modal__content-footer
      input(v-model="labelEnglish" placeholder="Label in english")
      input(v-model="labelGerman" placeholder="Label in German")
      .columns
        .column
          button(
            @click="$emit('secondaryButtonClicked')"
          ) {{secondaryButtonLabel}}
        .column
          button(
            @click="$emit('primaryButtonClicked')"
          ) {{primaryButtonLabel}}
</template>

<script>

export default {
  props: {
    dialogVisibleSync: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    primaryButtonLabel: {
      type: String,
      default: ''
    },
    secondaryButtonLabel: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      isDialogVisible: false,
      labelEnglish: "",
      labelGerman: ""
    }
  },

  watch: {
    dialogVisibleSync(value) {
      this.isDialogVisible = value
    }
  },

  mounted() {
    this.isDialogVisible = this.dialogVisibleSync
  }
}
</script>

<style lang="sass" scoped>

.dialog-modal
  position: fixed
  top: 0
  left: 0
  z-index: 100
  width: 100vw
  height: 100vh
  background-color: rgba(123,124,123,.5)

  &__content
    padding: 2rem
    margin: 20rem auto
    border-radius: .3rem
    width: 30rem
    height: 20rem
    display: flex
    flex-direction: column
    justify-content: space-between
    background-color: white

    &-footer
      bottom: 0

</style>
