<template>
  <transition appear name="bounce" v-show="showStatus">
    <div class="album-wrapper">
      <base-header title="返回" @handleClick="handleClick"></base-header>
    </div>
  </transition>
</template>

<script>
import BaseHeader from "../baseUI/base-header/base-header";

export default {
  data() {
    return {
      showStatus: true
    };
  },
  mounted() {
    console.log(this.$route);
  },
  methods: {
    handleClick() {
      this.showStatus = false;
    }
  },
  components: {
    BaseHeader
  }
};
</script>

<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce-in 0.25s;
}
.bounce-leave-active {
  animation: bounce-out 0.25s;
}
@keyframes bounce-in {
  0% {
    transform: translate3d(100%, 100%, 0);
  }
  50% {
    /* transform: scale(5.5); */
  }
  100% {
    transform: translate3d(0%, 0, 0);
  }
}
@keyframes bounce-out {
  0% {
    transform: translate3d(0%, 0, 0);
  }
  50% {
  }
  100% {
    transform: translate3d(100%, 100%, 0);
  }
}
.album-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  transform-origin: right bottom;
  background-color: #f2f3f4;
}
</style>
