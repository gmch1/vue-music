<template>
  <div id="app" @touchstart="touchStart" @touchmove="listenTouchMove">
    <my-header></my-header>
    <my-options></my-options>

    <!-- keepalive 会导致路由匹配错误，暂时不使用 -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <my-player></my-player>
  </div>
</template>

<script>
import MyHeader from "./components/my-header/my-header";
import MyPlayer from "./views/Player/my-player";
import MyOptions from "./components/my-options/my-options";
import { touchmove, getUserInfo } from "./api/utils";
import { mapActions, mapState } from "vuex";

import { getPrivateMsg } from "./api/request";
export default {
  components: {
    MyHeader,
    MyPlayer,
    MyOptions
  },
  data() {
    return {
      pos: {
        start: 0
      }
    };
  },
  mounted() {
    getUserInfo(this.userLoginInfo);
    getPrivateMsg(10).then(res => {
      console.log(res);
    });
    console.log(
      `腾讯云已完成部署，传送门：
      http://81.69.9.242:8888/#/recommend`
    );
  },
  computed: {
    ...mapState("user", {
      showOptions: state => state.showOptionState,
      user: state => state.user
    })
  },
  methods: {
    ...mapActions("user", ["showOptionState", "userLoginInfo"]),

    touchStart(e) {
      this.pos.start = e.touches[0].clientX;
    },
    listenTouchMove(e) {
      let newX = e.touches[0].pageX;
      // 方法抽离，与全局拖动效果公用
      touchmove(
        e,
        this.pos.start,
        this.showOptionState,
        this.showOptions,
        "open"
      );
    }
  }
};
</script>
<style lang="scss" scoped>
#app {
}
</style>
