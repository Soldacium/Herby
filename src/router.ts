import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import store from "./store/store";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/x/home",
  },
  {
    path: "/x",
    component: () => import("./views/home-search/HomeSearch.vue"),
    children: [
      {
        path: "home",
        component: () => import("./views/home-search/home/Home.vue"),
      },
      {
        path: "search",
        component: () => import("./views/home-search/results/Results.vue"),
      },
    ],
  },
  {
    path: "/details/:name",
    component: () => import("./views/details/Details.vue"),
  },
  {
    path: "/club/:clubname",
    component: () => import("./views/club/Club.vue"),
  },
  {
    path: "/contribute/",
    component: () => import("./views/contribute/Contribute.vue"),
  },
];

const router = createRouter({
  routes: routes,
  linkActiveClass: "activated-route",
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  //store.commit("changeLoading");
  next();
});

router.afterEach(() => {
  //store.commit("changeLoading");
});

export default router;
