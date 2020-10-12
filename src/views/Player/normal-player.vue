<template>
  <transition
    name="normal-fade"
    v-if="fullScreen"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <div class="normal-player-wrapper" ref="normalPlayerRef">
      <div class="background">
        <img
          :src="song.al.picUrl + '?param=300x300'"
          width="100%"
          height="100%"
          alt="歌曲图片"
        />
      </div>
      <div class="background layer"></div>
      <div class="top">
        <div class="back" @click="handleChangeScreen">
          <i class="iconfont icon-back">&#xe662;</i>
        </div>
        <h1 class="title">{{ song.name }}</h1>
        <h1 class="subtitle">{{ getName(song.ar) }}</h1>
      </div>
      <div class="middle">
        <div class="cd-wrapper" ref="cdWrapperRef">
          <div class="cd">
            <img
              :class="playing ? 'image play' : 'image pause'"
              :src="song.al.picUrl + '?param=400x400'"
              alt
            />
          </div>
        </div>
      </div>

      <div class="bottom">
        <div class="progress-bar-wrapper">
          <span class="time time-l">{{ formatPlayTime(currentTime) }}</span>
          <div class="progress-bar-wrapper">
            <progress-bar
              :percent="percent"
              @percentChange="percentChange"
            ></progress-bar>
          </div>
          <div class="time time-r">{{ formatPlayTime(duration) }}</div>
        </div>
        <div class="operator">
          <div class="icon i-left" @click="$emit('handle-changemode')">
            <i class="iconfont" v-html="playmodeIcon()"></i>
          </div>
          <div class="icon i-left" @click="$emit('handle-prev')">
            <i class="iconfont">&#xe6e1;</i>
          </div>
          <div class="icon i-center" @click.stop="handleClick2(playing)">
            <i class="iconfont">{{ playing ? "&#xe723;" : "&#xe731;" }}</i>
          </div>
          <div class="icon i-right" @click="$emit('handle-next')">
            <i class="iconfont">&#xe718;</i>
          </div>
          <div class="icon i-right" @click="$emit('toggle-play-list')">
            <i class="iconfont">&#xe640;</i>
          </div>
        </div>
      </div>
      <music-lyric></music-lyric>
    </div>
  </transition>
</template>

<script>
import { getName, prefixStyle, formatPlayTime } from "../../api/utils";
import animations from "create-keyframe-animation";
const transform = prefixStyle("transform");
import ProgressBar from "../../baseUI/progress-bar/progress-bar";
import { playMode } from "../../api/config";
import MusicLyric from "../../baseUI/music-lyric/music-lyric";

