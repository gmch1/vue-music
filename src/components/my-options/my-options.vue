<template>
  <transition name="option">
    <div
      class="my-options"
      @click="handleCloseOptions"
      v-show="showOptions"
      @touchstart="touchStart"
      @touchmove="listenTouchMove"
    >
      <!-- 滤镜效果 -->
      <div class="blur"></div>
      <!-- 视图容器 -->
      <div class="options-wrapper" @click.stop ref="opts">
        <!-- 音乐包 没有相关接口，所以只是个摆设-->
        <!-- <music-package></music-package> -->
        <!-- 用户模块 -->
        <user-card :user="user"></user-card>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { touchmove } from "../../api/utils";
import UserCard from "../user-card/user-card";

export default {
  data() {
    return {
      pos: { start: 0 },
      user: {
        level: 10,
        listenSongs: 26560,
        userPoint: {
          userId: 32953014,
          balance: 895,
          updateTime: 1599918558374,
          version: 10,
          status: 1,
          blockBalance: 0
        },
        mobileSign: false,
        pcSign: false,
        profile: {
          avatarImgId: 109951165296429780,
          birthday: 768931200000,
          gender: 1,
          createTime: 1407747900967,
          djStatus: 0,
          province: 440000,
          accountStatus: 0,
          vipType: 11,
          followed: false,
          avatarUrl:
            "http://p1.music.126.net/6_VP5dKL4G6xGNRLYs19Sw==/109951165296429770.jpg",
          userType: 0,
          experts: {},
          expertTags: null,
          city: 440300,
          defaultAvatar: false,
          backgroundImgId: 109951163792144620,
          backgroundUrl:
            "http://p1.music.126.net/WLTBvNL_l9ZKlslFwaCM9Q==/109951163792144631.jpg",
          authStatus: 0,
          detailDescription: "",
          avatarImgIdStr: "109951165296429770",
          backgroundImgIdStr: "109951163792144631",
          description: "",
          userId: 32953014,
          mutual: false,
          remarkName: null,
          nickname: "binaryify",
          signature: "深圳市爱猫人士",
          authority: 0,
          followeds: 26,
          follows: 10,
          blacklist: false,
          eventCount: 20,
          allSubscribedCount: 0,
          playlistBeSubscribedCount: 4,
          avatarImgId_str: "109951165296429770",
          followTime: null,
          followMe: false,
          artistIdentity: [],
          cCount: 0,
          sDJPCount: 0,
          playlistCount: 17,
          sCount: 0,
          newFollows: 10
        },
        peopleCanSeeMyPlayRecord: false,
        bindings: [
          {
            expiresIn: 2147483647,
            refreshTime: 1592285666,
            bindingTime: 1426295169224,
            tokenJsonStr: null,
            expired: false,
            url: "",
            userId: 32953014,
            id: 28098251,
            type: 1
          },
          {
            expiresIn: 2628968,
            refreshTime: 1507142393,
            bindingTime: 1407747883151,
            tokenJsonStr: null,
            expired: true,
            url: "http://weibo.com/u/5144142752",
            userId: 32953014,
            id: 18574366,
            type: 2
          }
        ],
        adValid: false,
        code: 200,
        createTime: 1407747900967,
        createDays: 2225
      }
    };
  },
  computed: {
    ...mapState("user", {
      showOptions: state => state.showOptionState
    })
  },
  methods: {
    ...mapActions("user", ["closeOptionState"]),
    handleCloseOptions() {
      this.closeOptionState();
    },
    touchStart(e) {
      this.pos.start = e.touches[0].clientX;
    },

    listenTouchMove(e) {
      let newX = e.touches[0].pageX;
      // 方法抽离，与全局拖动效果公用
      touchmove(
        e,
        this.pos.start,
        this.closeOptionState,
        this.showOptions,
        "close"
      );
    }
  },
  components: {
    UserCard
  }
};
</script>

<style lang="scss" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
/* 没有完成预期效果，需要鼠标move同时修改动画的显示，这应该使用钩子函数解决 */
.option-enter-active {
  transition: all 0.2s ease;
}
.option-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.option-enter, .option-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-300px);
  opacity: 0;
}
.my-options {
  z-index: 999;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  .blur {
    height: 100vh;
    width: 100vw;
    filter: blur(1px);
    opacity: 0.2;
    background-color: rgb(104, 95, 95);
  }
  .options-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 15.5vw;
    background-color: #ffffff;
    width: 84.5vw;
    /* height: 100vw; */
  }
}
</style>
