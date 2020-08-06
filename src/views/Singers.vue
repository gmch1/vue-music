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
    <div class="singer-list-wrapper">
      <my-scroll
        class="singer-scroll"
        :data="singerList"
        :pullUpLoading="pullUpLoading"
        :pullDownLoading="pullDownLoading"
        :pulldown="true"
        :pullup="true"
        @scrollToEnd="handlePullUp"
        @pulldown="handlePullDown"
      >
        <div class="list-item">
          <div
            class="singer-item"
            v-for="(item, index) in singerList"
            :key="index"
            @click="handleRouterChange(item.id)"
          >
            <div class="img-wrapper">
              <img
                v-lazy="item.picUrl + '?params=300*300'"
                width="100%"
                height="100%"
                alt="music"
              />
            </div>
            <span class="name">
              {{ item.name }}
            </span>
          </div>
        </div>
      </my-scroll>
    </div>
    <my-loading v-show="enterLoading"></my-loading>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from "vuex";
import MyLoading from "../components/my-loading/my-loading";
import { alphaTypes, categoryTypes } from "../api/config";
import HorizenItem from "../baseUI/horizen-item/horizen-item";
import MyScroll from "../components/my-scroll/my-scroll";

export default {
  name: "Home",
  components: {
    HorizenItem,
    MyScroll,
    MyLoading
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
  computed: {
    ...mapState("singers", {
      singerList: state => state.singerList,
      enterLoading: state => state.enterLoading,
      pullUpLoading: state => state.pullUpLoading,
      pullDownLoading: state => state.pullDownLoading,
      pageCount: state => state.pageCount
    })
  },
  methods: {
    handleRouterChange(id) {
      this.$router.push(`/singers/${id}`);
    },
    // 上拉到底部，进行继续加载
    handlePullUp() {
      this.pullUpRefreshDispatch(
        this.category,
        this.alpha,
        this.category === "",
        this.pageCount
      );
    },
    // 下拉刷新
    handlePullDown() {
      console.log("refresh 触发");
      this.pullDownRefreshDispatch(this.category, this.alpha);
    },
    handleClick(key, type) {
      if (type == 0) {
        this.category = key;
        this.updateDispatch(key, this.alpha);
      } else if (type == 1) {
        this.alpha = key;
        this.updateDispatch(this.category, key);
      }
    },
    ...mapActions("singers", [
      "getHotSingerList",
      "refreshMoreHotSingerList",
      "getSingerList",
      "refreshMoreSingerList",
      "changePageCount",
      "changeEnterLoading",
      "changePullDownLoading",
      "changePullUpLoading"
    ]),
    _initData() {
      this.getHotSingerList();
    },
    updateDispatch(category, alpha) {
      // 改变分类，自动跳转第一页
      this.changePageCount(0);
      // 开始进行加载动画
      this.changeEnterLoading(true);
      // 加载相应内容
      this.getSingerList({ category, alpha });
    },
    // 滑倒最底部更新部分数据（合并）
    pullUpRefreshDispatch(category, alpha, hot, count) {
      // 展示下拉动画
      this.changePullUpLoading(true);
      this.changePageCount(count + 1);
      if (hot) {
        this.refreshMoreHotSingerList();
      } else {
        this.refreshMoreSingerList({ category, alpha });
      }
    },
    // 顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      this.changePullDownLoading(true);
      // 重新获取数据
      this.changePageCount(0);
      if (category === "" && alpha === "") {
        this.getHotSingerList();
      } else {
        this.getSingerList({ category, alpha });
      }
    }
  },
  mounted() {
    this._initData();
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
  .singer-list-wrapper {
    position: fixed;
    top: 160px;
    left: 0;
    bottom: 0;
    width: 100%;
    .singer-scroll {
      height: 100%;
      overflow: hidden;
    }
  }
  .list-item {
    display: flex;
    margin: auto;
    flex-direction: column;
    overflow: hidden;
    .singer-item {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      margin: 0 5px;
      padding: 5px 0;
      align-items: center;
      border-bottom: 1px solid rgb(228, 228, 228);
      .img-wrapper {
        margin-right: 20px;
        img {
          border-radius: 3px;
          width: 50px;
          height: 50px;
        }
      }
      .name {
        font-size: 14px;
        color: rgb(46, 48, 48);
        font-weight: 500;
      }
    }
  }
}
</style>
