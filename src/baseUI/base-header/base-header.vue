<template>
  <div class="base-header-wrapper">
    <i class="iconfont back" onClick="handleClick">&#xe655;</i>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题"
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit("handleClick");
    }
  }
};
</script>

<style lang="scss" scoped>
.base-header-wrapper {
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: #f1f1f1;
  background-color: #000;
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  > h1 {
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
