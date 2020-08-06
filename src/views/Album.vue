<template>
  <transition
    appear
    name="bounce"
    v-if="showStatus && !isEmptyObject(currentAlbum)"
  >
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
            <div ref="topdesc" class="background">
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
          <div class="song-list">
            <div class="first-line">
              <div class="play-all">
                <i class="iconfont">&#xe6e3;</i>
                <span
                  >播放全部
                  <span class="sum">
                    共{{ currentAlbum.tracks.length }}首
                  </span>
                </span>
              </div>
              <div class="add-list">
                <i class="iconfont">&#xe62d;</i>
                <span>收藏 {{ getCount(currentAlbum.subscribedCount) }} </span>
              </div>
            </div>
            <ul class="song-item-wrapper">
              <li
                class="song-item"
                v-for="(item, index) in currentAlbum.tracks"
                :key="index"
              >
                <span class="index">
                  {{ index + 1 }}
                </span>
                <div class="info">
                  <span>{{ item.name }}</span>
                  <span> {{ getName(item.ar) }} - {{ item.al.name }} </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </my-scroll>
      <my-loading v-if="enterLoading"></my-loading>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BaseHeader from "../baseUI/base-header/base-header";
import MyScroll from "../components/my-scroll/my-scroll";
import MyLoading from "../components/my-loading/my-loading";
import { getName, getCount } from "../api/utils";

const HEADER_HEIGHT = 45;

export default {
  data() {
    return {
      showStatus: true,
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
    isEmptyObject(obj) {
      return !obj || Object.keys(obj).length === 0;
    },
    getName(e) {
      return getName(e);
    },
    handleClick() {
      this.showStatus = false;
      this.$router.push("/recommend");
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
      this.getAlbumList(id);
    },
    _initBgImg() {
      //
      if (this.isEmptyObject(this.currentAlbum)) return;
      if (!this.flag) {
        this.flag = true;
        // 将css样式简写成一行
        this.$refs.topdesc.style.background = `url(${this.currentAlbum.coverImgUrl})  no-repeat scroll 0 0 / 100% 100%`;
      }
      /* 等待dom节点渲染完成后触发
      作用 ： 进入某个歌单之后，动态设置背景为歌单用户图片
      scss不支持 js 传参给scss，所以采用动态修改css变量的方式传参，直接修改样式亦可
      setTimeout(() => {       直接修改css变量值，会导致浏览器频繁重绘，性能很差
      this.$refs.topdesc.style.setProperty('--main-bg-color',`url(${this.currentAlbum.coverImgUrl})`url('') );}, 0);*/
    }
  },
  mounted() {
    this._initData();
    this._initBgImg();
  },

  components: {
    BaseHeader,
    MyScroll,
    MyLoading
  }
};
</script>

<style lang="scss" scoped>
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
      --main-bg-color: brown;
      /*  通过css定义变量，js再进行相应修改，实现不同歌单，显示不同的界面  
          不建议这样做，实测，滑动时会导致产生大量重绘
      */
      background: var(--main-bg-color) no-repeat;
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
        font-size: 12px;
        line-height: 15px;
        color: #f1f1f1;
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
        color: #f1f1f1;
        font-weight: 700;
        line-height: 1.5;
        font-size: 16px;
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
          font-size: 14px;
          color: #bba8a8;
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
      font-size: 12px;
      color: #f1f1f1;
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
      border-bottom: 1px solid #e4e4e4;
      .play-all {
        display: inline-block;
        line-height: 24px;
        color: #2e3030;
        .iconfont {
          font-size: 24px;
          margin-right: 10px;
          vertical-align: top;
        }
        .sum {
          font-size: 12px;
          color: #bba8a8;
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
        background: #d44439;
        color: #f1f1f1;
        font-size: 0;
        border-radius: 3px;
        vertical-align: top;
        .iconfont {
          vertical-align: top;
          font-size: 10px;
          margin: 0 5px 0 10px;
        }
        span {
          font-size: 14px;
          line-height: 34px;
        }
      }
      .isCollected {
        display: flex;
        background: #f2f3f4;
        color: #2e3030;
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
          border-bottom: 1px solid #e4e4e4;
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
            color: #2e3030;
          }
          > span:last-child {
            font-size: 12px;
            color: #bba8a8;
          }
        }
      }
    }
  }
}
</style>
