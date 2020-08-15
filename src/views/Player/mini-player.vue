<template>
  <transition appear name="mini-fade" v-if="!fullScreen">
    <div class="mini-player-wrapper" @click="handleClick1">
      <div class="icon">
        <div class="img-wrapper">
          <img
            :src="song.al.picUrl"
            alt="img"
            width="40"
            height="40"
            :class="playing ? 'play' : 'pause'"
          />
        </div>
      </div>
      <div class="text">
        <h2 class="name">{{ song.name }}</h2>
        <p class="desc">{{ getName(song.ar) }}</p>
      </div>
      <div @click.stop="handleClick2(playing)" class="control">
        <progress-circle :percent="percent" :radius="radius">
          <i v-if="playing" class="iconfont icon-mini">&#xe650;</i>
          <i v-if="!playing" class="icon-mini iconfont icon-play">&#xe61e;</i>
        </progress-circle>
      </div>
      <div class="control" @click.stop="handleClick3">
        <i class="iconfont">&#xe640;</i>
      </div>
    </div>
  </transition>
</template>

<script>
import { getName } from "../../api/utils";
import ProgressCircle from "../../baseUI/progress-circle/progress-circle";

export default {
  components: {
    ProgressCircle
  },
  data() {
    return {
      radius: 32
    };
  },
  props: {
    song: {
      type: Object,
      default: () => {
        return {};
      }
    },
    fullScreen: {
      type: Boolean,
      default: true
    },
    playing: {
      type: Boolean,
      default: false
    },
    percent: {
      type: Number,
      default: 0.2
    }
  },
  methods: {
    getName(e) {
      return getName(e);
    },
    handleClick1() {
      this.$emit("changeFullScreen");
    },
    handleClick2(playing) {
      if (!playing) {
        this.$emit("changePlaying", true);
      } else {
        this.$emit("changePlaying", false);
      }
    },
    handleClick3() {
      this.$emit("togglePlayList");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/base.scss";

.mini-fade-enter-active {
  transition: all 0.12s ease;
}
.mini-fade-leave-active {
  transition: all 0.12s cubic-bezier(1, 0.5, 0.8, 1);
}
.mini-fade-enter,
.mini-fade-leave-to {
  transform: translate3d(0, 100%, 0);
}

@keyframes route {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.mini-player-wrapper {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 60px;
  background: #fff;
  // 动画样式需要调整
  &.mini-enter {
    transform: translate3d(0, 100%, 0);
  }
  &.mini-enter-active {
    transform: translate3d(0, 0, 0);
    transition: all 0.4s;
  }
  &.mini-exit-active {
    transform: translate3d(0, 100%, 0);
    transition: all 0.4s;
  }
  .icon {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .img-wrapper {
      width: 100%;
      height: 100%;
      img {
        border-radius: 50%;
        &.play {
          animation: route 10s infinite;
          &.pause {
            animation-play-state: paused;
          }
        }
      }
    }
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .name {
      margin-bottom: 2px;
      font-size: $font-size-m;
      color: $font-color-desc;
      // miaxin
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .desc {
      font-size: $font-size-s;
      color: $font-color-desc-v2;
      // miaxin
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .control {
    flex: 0 0 30px;
    padding: 0 10px;
    .iconfont,
    .icon-playlist {
      font-size: 25px;
      color: $theme-color;
    }
    .icon-mini {
      font-size: $font-size-l;
      position: absolute;
      left: 8px;
      top: 8px;
      &.icon-play {
        left: 9px;
      }
    }
  }
}
</style>
