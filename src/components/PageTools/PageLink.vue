<template>
  <div class="page-link">
    <div
      @click="click"
      :class="[
        'page-link__thumbnail',
        { 'page-link__thumbnail--active': isActive },
      ]"
    ></div>
    <div class="page-link__label">
      {{ page.link }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Object,
      required: true,
    },
  },
  methods: {
    click() {
      this.$emit("click", this.page);
    },
  },
};
</script>

<style lang="scss" scoped>
.page-link {
  margin-bottom: 30px;
  padding: 16px 24px 0 24px;

  &__thumbnail {
    border: 1px solid #c3c3c3;
    border-radius: 3px;
    word-break: break-word;
    cursor: pointer;
    background-color: #efefef;
    background-image: url("/page.svg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 40px;
    height: 150px;
  }

  &__thumbnail--active {
    background-color: #ffffff;
  }

  &__label {
    font-size: 12px;
    word-break: break-word;
    margin-top: 8px;
  }
}
</style>
