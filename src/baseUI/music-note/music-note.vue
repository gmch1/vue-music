<template>
  <div class="music-node-wrapper" ref="iconsRef"></div>
</template>

<script>
import { prefixStyle } from "../../api/utils";
const ICON_NUMBER = 3;
const transform = prefixStyle("transform");
export default {
  mounted() {
    this._initAni();
  },
  methods: {
    createNode(txt) {
      const template = `<div class="icon-wrapper">${txt}</div>`;
      let tempNode = document.createElement("div");
      tempNode.innerHTML = template;
      return tempNode.firstChild;
    },
    _initAni() {
      // 小球动画有问题
      for (let i = 0; i < ICON_NUMBER; i++) {
        let node = this.createNode('<div class="iconfont">&#xe642;</div>');
        this.$refs.iconsRef.appendChild(node);
      }
      let domArray = [...this.$refs.iconsRef.children];
      domArray.forEach(item => {
        item.running = false;
        item.addEventListener(
          "transitionend",
          function() {
            console.log("transitionend");
            this.style["display"] = "none";
            this.style[transform] = `translate3d(0,0,0)`;
            this.running = false;

            let icon = this.querySelector("div");
            icon.style[transform] = `translate3d(0,0,0)`;
          },
          false
        );
      });
    },
    startAnimation(x, y) {
      // console.log(x, y);
      for (let i = 0; i < ICON_NUMBER; i++) {
        let domArray = [...this.$refs.iconsRef.children];
        let item = domArray[i];
        // console.log(item);
        // 选择空闲元素来开启动画
        if (item.running === false) {
          item.style.left = x + "px";
          item.style.top = y + "px";
          item.style.display = "inline-block";

          // setTimeout(() => {
          item.running = true;
          item.style[transform] = `translate3d(0,750px,0)`;
          let icon = item.querySelector("div");
          icon.style[transform] = `translate3d(-40px,0,0)`;
          // }, 20);
          break;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/base.scss";

.music-node-wrapper {
  position: fixed;
  z-index: 1000;
  margin-top: -10px;
  margin-left: -10px;
  color: $theme-color;
  font-size: $font-size-m;
  display: none;
  transition: transform 1s;
  transform: translate3d(0, 0, 0);
  > div {
    background-color: red;
    transition: transform 1s;
  }
}
</style>
