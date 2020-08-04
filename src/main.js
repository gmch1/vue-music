import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
// import 'swiper/css/swiper.css';
// If you use Swiper 6.0.0 or higher
import "swiper/swiper-bundle.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/style/reset.scss";
import "./assets/iconfont/index.scss";

Vue.use(VueAwesomeSwiper /* { default options with global component } */);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
