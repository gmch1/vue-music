<template>
  <div :class="songListClass">
    <div class="first-line">
      <div class="play-all">
        <i class="iconfont">&#xe6e3;</i>
        <span
          >播放全部
          <span class="sum"> 共{{ songs && songs.length }}首 </span>
        </span>
      </div>
      <div v-if="showCollectCount" class="add-list">
        <i class="iconfont">&#xe62d;</i>
        <span>收藏 {{ getCount(songs.subscribedCount) }} </span>
      </div>
    </div>
    <ul class="song-item-wrapper">
      <li
        class="song-item"
        @click="selectItem($event, index, item)"
        v-for="(item, index) in songs"
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
</template>

<script>
import { getName, getCount } from "../api/utils";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "songlist",
  props: {
    showBackground: {
      type: Boolean,
      default: true
    },
    showCollectCount: {
      type: Boolean,
      default: false
    },
    songs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    ...mapActions("player", [
      "changeSequencePlayList",
      "changePlayList",
      "changeCurrentIndex"
    ]),
    getName(e) {
      return getName(e);
    },
    getCount(e) {
      return getCount(e);
    },
    selectItem(e, index, song) {
      this.changePlayList(this.songs);
      this.changeSequencePlayList(this.songs);
      this.changeCurrentIndex(index);
      this.$emit("musicAnimation", e.clientX, e.clientY);
    }
  },
  computed: {
    songListClass: function() {
      const tag = this.showBackground;
      return { "song-list": true, "song-list-show": tag };
    }
  }
};
</script>

<style lang="scss" scoped>
.song-list-show {
  background: rgb(255, 255, 255);
}
.song-list {
  border-radius: 10px;
  opacity: 0.98;
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
</style>
