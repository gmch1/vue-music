<template>
  <transition appear name="bounce" v-if="showStatus">
    <div class="album-wrapper">
      <base-header
        ref="baseheader"
        :title="title"
        @handleClickRouter="handleClick"
        :isMarque="isMarque"
      >
      </base-header>
      <my-scroll
        class="album-scroll"
        :listenScroll="scroll"
        @scroll="handleScroll"
        :probeType="probeType"
      >
        <div>
          <div class="top-desc">
            <div
              ref="topdesc"
              class="background"
              :style="{ background: `url(${this.currentAlbum.coverImgUrl}) ` }"
            >
              <div class="filter"></div>
            </div>
            <div class="img-wrapper">
              <div class="decorate"></div>
              <img :src="currentAlbum.coverImgUrl" alt="" />
              <div class="play-count">
                <i class="iconfont play">&#xe885;</i>
                <span class="count"
                  >{{ Math.floor(currentAlbum.subscribedCount / 1000) / 10 }} 万
                </span>
              </div>
            </div>
            <div class="desc-wrapper">
              <div class="title">
                {{ currentAlbum.name }}
              </div>
              <div class="person">
                <div class="avatar">
                  <img :src="currentAlbum.creator.avatarUrl" alt="" />
                </div>
                <div class="name">{{ currentAlbum.creator.nickname }}</div>
              </div>
            </div>
          </div>
          <div class="menu-wrapper">
            <div>
              <i class="iconfont">&#xe6ad;</i>
              评论
            </div>
            <div>
              <i class="iconfont">&#xe86f;</i>
              点赞
            </div>
            <div>
              <i class="iconfont">&#xe62d;</i>
              收藏
            </div>
            <div>
              <i class="iconfont">&#xe606;</i>
              更多
            </div>
          </div>
          <song-list
            :songs="currentAlbum.tracks"
            @musicAnimation="musicAnimation"
          ></song-list>
        </div>
      </my-scroll>
      <my-loading v-if="enterLoading"></my-loading>
      <music-note ref="musicNoteRef"></music-note>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BaseHeader from "../baseUI/base-header/base-header";
import MyScroll from "../components/my-scroll/my-scroll";
import MyLoading from "../components/my-loading/my-loading";
import { getName, getCount } from "../api/utils";
import SongList from "./SongList";
import MusicNote from "../baseUI/music-note/music-note";

const HEADER_HEIGHT = 45;

