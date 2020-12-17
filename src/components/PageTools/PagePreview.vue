<template>
  <div
    class="page-preview"
    v-if="pageLink && 'coords' in pageLink && pageLink.coords.length"
  >
    <template v-for="coord in pageLink.coords">
      <VueDragResize
        v-if="isLoaded"
        :key="coord.key"
        :w="coord.w"
        :h="coord.h"
        :x="coord.x"
        :y="coord.y"
        contentClass="page-preview__overlay"
        v-on:resizestop="resize(coord, ...arguments)"
        v-on:dragstop="resize(coord, ...arguments)"
      >
        <div class="page-preview__label" @click="clickedLabel(coord.key)">
          {{ coord.label || "Add a Label" }}
        </div>
      </VueDragResize>
    </template>
    <img
      v-if="Boolean(page.link)"
      class="page-preview__container"
      @load="onImgLoad"
      :src="imageUrl"
      :alt="page.link"
    />
    <Modal
      :title="getLabel"
      v-if="labelModalVisibility"
      @close="labelModalVisibility = false"
    >
      <form @submit.prevent="saveLabel">
        <div class="form-group">
          <input
            ref="label"
            class="form-control"
            type="text"
            v-model="labelText"
            placeholder="Label 1"
          />
        </div>
        <button class="btn full-width" type="submit">Submit</button>
      </form>
    </Modal>
  </div>
</template>
<script>
import Modal from "../Modal";
import VueDragResize from "vue-drag-resize";
export default {
  data() {
    return {
      labelText: null,
      isLoaded: false,
      labelModalVisibility: false,
      selectedCoordIndex: null,
    };
  },
  components: {
    Modal,
    VueDragResize,
  },
  watch: {
    labelModalVisibility(newVal) {
      if (newVal) {
        this.$nextTick(function() {
          this.$refs.label.focus();
        });
      }
    },
  },
  props: {
    page: { type: Object, required: true },
  },
  computed: {
    pageLink() {
      return this.$store.getters.link(this.page.id);
    },
    imageUrl() {
      return `http://localhost:8080/images/${this.page.link}`;
    },
    getLabel() {
      return this.labelText ? "Edit label" : "Add Label";
    },
  },
  methods: {
    clickedLabel(coordKey) {
      this.labelModalVisibility = true;
      this.labelText = this.pageLink.coords.find(
        (el) => el.key === coordKey
      ).label;
      this.selectedCoordIndex = coordKey;
    },
    onImgLoad() {
      this.$nextTick(() => {
        this.isLoaded = true;
      });
    },
    resize(coord, newRect) {
      let coords = [...this.page.coords];
      coords[coord.key].w = newRect.width;
      coords[coord.key].h = newRect.height;
      coords[coord.key].y = newRect.top;
      coords[coord.key].x = newRect.left;
      this.$emit("resize", coords, this.page.id);
    },
    saveLabel() {
      let coords = [...this.page.coords];
      coords[this.selectedCoordIndex].label = this.labelText;
      this.labelModalVisibility = false;
      this.$emit("resize", coords, this.page.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.page-preview {
  position: relative;

  &__overlay {
    background: rgba(100, 0, 100, 0.3);
  }

  &__label {
    background: #ffae42;
    width: 100px;
    display: inline-block;
    font-size: 14px;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 14px;
    padding-left: 10px;
    color: #fff;
    box-shadow: 1px 0px 6px 1px rgba(0, 0, 0, 0.14);
    cursor: pointer;
  }

  &__container {
    border: 1px solid #c3c3c3;
  }
}
</style>
