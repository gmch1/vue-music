<template>
  <div class="home">
    <my-scroll ref="scroll" class="scroll-wrapper">
      <div>
        <my-tab :bannerList="bannerList"></my-tab>
        <my-list :recommendList="recommendList"></my-list>
      </div>
    </my-scroll>
    <my-loading v-show="enterLoading"></my-loading>
    <!-- 不加这个，钩子函数不执行，后续没结果，子路由router view也需要做一个缓存 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from "vuex";
import MyTab from "../components/my-tab/my-tab";
import MyList from "../components/my-list/my-list";
import MyScroll from "../components/my-scroll/my-scroll";
import MyLoading from "../components/my-loading/my-loading";

export default {
  name: "recommend",
  data() {
    return {};
  },
  methods: {
    ...mapActions("recommend", ["getBannerList", "getRecommendList"]),

    _initData() {
      this.getBannerList();
      this.getRecommendList();
    }
  },
  computed: {
    ...mapState("recommend", {
      bannerList: state => state.bannerList,
      recommendList: state => state.recommendList,
      enterLoading: state => state.enterLoading
    })
  },
  components: {
    MyTab,
    MyList,
    MyScroll,
    MyLoading
  },
  mounted() {
    this._initData();
  }
};
</script>

<style scoped lang="scss">
.home {
  height: calc(100vh - 94px);

  .scroll-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
