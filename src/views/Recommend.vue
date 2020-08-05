<template>
  <div class="home">
    <my-scroll ref="scroll" class="scroll-wrapper">
      <div>
        <my-tab :bannerList="bannerList"></my-tab>
        <my-list :recommendList="recommendList"></my-list>
      </div>
    </my-scroll>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from "vuex";
import MyTab from "@/components/my-tab/my-tab";
import MyList from "../components/my-list/my-list";
import MyScroll from "../components/my-scroll/my-scroll";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getBannerList", "getRecommendList"]),
    _initData() {
      this.getBannerList();
      this.getRecommendList();
    }
  },
  computed: {
    ...mapState(["bannerList", "recommendList"])
  },
  components: {
    MyTab,
    MyList,
    MyScroll
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
