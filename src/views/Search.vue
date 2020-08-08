<template>
  <transition name="fly" @after-leave="afterLeave">
    <div class="search-wrapper" v-show="show">
      <div class="container">
        <!-- <div @click="show = false">返回</div> -->
        <search-box
          @input-change="inputChange"
          @back="show = false"
        ></search-box>
        <my-scroll class="my-scroll">
          <div></div>
        </my-scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SearchBox from "../baseUI/search-box/search-box";
import MyScroll from "../components/my-scroll/my-scroll";

export default {
  components: {
    SearchBox,
    MyScroll
  },
  data() {
    return {
      show: false
    };
  },
  mounted() {
    this.show = true;
  },
  computed: {
    ...mapState("search", {
      hotList: state => state.hotList,
      suggestList: state => state.suggestList,
      songsList: state => state.songsList,
      enterLoading: state => state.enterLoading
    }),
    ...mapState("player", {
      songsCount: state => state.playList.length
    })
  },
  methods: {
    ...mapActions("search", [
      "getSuggestList",
      "getHotKeyWords",
      "changeEnterLoading"
    ]),
    inputChange(query) {
      console.log(query);
    },
    afterLeave() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;
  &.fly-enter,
  &.fly-leave-to {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }
  &.fly-enter-active,
  &.fly-leave-active {
    transition: all 0.3s;
  }
  /* &.fly-exit {
    transform: translate3d (0, 0, 0);
  }
  &.fly-exit-active {
    transition: all 0.3s;
    transform: translate3d (100%, 0, 0);
  } */
}
</style>
