<template>
  <div id="app" @touchstart="touchStart" @touchmove="listenTouchMove">
    <my-header></my-header>
    <my-options v-if="user.code"></my-options>

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
import { touchmove } from "./api/utils";
import { mapActions, mapState } from "vuex";
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
    this.getUserInfo();
  },
  computed: {
    ...mapState("user", {
      showOptions: state => state.showOptionState,
      user: state => state.user
    })
  },
  methods: {
    ...mapActions("user", ["showOptionState", "userLoginInfo"]),

    getUserInfo() {
      try {
        const uid = localStorage.getItem("uid");
        if (uid) {
          this.userLoginInfo(uid);
        } else {
          window.addEventListener("setItemEvent", e => {
            if (e.key === "uid") {
              this.userLoginInfo(e.key);
            }
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
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
