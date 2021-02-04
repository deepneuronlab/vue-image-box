<template>
  <div
    class="page-preview"
    v-if="page && 'coords' in page && page.coords.length"
  >
    <template v-for="coord in page.coords">
      <VueDragResize
        v-if="isLoaded"
        :key="coord.key + page.link"
        :parentLimitation="true"
        :isActive="false"
        :w="coord.w"
        :h="coord.h"
        :x="coord.x"
        :parentH="$refs.preview && $refs.preview.height"
        :y="coord.y"
        contentClass="page-preview__overlay"
        v-on:dragstop="resize(coord.key, ...arguments)"
        v-on:resizestop="resize(coord.key, ...arguments)"
      >
        <div class="page-preview__label" @click="clickedLabel(coord.key)">
          {{ coord.label || "Add a Label" }}
        </div>
      </VueDragResize>
    </template>
    <img
      v-if="Boolean(page.link)"
      ref="preview"
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
          <RadioGroup
            id="labelText"
            v-model="radioText"
            label='Select new label'
            :options="options"
          />

          <input
            v-if="radioText === 'Other'"
            ref="label"
            class="form-control"
            type="text"
            v-model="labelText"
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
import RadioGroup from "../RadioGroup";

export default {
  data() {
    return {
      labelText: null,
      radioText: null,
      isLoaded: false,
      labelModalVisibility: false,
      selectedCoordIndex: null,
      options: [
        {
          value: "Option 1",
          text: "Option 1",
        },
        {
          value: "Option 2",
          text: "Option 2",
        },
        {
          value: "Option 3",
          text: "Option 3",
        },
        {
          value: "Other",
          text: "Other",
        }
      ]
    };
  },
  components: {
    Modal,
    RadioGroup,
    VueDragResize,
  },
  props: {
    page: { type: Object, required: true },
  },
  computed: {
    imageUrl() {
      return `/images/${this.page.link}`;
    },
    getLabel() {
      return this.labelText ? "Edit label" : "Add Label";
    },
  },
  methods: {
    clickedLabel(coordKey) {
      this.labelModalVisibility = true;
      this.labelText = this.page.coords.find(
        (el) => el.key === coordKey
      ).label;
      this.selectedCoordIndex = coordKey;
    },
    onImgLoad() {
      this.$nextTick(() => {
        this.isLoaded = true;
      });
    },
    resize(key, newRect) {
      const coords = [...this.page.coords];
      coords[key] = {
        key,
        w: newRect.width,
        h: newRect.height,
        y: newRect.top,
        x: newRect.left,
      }
      this.$emit("resize", coords);
    },
    saveLabel() {
      const coords = [...this.page.coords];
      coords[this.selectedCoordIndex].label =
        this.radioText === 'Other'
          ? this.labelText
          : this.radioText;
      this.labelModalVisibility = false;
      this.$emit("resize", coords);
    },
  },
};
</script>
<style lang="scss" scoped>
.page-preview {
  margin: 50px auto;
  width: 100%;
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
