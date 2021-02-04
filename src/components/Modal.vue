<template>
  <portal to='modals'>
    <div class="modal-container">
      <div class="modal-overlay" @click="hideModal"></div>
      <div class="modal-body">
        <h2 class="modal-body__title">{{ title }}</h2>
        <slot></slot>
      </div>
    </div>
  </portal>
</template>
<script>
export default {
  name: "Modal",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    hideModal() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
.modal-container {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 999;
  bottom: 0;
  top: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    background: rgba(0, 0, 0, 0.54);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .modal-body {
    display: flex;
    flex-direction: column;
    padding: 0 16px 16px 16px;
    background: #fff;
    position: relative;
    width: 300px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    z-index: 99;
    &__title {
      text-align: left;
      padding: 13px 8px 13px 0;
      font-weight: bold;
    }
  }
}
</style>
