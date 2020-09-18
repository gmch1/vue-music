<template>
  <transition appear name="bounce" v-if="showStatus">
    <div class="singer-wrapper">
      <div ref="header">
        <base-header
          :title="artist.name"
          @handleClickRouter="handleClick"
        ></base-header>
      </div>
      <div class="img-wrapper" ref="img-wrapper">
        <div class="filter"></div>
      </div>
      <div class="collect-button" ref="collectButton">
        <i class="iconfont">&#xe62d;</i>
        <span class="text">收藏</span>
      </div>
      <div class="bg-layer" ref="layer"></div>
      <div class="song-wrapper" ref="songScrollWrapper">
        <my-scroll
          class="song-scroll"
          ref="myscroll"
          :listenScroll="listenScroll"
          @scroll="handleScroll"
          :probeType="probeType"
        >
          <song-list
            :songs="songsOfArtist"
            :showBackground="showBackground"
            @musicAnimation="musicAnimation"
          ></song-list>
        </my-scroll>
      </div>
      <music-note ref="musicNoteRef"></music-note>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BaseHeader from "../baseUI/base-header/base-header";
import SongList from "./SongList";
import MyScroll from "../components/my-scroll/my-scroll";
import { HEADER_HEIGHT } from "../api/config";
import MusicNote from "../baseUI/music-note/music-note";

// 往上偏移的尺寸，露出圆角
const OFFSET = 5;

export default {
  name: "singer",

  components: {
    BaseHeader,
    SongList,
    MyScroll,
    MusicNote
  },
  props: {
    showStatus: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      listenScroll: true,
      imgWrapperHeight: null,
      showBackground: true,
      // 设置这个是为了不进行节流，同时实时触发事件，避免缓慢滑动导致header未及时更新
      probeType: 3
    };
  },
  computed: {
    ...mapState("singer", {
      artist: state => state.artist,
      songsOfArtist: state => state.songsOfArtist,
      loading: state => state.loading
    })
  },
  methods: {
    ...mapActions("singer", ["getSIngerInfo"]),
    handleClick() {
      // this.showStatus = false;
      window.history.go(-1);
    },
    musicAnimation(x, y) {
      this.$refs.musicNoteRef.startAnimation(x, y);
    },
    handleScroll(pos) {
      const height = this.imgWrapperHeight;
      const newY = pos.y;
      const imageDOM = this.$refs["img-wrapper"];
      const buttonDOM = this.$refs.collectButton;
      const headerDOM = this.$refs.header;
      const layerDOM = this.$refs.layer;
      const songScrollDOM = this.$refs.songScrollWrapper;

      const minSCrollY = -(height - OFFSET) + HEADER_HEIGHT;

      // 滑动距离占图片的百分比
      const percent = Math.abs(newY / height);

      // 下拉情况处理，图片放大，按钮偏移
      if (newY > 0) {
        imageDOM.style["transform"] = `scale(${1 + percent})`;
        buttonDOM.style["transform"] = `translate3d(0,${newY}px,0`;
        layerDOM.style.top = `${height - OFFSET + newY}px`;
      } else if (newY >= minSCrollY) {
        // 往上滑动，但是遮罩还没有超过header部分
        layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;

        // 必须同步修改scroll wrapper的top
        songScrollDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;

        // 保证遮罩的层叠优先级比图片高，不至于被图片挡住
        layerDOM.style.zIndex = 1;
        imageDOM.style.paddingTop = "75%";
        imageDOM.style.height = 0;
        imageDOM.style.zIndex = -1;
        // 按钮跟随移动且逐渐变透明
        buttonDOM.style["transform"] = `translate3d(0,${newY}px,0)`;
        buttonDOM.style["opacity"] = `${1 - percent * 2}`;
      } else if (newY < minSCrollY) {
        // 往上滑动，但是超过header部分
        layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
        layerDOM.style.zIndex = 1;
        // 防止溢出歌单内容遮住header
        headerDOM.style.zIndex = 100;
        // 此时图片高度与Header一致
        imageDOM.style.height = `${HEADER_HEIGHT}px`;
        imageDOM.style.paddingTop = 0;
        imageDOM.style.zIndex = 99;
      }
    },
    _initData() {
      const id = this.$route.params.id;
      this.getSIngerInfo(id);
    },
    _initBgImg() {
      const parentNode = this.$refs["img-wrapper"];
      // parentNode.style.backgroundImage = `url(${this.artist.picUrl})`;
      // var bgColor = getComputedStyle(parentNode).getPropertyValue("--bgColor");
      console.log(this.artist.picUrl);
      // parentNode.style.setProperty("--bgColor", `url(${this.artist.picUrl})`);
      this.imgWrapperHeight = this.$refs["img-wrapper"].offsetHeight;
    },
    _initSongListHeight() {
      this.$refs.songScrollWrapper.style.top = `${this.imgWrapperHeight -
        OFFSET}px`;
      this.$refs.layer.style.top = `${this.imgWrapperHeight - OFFSET}px`;
      this.$refs.myscroll.refresh();
    }
  },

  mounted() {
    this._initData();

    this._initBgImg();
    this._initSongListHeight();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/base.scss";

.bounce-enter-active {
  animation: bounce-in 0.25s;
}
.bounce-leave-active {
  animation: bounce-out 0.25s;
}
@keyframes bounce-in {
  0% {
    transform: translate3d(100%, 100%, 0);
  }
  50% {
    /* transform: scale(5.5); */
  }
  100% {
    transform: translate3d(0%, 0, 0);
  }
}
@keyframes bounce-out {
  0% {
    transform: translate3d(0%, 0, 0);
  }
  50% {
  }
  100% {
    transform: translate3d(100%, 100%, 0);
  }
}

.singer-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* bottom: ${props => props.play > 0 ? "60px": 0}; */
  bottom: 0;
  width: 100vw;
  z-index: 100;
  overflow: hidden;
  background: $background-color;
  .img-wrapper {
    --bgColor: url(https://p1.music.126.net/nILBk4DaE3yV__25uq-5GQ==/18641120139241412.jpg);
    background: var(--bgColor);

    position: relative;
    width: 100%;
    height: 0;
    padding-top: 75%;
    transform-origin: top;
    background-size: cover;

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.3);
    }
  }
  .bg-layer {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $highlight-background-color;
    border-radius: 10px;
    z-index: 50;
  }

  .collect-button {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    box-sizing: border-box;
    width: 120px;
    height: 40px;
    margin-top: -55px;
    z-index: 50;
    background: $theme-color;
    color: $font-color-light;
    border-radius: 20px;
    text-align: center;
    font-size: 0;
    line-height: 40px;
    .iconfont {
      display: inline-block;
      margin-right: 10px;
      font-size: $font-size-s;
      vertical-align: top;
    }
    .text {
      display: inline-block;
      font-size: $font-size-m;
      letter-spacing: 5px;
    }
  }

  .song-wrapper {
    position: absolute;
    z-index: 50;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .song-scroll {
      overflow: hidden;
      height: 100%;
    }
    > div {
      position: absolute;
      left: 0;
      width: 100%;
      overflow: visible;
    }
  }
}
.havePlayer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 60px;
}
</style>
