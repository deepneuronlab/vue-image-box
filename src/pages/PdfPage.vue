<template>
  <PdfWorkingBox :tables="pdfWorkingBoxTables" :PageId="PageId" />
</template>

<script>
import PdfWorkingBox from '../components/PdfWorkingBox';

export default {
  components: {
    PdfWorkingBox,
  },
  props: {
    PageId: { type: String, default: null },
  },
  created() {
    this.getData();
  },
  watch: {
    PageId() {
      this.getData();
    },
  },
  data() {
    return {
      pdfWorkingBoxTables: [],
    };
  },
  methods: {
    getData() {
      let savedData = sessionStorage.getItem(this.PageId);
      if (savedData) {
        this.pdfWorkingBoxTables = JSON.parse(savedData);
        return;
      }
      fetch(`data/${this.PageId}.xml`)
        .then((res) => res.text())
        .then((xml) => {
          var parseString = require('xml2js').parseString;
          parseString(xml, (err, result) => {
            this.pdfWorkingBoxTables = result.annotation.object.map((i, k) => {
              return {
                key: k,
                name: i.name[0],
                w: Math.ceil(
                  (i.bndbox[0].xmax[0] - i.bndbox[0].xmin[0]) / 3.78
                ),
                h: Math.ceil(
                  (i.bndbox[0].ymax[0] - i.bndbox[0].ymin[0]) / 3.78
                ),
                x: Math.ceil(i.bndbox[0].xmin[0] / 3.78),
                y: Math.ceil(i.bndbox[0].ymin[0] / 3.78),
              };
            });
          });
          sessionStorage.setItem(
            this.PageId,
            JSON.stringify(this.pdfWorkingBoxTables)
          );
        });
    },
  },
};
</script>

<style scoped></style>
