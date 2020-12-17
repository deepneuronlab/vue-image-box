import Vue from "vue";
import VueRouter from "vue-router";

// // ROUTES
// import pageEditor from "@/components/page-editor";
import Home from "@/pages/home";
import PageViewer from "@/pages/PageViewer";

Vue.use(VueRouter);

let router = new VueRouter({
  mode: "history",
  routes: [
    { path: "", component: Home },
    {
      meta: { title: "PDF page" },
      path: "/page-viewer",
      name: "pageViewer",
      props: true,
      component: PageViewer,
      beforeEnter: (to, from, next) => {
        (document.title = "Page Viewer"), next();
      },
    },
  ],
});

export default router;
