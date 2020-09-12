<template>
  <transition name="option">
    <div
      class="my-options"
      @click="handleCloseOptions"
      v-show="showOptions"
      @touchstart="touchstart"
      @touchmove="listentouchmove"
    >
      <div class="blur"></div>
      <div class="options-wrapper" @click.stop ref="opts"></div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { touchmove } from "../../api/utils";

export default {
  data() {
    return {
      pos: { start: 0 }
    };
  },
  computed: {
    ...mapState("user", {
      showOptions: state => state.showOptionState
    })
  },
  methods: {
    ...mapActions("user", ["closeOptionState"]),
    handleCloseOptions() {
      this.closeOptionState();
    },
    touchstart(e) {
      this.pos.start = e.touches[0].clientX;
    },

    listentouchmove(e) {
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

  mounted() {
    // this.listenMove();
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
    right: 30vw;
    background-color: #ccc;
  }
}
</style>
