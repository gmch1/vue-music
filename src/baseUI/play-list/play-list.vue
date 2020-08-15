<template>
  <transition
    name="list-fade"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <div
      class="play-list-wrapper"
      ref="playListRef"
      v-if="showPlayList"
      @click="$emit('toggle-close-playlist')"
    >
      <div
        class="list-wrapper"
        v-show="show"
        ref="listWrapperRef"
        @click.stop.self
      >
        <div class="list-header">
          <h1 class="title">
            <div @click="$emit('handle-changemode')">
              <i class="iconfont" v-html="content"></i>
              <span class="text">{{ text }}</span>
            </div>
            <span class="iconfont clear" @click="handleShowClear"
              >&#xe63d;</span
            >
          </h1>
        </div>
        <div>
          <my-scroll class="scroll-wrapper">
            <ul class="list-content">
              <li
                class="item"
                v-for="(item, index) in playList"
                @click="handleChangeCurrentIndex(index)"
                :key="item.id"
              >
                <i
                  :class="getCurrentClass(item)"
                  v-html="getCurrentIcon(item)"
                ></i>
                <span class="text"
                  >{{ item.name }} - {{ getName(item.ar) }}</span
                >
                <span class="like">
                  <i class="iconfont">&#xe601;</i>
                </span>
                <span class="delete" @click.stop="handleDeleteSong(item)">
                  <i class="iconfont">&#xe63d;</i>
                </span>
              </li>
            </ul>
          </my-scroll>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { prefixStyle, getName } from "../../api/utils";
import { playMode } from "../../api/config";
import MyScroll from "../../components/my-scroll/my-scroll";

const transform = prefixStyle("transform");

export default {
  components: {
    MyScroll
  },
  props: {
    showPlayList: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      content: "&#xe625",
      text: "顺序播放"
    };
  },
  computed: {
    ...mapState("player", {
      sequencePlayList: state => state.sequencePlayList,
      playList: state => state.playList,
      mode: state => state.mode,
      currentIndex: state => state.currentIndex,
      currentSong: state => state.currentSong
    })
  },
  methods: {
    ...mapActions("player", [
      "changeCurrentSong",
      "changePlayList",
      "changePlayMode",
      "changeCurrentIndex",
      "changeShowPlayList",
      "handleDeleteSong"
    ]),
    // 动画钩子
    enter() {
      this.show = true;
      this.$refs.listWrapperRef.style[transform] = `translate3d(0,100%,0)`;
    },
    afterEnter() {
      this.$refs.listWrapperRef.style["transition"] = "all 0.3s";
      this.$refs.listWrapperRef.style[transform] = `translate3d(0,0,0)`;
    },
    leave() {
      this.$refs.listWrapperRef.style["transform"] = "all 0.3s";
      this.$refs.listWrapperRef.style[transform] = `translate3d(0,100%,0)`;
    },
    afterLeave() {
      // this.$refs.listWrapperRef.style[transform] = `translate3d(0,100%,0)`;
      this.show = false;
    },
    getName(e) {
      return getName(e);
    },
    handleShowClear() {
      // 如果重新设置state，修改播放列表，可能会触发页面的自动播放逻辑导致出错，所以直接路由重定向，刷新state
      this.$router.go(0);
    },
    getCurrentIcon(item) {
      // console.log(this.currentSong.id)
      // console.log(item.id)
      const current = this.currentSong.id === item.id;

      return current ? "&#xe6e3;" : "";
    },
    getCurrentClass(item) {
      const current = this.currentSong.id === item.id;
      const className = current ? "icon-play" : "";
      return { current: true, iconfont: true, className };
    },
    getPlayMode() {
      if (this.mode === playMode.sequence) {
        this.content = "&#xe625;";
        this.text = "顺序播放";
      } else if (this.mode === playMode.loop) {
        this.content = "&#xe653;";
        this.text = "单曲循环";
      } else {
        this.content = "&#xe61b;";
        this.text = "随机播放";
      }
    },
    handleChangeCurrentIndex(index) {
      if (this.currentIndex === index) return;
      this.changeCurrentIndex(index);
    }
  },
  watch: {
    mode(newVal, oldVal) {
      if (oldVal === newVal) return;
      this.getPlayMode();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin.scss";

.play-list-wrapper {
  &.list-fade-enter,
  &.list-fade-leave-to {
    opacity: 0;
  }
  &.list-fade-leave-active,
  &.list-fade-enter-active {
    transition: all 0.1s;
  }
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3);
  .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 1;
    border-radius: 10px 10px 0 0;
    background-color: #fff;
    transform: translate3d(0, 0, 0);
    .list-close {
      text-align: center;
      line-height: 50px;
      background-color: #e4e4e4;
      font-size: 16px;
      color: #2e3030;
    }
    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;
      .title {
        display: flex;
        align-items: center;
        > div {
          flex: 1;
          .text {
            flex: 1;
            font-size: 14px;
            color: #2e3030;
          }
        }
      }
      .iconfont {
        margin-right: 10px;
        font-size: 18px;
        color: #d44439;
      }
      .clear {
        font-size: 16px;
        // mixin
        @include clear;
        /* position: relative;
        &:before {
          content: '';
          position: absolute;
          top: -10px;
          bottom: -10px;
          left: -10px;
          right: -10px;
        } */
      }
    }
    .scroll-wrapper {
      height: 400px;
      overflow: hidden;
      .list-content {
        .item {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 30px 0 20px;
          overflow: hidden;
          .current {
            flex: 0 0 20px;
            width: 20px;
            font-size: 12px;
            color: #d44439;
          }
          .text {
            flex: 1;
            @include text-over;

            /* // mixin
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap; */

            font-size: 14px;
            color: #bba8a8;
            .icon-favorite {
              color: #d44439;
            }
          }
          .like {
            @include clear;

            // mixin
            /* position: relative;
            &:before {
              content: '';
              position: absolute;
              top: -10px;
              bottom: -10px;
              left: -10px;
              right: -10px;
            } */

            margin-right: 15px;
            color: #d44439;
            font-size: 14px;
          }
          .delete {
            @include clear;

            /* // mixin
            position: relative;
            &:before {
              content: '';
              position: absolute;
              top: -10px;
              bottom: -10px;
              left: -10px;
              right: -10px;
            } */
            font-size: 12px;
            color: #d44439;
          }
        }
      }
    }
  }
}
</style>
