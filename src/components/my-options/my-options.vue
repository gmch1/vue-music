<template>
  <transition name="option">
    <div
      class="my-options"
      @click="handleCloseOptions"
      v-show="showOptions"
      @touchstart="touchStart"
      @touchmove="listenTouchMove"
    >
      <!-- 滤镜效果 -->
      <div class="blur"></div>
      <!-- 视图容器 -->
      <div class="options-wrapper" @click.stop ref="opts">
        <!-- 音乐包 没有相关接口，所以只是个摆设-->
        <!-- <music-package></music-package> -->
        <!-- 用户模块 -->
        <user-card :user="user" @close="handleCloseOptions"></user-card>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { touchmove } from "../../api/utils";
import UserCard from "../user-card/user-card";

export default {
  data() {
    return {
      pos: { start: 0 }
    };
  },
  computed: {
    ...mapState("user", {
      showOptions: state => state.showOptionState,
      user: state => state.user
    })
  },
  methods: {
    ...mapActions("user", ["closeOptionState"]),
    handleCloseOptions() {
      this.closeOptionState();
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
        this.closeOptionState,
        this.showOptions,
        "close"
      );
    }
  },
  components: {
    UserCard
  }
};
</script>

<style lang="scss" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
/* 没有完成预期效果，需要鼠标move同时修改动画的显示，这应该使用钩子函数解决 */
.option-enter-active {
  transition: all 0.2s ease;
}
.option-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.option-enter, .option-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-300px);
  opacity: 0;
}
.my-options {
  z-index: 999;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  .blur {
    height: 100vh;
    width: 100vw;
    filter: blur(1px);
    opacity: 0.2;
    background-color: rgb(104, 95, 95);
  }
  .options-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 15.5vw;
    background-color: #ffffff;
    width: 84.5vw;
    /* height: 100vw; */
  }
}
</style>
