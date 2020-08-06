<template>
  <div class="my-list-wrapper">
    <h1 class="title">推荐歌单</h1>
    <div class="list-wrapper">
      <div
        class="list-item"
        v-for="(item, index) in recommendList"
        :key="index"
        @click="handleRouterpush(item.id)"
      >
        <div class="img-wrapper">
          <div class="decorate"></div>
          <img
            v-lazy="item.picUrl + '?param=300*300'"
            width="100%"
            height="100%"
            alt="music"
          />
          <div class="play-count">
            <i class="iconfont play">&#xe885;</i>
            <span class="count">{{ getCount(item.playCount) }}</span>
          </div>
        </div>
        <div class="desc">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCount } from "../../api/utils";

export default {
  props: {
    recommendList: {
      type: Array
    }
  },
  methods: {
    getCount(e) {
      return getCount(e);
    },
    handleRouterpush(id) {
      this.$router.push(`/recommend/${id}`);
    }
  }
};
</script>

<style scoped lang="scss">
.my-list-wrapper {
  max-width: 100%;
  .title {
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
  }
  .list-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    .list-item {
      position: relative;
      width: 32%;
      .img-wrapper {
        position: relative;
        height: 0;
        padding-bottom: 100%;
        .decorate {
          position: absolute;
          top: 0;
          width: 100%;
          height: 35px;
          border-radius: 3px;
          background: linear-gradient
            (hsla (0, 0%, 43%, 0.4), hsla (0, 0%, 100%, 0));
        }
        .play-count {
          position: absolute;
          right: 2px;
          top: 2px;
          font-size: 12px;
          line-height: 15px;
          color: rgb(241, 241, 241);
        }
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }
      }
      .desc {
        overflow: hidden;
        margin-top: 2px;
        padding: 0 2px;
        height: 50px;
        text-align: left;
        font-size: 12px;
        line-height: 1.4;
        color: rgb(46, 48, 48);
      }
    }
  }
}
</style>
