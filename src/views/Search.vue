<template>
  <transition name="fly" @after-leave="afterLeave">
    <div class="search-wrapper" v-if="show">
      <!-- <div @click="show = false">返回</div> -->
      <search-box
        @input-change="inputChange"
        @back="show = false"
        :query="query"
      ></search-box>

      <div class="shortcut-wrapper" v-if="!query">
        <my-scroll class="my-scroll">
          <div>
            <div class="hot-key">
              <h1 class="title">热门搜索</h1>
              <li
                class="item"
                v-for="item in hotList"
                :key="item.first"
                @click="setQuery(item)"
              >
                <span>{{ item.first }}</span>
              </li>
            </div>
          </div>
        </my-scroll>
      </div>
      <div class="shortcut-wrapper" v-if="query">
        <my-scroll class="my-scroll">
          <div>
            <div class="list-wrapper" v-if="artists && artists.length > 0">
              <h1 class="title">相关歌手</h1>
              <div
                class="list-item"
                v-for="(item, index) in artists"
                :key="index"
                @click="toSinger(item)"
              >
                <div class="img-wrapper">
                  <img :src="item.picUrl" width="50" height="50" alt="img" />
                </div>
                <span class="name">{{ item.name }}</span>
              </div>
            </div>
            <ul class="song-item">
              <li
                v-for="(item, index) in songsList"
                :key="index"
                @click="play(item)"
              >
                <div class="info">
                  <span>{{ item.name }}</span>
                  <span
                    >{{ getName(item.artists) }}- {{ item.album.name }}</span
                  >
                </div>
              </li>
            </ul>
          </div>
        </my-scroll>
      </div>
      <my-loading v-show="enterLoading"></my-loading>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SearchBox from "../baseUI/search-box/search-box";
import MyScroll from "../components/my-scroll/my-scroll";
import MyLoading from "../components/my-loading/my-loading";
import { getName } from "../api/utils";

export default {
  name: "search",
  components: {
    SearchBox,
    MyScroll,
    MyLoading
  },
  data() {
    return {
      show: false,
      query: ""
    };
  },
  activated() {
    this.show = true;
    this.getHotKeyWords();
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
    }),
    artists() {
      return this.suggestList.artists;
    }
  },
  methods: {
    ...mapActions("search", [
      "getSuggestList",
      "getHotKeyWords",
      "changeEnterLoading"
    ]),
    ...mapActions("player", ["getSongDetail"]),
    inputChange(mquery) {
      this.query = mquery;
    },
    afterLeave() {
      this.$router.go(-1);
    },
    setQuery(item) {
      this.query = item.first;
    },
    handleQuery() {
      if (!this.query) return;
      this.changeEnterLoading("true");
      this.getSuggestList(this.query);
    },
    getName(e) {
      return getName(e);
    },
    toSinger(item) {
      const id = item.id;
      this.$router.push("singers/" + id);
    },
    play(item) {
      this.getSongDetail(item.id);
    }
  },
  watch: {
    query(newVal, oldVal) {
      if (newVal === oldVal) return;
      this.handleQuery();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/base.scss";

.search-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: $background-color;
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
  .shortcut-wrapper {
    position: absolute;
    top: 40px;
    bottom: 0;
    width: 100%;
    .my-scroll {
      height: 100%;
      overflow: hidden;
      .hot-key {
        margin: 0 20px 20px 20px;
        .title {
          padding-top: 35px;
          margin-bottom: 20px;
          font-size: $font-size-m;
          color: $font-color-desc-v2;
        }
        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background-color: $highlight-background-color;
          font-size: $font-size-m;
          color: $font-color-desc;
        }
      }
    }
    .list-wrapper {
      display: flex;
      margin: auto;
      flex-direction: column;
      overflow: hidden;
      .title {
        margin: 10px 0 10px 10px;
        color: $font-color-desc-v2;
        font-size: $font-size-s;
      }
      .list-item {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        margin: 0 5px;
        padding: 5px 0;
        align-items: center;
        border-bottom: 1px solid $background-color;
        .img-wrapper {
          margin-right: 20px;
          img {
            border-radius: 3px;
            width: 50px;
            height: 50px;
          }
        }
        .name {
          font-size: $font-size-m;
          color: $font-color-desc-v2;
          font-weight: 500;
        }
      }
    }
    .song-item {
      padding-left: 20px;

      > li {
        display: flex;
        height: 60px;
        align-items: center;

        .index {
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
