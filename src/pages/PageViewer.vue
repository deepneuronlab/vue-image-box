<template>
  <div class="container-fluid page-viewer">
    <div class="page-viewer__links">
      <template v-for="link in pageLinks">
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
export default {
  components: {
    PageLink,
    PagePreview,
  },
  data() {
    return {
      pageLinks: [],
      activePage: {},
    };
  },
  watch: {
    "$route.query.preview"(newVal) {
      const pageByRoute = this.pageLinks.find((page) => page.link === newVal);
      if (pageByRoute) {
        this.activePage = pageByRoute;
        this.pageClicked(this.activePage);
      } else {
        this.activePage = {};
      }
    },
  },
  created() {
    this.$store.dispatch("getDocs").then(this.pageInit);
  },
  beforeRouteUpdate(to, from, next) {
    (document.title = `Page Viewer | ${to.query.preview}`), next();
  },
  methods: {
    pageInit(pages) {
      this.pageLinks = pages;
      const pageByRoute = pages.find(
        (page) => page.link === this.$route.query.preview
      );
      if (pageByRoute) {
        this.activePage = pageByRoute;
        this.pageClicked(this.activePage);
      }
    },
    updateCoordsToStore(coords, pageId) {
      this.$store.dispatch("updateCoords", {
        pageId: pageId,
        coords: coords,
      });
    },
    updateUrl(link) {
      if (this.$route.query.preview !== link.link) {
        this.$router.push({
          name: "pageViewer",
          query: { preview: link.link },
        });
      }
    },
    pageClicked(link) {
      this.activePage = link;
      this.updateUrl(link);
      if (!this.activePage.coords.length) {
        this.$http
          .post(`/page`, {
            page: `${link.link}`,
          })
          .then((res) => {
            this.activePage.coords = res.data.coords;
            this.updateCoordsToStore(this.activePage.id, res.data.coords);
          });
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
