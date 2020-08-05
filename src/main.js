import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import VueLazyload from "vue-lazyload";
import "swiper/swiper-bundle.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/style/reset.scss";
import "./assets/iconfont/index.scss";

Vue.config.productionTip = false;

Vue.use(VueAwesomeSwiper /* { default options with global component } */);
Vue.use(VueLazyload, {
  loading: require("./assets/image/default.png")
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
