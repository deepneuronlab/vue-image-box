<template>
  <div class="container-fluid page-viewer">
    <div class="page-viewer__links">
      <template v-for="link in links">
        <PageLink
          :isActive="activePage.id === link.id"
          :page="link"
          :key="link.id"
          @click="pageClicked"
        ></PageLink>
      </template>
    </div>
    <div class="page-viewer__preview">
      <PagePreview
        v-if="Object.entries(activePage).length"
        @resize="updateCoordsToStore"
        :page="activePage"
      ></PagePreview>
      <div class="page-viewer__empty" v-else>
        Please select a document from the left panel.
      </div>
    </div>
  </div>
</template>
<script>
import PageLink from "@/components/PageTools/PageLink";
import PagePreview from "@/components/PageTools/PagePreview";
import { mapActions, mapGetters } from 'vuex'

export default {
  title: `Page Viewer` ,
  name: 'PageViewer',
  components: {
    PageLink,
    PagePreview,
  },
  data() {
    return {
      activePage: {},
    };
  },
  computed: {
    ...mapGetters([
      'links',
      'link'
    ])
  },
  async created() {
    await this.$store.dispatch("getPages");
    this.pageInit();
  },
  methods: {
    ...mapActions([
      'getPages',
      'updateCoords',
      'postPage'
    ]),
    pageInit() {
      const { preview } = this.$route.query
      const pageByRoute = this.link(preview);
      if (pageByRoute) {
        document.title = `Page Viewer | ${preview}`
        this.pageClicked(pageByRoute);
      }
    },
    updateCoordsToStore(coords) {
      this.$store.dispatch("updateCoords", { link: this.activePage.link , coords });
    },
    updateUrl(link) {
      if (this.$route.query.preview !== link.link) {
        document.title = `Page Viewer | ${link.link}`
        this.$router.push({
          name: "PageViewer",
          query: { preview: link.link },
        });
      }
    },
    pageClicked(link) {
      this.activePage = link;
      this.updateUrl(link);
      if (!this.activePage.coords.length) {
        this.$store.dispatch('postPage', this.activePage.link);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container-fluid {
  display: flex;
  flex-direction: row;

  &.page-viewer {
    .page-viewer {
      &__links {
        padding: 10px;
        border: 1px solid #c3c3c3;
        overflow: scroll;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 200px;
        background: #f4f4f4;
      }
      &__preview {
        margin-left: 200px;
        height: 100vh;
        overflow: auto;
        width: 100%;
      }
      &__empty {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