export default {
  computed: {},
  components: {
    ProgressBar,
    MusicLyric
  },
  props: {
    lines: {
      type: Array,
      default: () => []
    },
    song: {
      type: Object,
      default: () => {
        return {};
      }
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    playing: {
      type: Boolean,
      default: false
    },
    percent: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0
    },
    currentTime: {
      type: Number,
      default: 0
    },
    mode: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    console.log(this.lines);
  },
  methods: {
    playmodeIcon() {
      let content;
      if (this.mode === playMode.sequence) {
        content = "&#xe625;";
      } else if (this.mode === playMode.loop) {
        content = "&#xe653;";
      } else {
        content = "&#xe61b;";
      }
      return content;
    },
    percentChange(e) {
      this.$emit("percentChange", e);
    },
    formatPlayTime(e) {
      return formatPlayTime(e);
    },
    handleClick2(playing) {
      if (!playing) {
        this.$emit("changePlaying", true);
      } else {
        this.$emit("changePlaying", false);
      }
    },
    leave() {
      if (!this.$refs.cdWrapperRef) return;
      const cdWrapperDom = this.$refs.cdWrapperRef;
      cdWrapperDom.style.transition = "all .3s";
      const { x, y, scale } = this._getPosAndScale();
      cdWrapperDom.style[
        transform
      ] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
    },
    afterLeave() {
      if (!this.$refs.cdWrapperRef) return;
      const cdWrapperDom = this.$refs.cdWrapperRef;
      cdWrapperDom.style.transition = "";
      cdWrapperDom.style[transform] = "";
      this.$ref.normalPlayerRef.style.display = "none";
    },
    handleChangeScreen() {
      this.$emit("changeFullScreen");
    },
    getName(e) {
      return getName(e);
    },
    // 进场后，解绑动画
    afterEnter() {
      // console.log('remove');
      const cdWrapperDom = this.$refs.cdWrapperRef;
      animations.unregisterAnimation("move");
      cdWrapperDom.style.animation = "";
    },
    // 启动帧动画的函数
    enter(el, done) {
      this.$refs.normalPlayerRef.style.display = "block";
      const { x, y, scale } = this._getPosAndScale();
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.2)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      };
      animations.registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: 400,
          easing: "linear"
        }
      });
      animations.runAnimation(this.$refs.cdWrapperRef, "move", done);
    },
    // 计算偏移的辅助函数
    _getPosAndScale() {
      // mini播放器中唱片的宽度
      const targetWidth = 40;
      const paddingLeft = 40;
      const paddingBottom = 30;
      const paddingTop = 80;
      // 唱片图片的宽度
      const width = window.innerWidth * 0.8;
      const scale = targetWidth / width;
      // 两个圆心的横坐标和纵坐标距离
      const x = -(window.innerWidth / 2 - paddingLeft);
      // 计算方式：屏幕高度-中心唱片距离上方宽度（中心唱片宽度一半、padding-top值）-下方小cd图片距离底部距离padding-bottom
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
      return { x, y, scale };
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/assets/style/base.scss";

// 注意，在同时设置keyfream动画和transiation动画时，需要注意动画时长
.normal-fade-enter-active,
.normal-fade-leave-active {
  .top,
  .bottom {
    transform: translate3d(0, 0, 0);
    transition: all 0.3s cubic-bezier(0.86, 0.18, 0.82, 1.32);
  }
  opacity: 1;
  transition: all 0.3s;
}
.normal-fade-leave-active {
  opacity: 0;
}
.normal-fade-enter,
.normal-fade-leave-to {
  .top {
    transform: translate3d(0, -100px, 0);
  }
  .bottom {
    transform: translate3d(0, 100px, 0);
  }
}

@keyframes route {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.normal-player-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  background: #e4e4e4;
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);
    &.layer {
      background: #2e3030;
      opacity: 0.3;
      filter: none;
    }
  }
  .top {
    position: relative;
    margin-bottom: 25px;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 50;
      .iconfont {
        display: block;
        padding: 9px;
        font-size: 24px;
        color: $font-color-desc;
        font-weight: bold;
        transform: rotate(90deg);
      }
    }
    .title {
      width: 70%;
      margin: 0 auto;
      line-height: 40px;
      text-align: center;
      font-size: $font-size-l;
      color: $font-color-desc-v2;
      @include text-over;
    }
    .subtitle {
      line-height: 20px;
      text-align: center;
      font-size: $font-size-m;
      color: $font-color-desc-v2;
      @include text-over;
    }
  }
  .middle {
    position: fixed;
    width: 100%;
    top: 80px;
    bottom: 170px;
    white-space: nowrap;
    font-size: 0;
    overflow: hidden;
    .cd-wrapper {
      position: absolute;
      margin: auto;
      top: 10%;
      left: 0;
      right: 0;
      width: 80%;
      box-sizing: border-box;
      height: 80vw;
      .cd {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        .image {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border-radius: 50%;
          border: 10px solid rgba(255, 255, 255, 0.1);
        }
        .play {
          animation: route 20s linear infinite;
          &.pause {
            animation-play-state: paused;
          }
        }
      }
      .playing-lyric {
        margin-top: 20px;
        font-size: $font-size-m;
        line-height: 20px;
        white-space: normal;
        text-align: center;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
  .progress-bar-wrapper {
    display: flex;
    align-items: center;
    width: 80%;
    margin: 0px auto;
    padding: 10px 0;
    .time {
      color: $font-color-desc;
      font-size: $font-size-s;
      flex: 0 0 30px;
      line-height: 30px;
      width: 30px;
      &.time-l {
        text-align: left;
      }
      &.time-r {
        text-align: right;
      }
    }
    .progress-bar-wrapper {
      flex: 1;
    }
  }
  .bottom {
    position: absolute;
    bottom: 50px;
    width: 100%;
    .operator {
      display: flex;
      align-items: center;
      .icon {
        font-weight: 300;
        flex: 1;
        color: $font-color-desc;
        &.disable {
          color: $theme-color-shadow;
        }
        i {
          font-weight: 300;
          font-size: 30px;
        }
      }
      .i-left {
        text-align: right;
      }
      .i-center {
        padding: 0 20px;
        text-align: center;
        i {
          font-size: 40px;
        }
      }
      .i-right {
        text-align: left;
      }
      .icon-favorite {
        color: $theme-color;
      }
    }
  }
}
</style>
