import Vue from "vue";
import VueRouter from "vue-router";
import Singer from "../views/Singer.vue";
import Album from "../views/Album.vue";
import Singers from "../views/Singers.vue";
import Recommend from "../views/Recommend.vue";
import Rank from "../views/Rank.vue";

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
    path: "/recommend/",
    component: Recommend,
    children: [
      {
        path: ":id",
        component: Album
      }
    ]
  },
  {
    path: "/singers/",
    component: Singers,
    children: [
      {
        path: ":id",
        component: Singer
      }
    ]
  },
  {
    path: "/rank",
    component: Rank,
    children: [
      {
        path: ":id",
        component: Album
      }
    ]
  }
  // {
  //   path: '/search',
  //   component: Search,
  //   children: [
  //     {
  //       path: ':id',
  //       component: SingerDetail
  //     }
  //   ]
  // },
  // {
  //   path: '/user',
  //   component: UserCenter
  // }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;
