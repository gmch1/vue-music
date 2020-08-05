<template>
  <div class="singer-wrapper">
    <div class="singer-top">
      <horizen-item
        :list="categoryTypes"
        :title="title1"
        :type="0"
        @handleClick="handleClick"
        :oldVal="category"
      ></horizen-item>
      <horizen-item
        :list="alphaTypes"
        :title="title2"
        :type="1"
        @handleClick="handleClick"
        :oldVal="alpha"
      ></horizen-item>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { alphaTypes, categoryTypes } from "../api/config";
import HorizenItem from "../baseUI/horizen-item/horizen-item";

export default {
  name: "Home",
  components: {
    HorizenItem
  },
  data() {
    return {
      categoryTypes: categoryTypes,
      alphaTypes: alphaTypes,
      title1: "分类(默认热门):",
      title2: "首字母:",
      category: "",
      alpha: ""
    };
  },
  methods: {
    handleClick(key, type) {
      if (type == 0) {
        this.category = key;
      } else if (type == 1) {
        this.alpha = key;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.singer-wrapper {
  .singer-top {
    box-sizing: border-box;
    position: fixed;
    top: 95px;
    width: 100%;
    padding: 5px;
    overflow: hidden;
  }
}
</style>
