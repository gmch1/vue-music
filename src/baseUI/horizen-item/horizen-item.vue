<template>
  <my-scroll class="scroll-cont" :scrollX="true">
    <div ref="Category">
      <div class="horizen-item-wrapper">
        <span>{{ title }}</span>
        <!-- <div class="horizen-wrapper"> -->
        <span
          :class="_getClass(item)"
          v-for="item in list"
          :key="item.key"
          @click="handleClick(item.key)"
        >
          {{ item.name }}
        </span>
        <!-- </div> -->
      </div>
    </div>
  </my-scroll>
</template>

<script>
import MyScroll from "../../components/my-scroll/my-scroll";

export default {
  props: {
    // 接收的列表数据
    list: {
      type: Array,
      default: () => []
    },
    // 当前的item值
    oldVal: {
      type: String,
      default: ""
    },
    // 列表左边的标题
    title: {
      type: String,
      default: ""
    },
    type: {
      type: Number,
      default: 233
    }
    // 点击不同的item执行的方法
    // vue传值不能传递函数，要通过子组件触发函数来实现
    // handleClick: {
    // type: Function,
    // },
  },
  data() {
    return {};
  },
  methods: {
    _getClass(item) {
      console.log(this.oldVal);
      let target = this.oldVal == item.key;
      let obj = {
        selected: target,
        "horizen-item": true
      };
      return obj;
    },
    // 因为batterscroll没有获取到正确的宽度，所以无法滑动，需要获取相应dom节点宽度，再进行设置
    _initWidth() {
      let cateGoryDOM = this.$refs.Category;
      let tagElems = cateGoryDOM.querySelectorAll("span");
      let totalWidth = 0;
      Array.from(tagElems).forEach(ele => {
        totalWidth += ele.offsetWidth;
      });
      console.log(totalWidth);
      cateGoryDOM.style.width = `${totalWidth}px`;
    },
    handleClick(key) {
      this.$emit("handleClick", key, this.type);
    }
  },
  mounted() {
    this._initWidth();
  },
  components: {
    MyScroll
  }
};
</script>

<style scoped lang="scss">
.horizen-item-wrapper {
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  > span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: 12px;
    vertical-align: middle;
  }
  .horizen-item {
    flex: 0 0 auto;
    font-size: 14px;
    padding: 5px 8px;
    border-radius: 10px;
    &.selected {
      color: rgb(212, 68, 57);
      border: 1px solid rgb(212, 68, 57);
      opacity: 0.8;
    }
  }
}
</style>
