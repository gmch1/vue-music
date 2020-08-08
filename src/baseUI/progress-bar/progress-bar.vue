<template>
  <div class="progress-bar-wrapper" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefixStyle } from "../../api/utils";
const progressBtnWidth = 16;
const transform = prefixStyle("transform");

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    // 之所以在这里定义，是不需要它是响应式的，降低observer性能开销
    this.touch = {};
  },
  methods: {
    progressTouchStart(e) {
      this.touch.initiated = true; // inirial 为true表示滑动动作开始
      this.touch.startX = e.touches[0].pageX; //滑动开始横向坐标
      this.touch.left = this.$refs.progress.clientWidth;
    },
    progressTouchMove(e) {
      // 未开始则直接移除
      if (!this.touch.initiated) {
        return;
      }
      const deltaX = e.touches[0].pageX - this.touch.startX;
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const offsetWidth = Math.min(
        Math.max(0, this.touch.left + deltaX),
        barWidth
      );
      this._offset(offsetWidth);
    },
    progressTouchEnd(e) {
      this.touch.initiated = false;
      this._triggerPercent();
    },
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      this._offset(offsetWidth);
      // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
      this._triggerPercent();
    },
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const percent = this.$refs.progress.clientWidth / barWidth;
      this.$emit("percentChange", percent);
    },
    //处理进度条偏移
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`;
      this.$refs.progressBtn.style[
        transform
      ] = `translate3d(${offsetWidth}px,0,0)`;
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        const offsetWidth = newPercent * barWidth;
        this._offset(offsetWidth);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.progress-bar-wrapper {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: #d44439;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -15px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid #e4e4e4;
        border-radius: 50%;
        background: #d44439;
      }
    }
  }
}
</style>
