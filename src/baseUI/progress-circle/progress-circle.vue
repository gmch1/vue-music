<template>
  <div class="progress-circle-wrapper">
    <svg
      :width="radius"
      :height="radius"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="progress-background"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
      />
      <circle
        class="progress-bar"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    radius: {
      type: Number,
      default: 100
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 整个背景的周长
      dashArray: Math.PI * 100
    };
  },
  computed: {
    // 没有高亮的部分，剩下高亮的就是进度
    dashOffset() {
      return (1 - this.percent) * this.dashArray;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.progress-circle-wrapper {
  position: relative;
  circle {
    stroke-width: 8px;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: rgba(212, 68, 57, 0.5);
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: #d44439;
    }
  }
}
</style>
