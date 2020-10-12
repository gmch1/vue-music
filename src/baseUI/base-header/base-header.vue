<template>
  <div class="base-header-wrapper" ref="outer">
    <i class="iconfont back" @click="handleClickRouter">&#xe655;</i>
    <h1 v-if="!isMarque">{{ title }}</h1>
    <div class="marque-wrapper" v-if="isMarque">
      <h1 ref="text">{{ title }}</h1>
    </div>
    <i class="iconfont back" @click="handleClickShare">&#xe631;</i>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题"
    },
    isMarque: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    // 下拉事件触发时，进行滚动字幕初始化
    isMarque: function(newval, oldval) {
      if (newval) {
        this._initMove();
      }
    }
  },
  data() {
    return {
      inter: null
    };
  },
  methods: {
    handleClickRouter() {
      this.$emit("handleClickRouter");
    },
    handleClickShare() {
      this.$emit("handleClickShare");
    },
    _initMove() {
      // 需要获取最新dom
      if (this.inter) clearInterval(this.inter);
      this.$nextTick(() => {
        const text = this.$refs.text;
        const outer = this.$refs.outer;
        const outerWidth = outer.offsetWidth;
        const textWidth = text.offsetWidth;
        let w = outerWidth;
        this.inter = setInterval(() => {
          w = w + textWidth === 0 ? outerWidth : w - 1;
          text.style.transform = `translateX(${w}px)`;
        }, 16);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/base.scss";

.base-header-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  /* width: 100%; */
  z-index: 100;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  color: $font-color-light;
  .back {
    /* margin-right: 5px; */
    font-size: 20px;
    width: 20px;
  }
  > h1 {
    font-size: $font-size-l;
    font-weight: 700;
  }
  .marque-wrapper {
    flex: 1;
    overflow: hidden;
    position: relative;
    height: 32px;
  }
}
</style>
