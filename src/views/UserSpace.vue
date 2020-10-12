<template>
  <div class="user-space-wrapper" v-if="userinfo.code">
    <base-header :title="nickname"></base-header>
    <div
      class="user-background"
      ref="userBackground"
      :style="{ backgroundImage: `url(${userinfo.profile.backgroundUrl})` }"
    ></div>
    <div class="user-container-wrapper">
      <div class="user-info-wrapper">
        <img class="user-avator" :src="userinfo.profile.avatarUrl" />
        <div class="user-info">
          <span class="nickname">{{ userinfo.profile.nickname }}</span>
          <div class="following">
            <span class="focus">关注</span>
            |
            <span class="fens">粉丝</span>
          </div>
          <div class="topic">
            <span>
              <i class="iconfont"></i>
              音乐包
            </span>
            <span>
              <i class="iconfont"></i>
              95后
            </span>
            <span>
              <i class="iconfont"></i>
              9
            </span>
          </div>
        </div>
      </div>
      <div class="user-scroll-wrapper" ref="userScrollWrapper">
        <my-scroll
          class="my-scroll"
          :listenScroll="listenScroll"
          @scroll="handleScroll"
          :probeType="probeType"
        >
          <div class="inner-scroll">233</div>
        </my-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from "../baseUI/base-header/base-header";
import { mapState } from "vuex";
import MyScroll from "../components/my-scroll/my-scroll";

const HEADER_HEIGHT = 50;

export default {
  computed: {
    ...mapState("user", {
      uid: state => state.uid,
      user: state => state.user
    })
  },
  data() {
    return {
      userinfo: {},
      nickname: "",
      listenScroll: true,
      probeType: 3
    };
  },
  activated() {},
  mounted() {
    this._initFindUserInfo();
    this._initBgImageHeight();
  },
  methods: {
    _initBgImageHeight() {
      const parentNode = this.$refs.userBackground;
      console.log(parentNode);
    },
    _initScrollHeight() {
      // userScrollWrapper
    },
    // 首先判断路由上的用户id和uid是否一致，一致则直接使用当前用户信息，否则远程获取，更新userinfo信息
    _initFindUserInfo() {
      // 要进行这一步，就需要把uid存储到store中，用户的uid登录时，或者加载时就进行存储
      const findUserId = this.$route.params.uid;
      // 此处逻辑成立，即代表用户访问的是自己空间，即可以复用store中user的数据
      // 这里数据没有获取到，，，原因是store中数据异步获取，当前页面刷新会导致数据没有及时获取，正常使用刷新就会导致这种情况，应该加个全局loading效果
      // console.log(this.uid);
      // console.log(findUserId);
      if (this.uid === findUserId) {
        // 复用用户信息，进行数据填充
        this.userinfo = this.user;
        // 滑动时候动态修改
        // this.nickname = this.userinfo.profile.nickname;
      } else {
        // 发送请求，获取信息，进行渲染
      }
    },
    handleScroll(pos) {
      const y = pos.y;
      // console.log(y);
      const userScrollWrapper = this.$refs.userScrollWrapper;
      const offsetY = userScrollWrapper.getBoundingClientRect().y;
      if (y > 0) {
        console.log(y, "max");
      } else {
        console.log(y, "min");
      }
    }
  },

  components: {
    BaseHeader,
    MyScroll
  }
};
</script>

<style lang="scss" scoped>
.user-space-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  z-index: 100;
  overflow: hidden;
  background-color: #ccc;
  .user-background {
    opacity: 0.5;
    filter: blur(1px);
    padding-bottom: 70%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .user-container-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    .user-info-wrapper {
      padding: 10px;
      height: 50vw;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      /* background-color: #666; */
      .user-avator {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      .user-info {
        padding: 10px 0;
        flex: 1;
        /* background-color: pink; */
        color: #fff;
        .nickname {
          display: block;
          padding: 8px 0;
          font-size: 14px;
        }
        .following {
          display: flex;
          font-size: 12px;
          justify-content: space-between;
          width: 70px;
          color: #ccc;
          .focus {
          }
          .fens {
          }
        }
        .topic {
          height: 30px;
          line-height: 30px;
          width: 200px;
          font-size: 12px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          span {
            height: 17px;
            line-height: 17px;
            width: 5em;
            border-radius: 15px;
            background-color: #ccc;
            text-align: center;
          }
        }
      }
    }
    .user-scroll-wrapper {
      position: absolute;
      top: 0;
      width: 100%;
      overflow: hidden;
      background-color: red;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      .my-scroll {
        height: 100%;
        overflow: hidden;
        .inner-scroll {
          height: 2000px;
        }
      }
    }
  }
}
</style>
