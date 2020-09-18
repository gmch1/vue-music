import Vue from "vue";
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/recommend"
  },
  {
    path: "/user",
    name: "user",
    component: () => import(/* webpackChunkName: "user" */ "../views/User.vue")
  },
  {
    path: "/userspace/:uid",
    name: "userspace",
    component: () =>
      import(/* webpackChunkName: "userspace" */ "../views/UserSpace.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/recommend/",
    name: "recommend",

    component: () =>
      import(/* webpackChunkName: "recommend" */ "../views/Recommend.vue"),
    children: [
      {
        path: ":id",
        name: "recommend1",
        component: () =>
          import(/* webpackChunkName: "album" */ "../views/Album.vue")
      }
    ]
  },
  {
    path: "/singers/",
    name: "singers",
    component: () =>
      import(/* webpackChunkName: "singers" */ "../views/Singers.vue"),
    children: [
      {
        path: ":id",
        name: "singer",
        component: () =>
          import(/* webpackChunkName: "singer" */ "../views/Singer.vue")
      }
    ]
  },
  {
    path: "/rank",
    name: "rank",
    component: () => import(/* webpackChunkName: "rank" */ "../views/Rank.vue"),
    children: [
      {
        path: ":id",
        name: "album",

        component: () =>
          import(/* webpackChunkName: "album" */ "../views/Album.vue")
      }
    ]
  },
  {
    path: "/search",
    name: "search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/Search.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