export default {
  name: "album",
  data() {
    return {
      showStatus: false,
      flag: false,
      isMarque: false,
      scroll: true,
      title: "歌单",
      // 设置这个是为了不进行节流，同时实时触发事件，避免缓慢滑动导致header未及时更新
      probeType: 3
    };
  },
  computed: {
    ...mapState("album", {
      currentAlbum: state => state.currentAlbum,
      enterLoading: state => state.enterLoading
    })
  },

  methods: {
    ...mapActions("album", ["getAlbumList"]),
    getCount(e) {
      return getCount(e);
    },
    musicAnimation(x, y) {
      // console.log(x, y);
      this.$refs.musicNoteRef.startAnimation(x, y);
    },
    isEmptyObject(obj) {
      return !obj || Object.keys(obj).length === 0;
    },
    getName(e) {
      return getName(e);
    },
    handleClick() {
      this.showStatus = false;
      // console.log(this.$route);
      window.history.back();
    },
    handleScroll(pos) {
      let minScrollY = -HEADER_HEIGHT;
      let percent = Math.abs(pos.y / minScrollY);
      let headerDom = this.$refs.baseheader.$el;
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = "#d44439";
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2);

        this.title = this.currentAlbum.name;
        this.isMarque = true;
      } else {
        headerDom.style.backgroundColor = "";
        headerDom.style.opacity = 1;
        this.title = "歌单";
        this.isMarque = false;
      }
    },
    _initData() {
      const id = this.$route.params.id;
      if (id === this.currentAlbum.id) {
        this.showStatus = true;
      } else {
        this.getAlbumList(id);
        this.showStatus = true;
      }
    }
  },
  activated() {
    this._initData();
    // console.log('now ', this.$route);
  },
  watch: {
    currentAlbum(a, b) {
      const currentId = this.currentAlbum.id.toString();
      const paramsId = this.$route.params.id.toString();

      if (currentId === paramsId) {
        this.showStatus = true;
      }
    }
  },

  components: {
    BaseHeader,
    MyScroll,
    MyLoading,
    SongList,
    MusicNote
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
.album-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  transform-origin: right bottom;
  background-color: #f2f3f4;
  .album-scroll {
    height: 100%;
    overflow: hidden;
  }
  .top-desc {
    background-size: 100%;
    padding: 5px 20px;
    padding-bottom: 50px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 275px;
    position: relative;
    .background {
      z-index: -1;
      /* --main-bg-color: url('http://p2.music.126.net/JUjDw2rQuNE2PF4LfIc9Ag==/109951164207707525.jpg'); */
      /*  通过css定义变量，js再进行相应修改，实现不同歌单，显示不同的界面  
          不建议这样做，css变量来设置背景图会导致闪烁，batterscroll会加剧这种情况
      */
      background: brown no-repeat;
      background-position: 0 0;
      background-size: 100% 100%;
      position: absolute;
      width: 100%;
      height: 100%;
      filter: blur(20px);
      .filter {
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.2);
      }
    }
    .img-wrapper {
      width: 120px;
      height: 120px;
      position: relative;
      .decorate {
        position: absolute;
        top: 0;
        width: 100%;
        height: 35px;
        border-radius: 3px;
        background: linear-gradient(
          rgba(110, 110, 110, 0.4),
          rgba(255, 255, 255, 0)
        );
      }
      .play-count {
        position: absolute;
        right: 2px;
        top: 2px;
        font-size: $font-size-s;
        line-height: 15px;
        color: $font-color-light;
        .play {
          vertical-align: top;
        }
      }
      img {
        width: 120px;
        height: 120px;
        border-radius: 3px;
      }
    }
    .desc-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 120px;
      padding: 0 10px;
      .title {
        max-height: 70px;
        color: $font-color-light;
        font-weight: 700;
        line-height: 1.5;
        font-size: $font-size-l;
      }
      .person {
        display: flex;
        .avatar {
          width: 20px;
          height: 20px;
          margin-right: 5px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .name {
          line-height: 20px;
          font-size: $font-size-m;
          color: $font-color-desc-v2;
        }
      }
    }
  }
  .menu-wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 30px 20px 30px;
    margin: -100px 0 0 0;
    > div {
      display: flex;
      flex-direction: column;
      line-height: 20px;
      text-align: center;
      font-size: $font-size-s;
      color: $font-color-light;
      z-index: 1000;
      font-weight: 500;
      .iconfont {
        font-size: 20px;
      }
    }
  }
  .song-list {
    border-radius: 10px;
    opacity: 0.98;
    background: rgb(255, 255, 255);
    .first-line {
      box-sizing: border-box;
      padding: 10px 0;
      margin-left: 10px;
      position: relative;
      justify-content: space-between;
      border-bottom: 1px solid $border-color;
      .play-all {
        display: inline-block;
        line-height: 24px;
        color: $font-color-desc;
        .iconfont {
          font-size: 24px;
          margin-right: 10px;
          vertical-align: top;
        }
        .sum {
          font-size: $font-size-s;
          color: $font-color-desc-v2;
        }
        > span {
          vertical-align: top;
        }
      }
      .add-list,
      .isCollected {
        display: flex;
        align-items: center;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 130px;
        line-height: 34px;
        background: $theme-color;
        color: $font-color-light;
        font-size: 0;
        border-radius: 3px;
        vertical-align: top;
        .iconfont {
          vertical-align: top;
          font-size: $font-size-ss;
          margin: 0 5px 0 10px;
        }
        span {
          font-size: $font-size-m;
          line-height: 34px;
        }
      }
      .isCollected {
        display: flex;
        background: $background-color;
        color: $font-color-desc;
      }
    }
    .song-item-wrapper {
      .song-item {
        display: flex;
        height: 60px;
        align-items: center;
        .index {
          flex-basis: 60px;
          width: 60px;
          height: 60px;
          line-height: 60px;
          text-align: center;
        }
        .info {
          box-sizing: border-box;
          flex: 1;
          display: flex;
          height: 100%;
          padding: 5px 0;
          flex-direction: column;
          justify-content: space-around;
          border-bottom: 1px solid $border-color;
          /* miaxin */
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          > span {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          > span:first-child {
            color: $font-color-desc;
          }
          > span:last-child {
            font-size: $font-size-s;
            color: $font-color-desc-v2;
          }
        }
      }
    }
  }
}
</style>
