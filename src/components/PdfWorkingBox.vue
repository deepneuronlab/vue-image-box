<template>
  <div data-app>
    <VueDragResize
      v-for="table in tables"
      :key="table.key"
      :isActive="false"
      :w="table.w"
      :h="table.h"
      :x="table.x"
      :y="table.y"
      :parentLimitation="true"
      :parentW="parentW"
      :parentH="parentH"
      contentClass="box"
      v-on:resizing="(r) => resize(table, r)"
      v-on:dragging="(r) => resize(table, r)"
    >
      <v-select
        class="box-select"
        :items="labels"
        label="Select correct type"
        filled
        background-color="#1E1E1E"
        dark
        :value="table.name"
        @change="(v) => updateLable(table, v)"
      ></v-select>
    </VueDragResize>
    <img class="page-img" ref="pageImg" :src="`data/${PageId}.png`" alt="" />
  </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize';

export default {
  name: 'PdfWorkingBox',
  components: {
    VueDragResize,
  },
  props: {
    PageId: { type: String, default: null },
    tables: { type: Array },
  },
  mounted() {
    setTimeout(() => {
      this.getParentContainerSize();
    }, 1);
  },
  data() {
    return {
      labels: [
        'Aktiva',
        'Passiva',
        'income_statement',
        'comprehensive_income',
        'balance_sheet',
        'GuV',
      ],
      parentW: 0,
      parentH: 0,
    };
  },
  methods: {
    getParentContainerSize() {
      console.log(this.$refs.pageImg.height);
      this.parentW = this.$refs.pageImg.width;
      this.parentH = this.$refs.pageImg.height;
    },
    resize(table, newRect) {
      table.w = newRect.width;
      table.h = newRect.height;
      table.y = newRect.top;
      table.x = newRect.left;
      sessionStorage.setItem(this.PageId, JSON.stringify(this.tables));
    },
    updateLable(table, value) {
      table.name = value;
      sessionStorage.setItem(this.PageId, JSON.stringify(this.tables));
    },
  },
};
</script>

<style scoped>
.box {
  background: transparent;
  border: 1px solid red;
}
.box-select {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 56px;
}
.page-img {
  border: 1px solid #c3c3c3;
}
</style>
