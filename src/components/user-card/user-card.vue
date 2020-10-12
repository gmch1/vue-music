<template>
  <div class="user-card">
    <div class="card-container">
      <div class="should-login" v-if="!user.code">
        <span class="desc">手机电脑多端同步，尽享海量高品质音乐</span>
        <div class="login" @click="handleLogin">
          <span>立即登录</span>
        </div>
      </div>
      <div class="user-header" v-if="user.code">
        <div class="user" @click="handleRouterChange">
          <img width="40" height="40" :src="user.profile.avatarUrl" alt />
          <div class="username">{{ user.profile.nickname }}</div>
        </div>
        <div class="daily-signin" @click="dailySignin">
          <span class="iconfont">&#xe60a;</span>
          <span>签到</span>
        </div>
      </div>
      <div class="user-option">
        <ul class="option-list">
          <li class="option-item">
            <span class="iconfont">&#xe6ad;</span>
            <span class="text">我的消息</span>
          </li>
          <li class="option-item">
            <span class="iconfont">&#xe619;</span>
            <span class="text">我的好友</span>
          </li>
          <li class="option-item">
            <span class="iconfont">&#xe61c;</span>
            <span class="text">个人主页</span>
          </li>
          <li class="option-item">
            <span class="iconfont">&#xe64d;</span>
            <span class="text">个性装扮</span>
          </li>
        </ul>
      </div>
      <div class="other-options">
        <ul class="options-list">
          <li
            class="list-item"
            v-for="(item, index) in [1, 2, 2, 2, 2, 2, 2, 2, 2]"
            :key="index"
          >
            <div class="title">
              <div class="left">
                <span class="iconfont">&#xe644;</span>
              </div>
              <div class="center">听歌识曲</div>
            </div>
            <div class="right"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { reqDailySignin } from "../../api/request";
import { mapState } from "vuex";

export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState("user", { uid: state => state.uid })
  },
  methods: {
    handleLogin() {
      this.$emit("close");
      this.$router.push("user");
    },
    handleRouterChange() {
      // 关闭掉侧边栏
      this.$emit("close");
      this.$router.push(`/userspace/${this.uid}`);
    },
    dailySignin() {
      reqDailySignin().then(res => {
        const { code } = res;
        // 这部分逻辑由于请求缓存，所以不正常，忽略即可
        if (code === 200) {
          console.log("签到成功");
        } else {
          console.log("重复签到");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-card {
  width: 100%;
  height: 100%;
  .card-container {
    padding: 0 25px;
    .should-login {
      height: 80px;
      width: 100%;
      padding-top: 10px;

      .desc {
        display: block;
        font-size: 10px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #000;
        font-weight: 100;
      }
      .login {
        font-size: 13px;
        text-align: center;
        line-height: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          display: block;
          width: 6em;
          height: 23px;
          line-height: 23px;
          border-radius: 15px;
          background-color: #fe3b39;
          color: #fff;
          font-weight: 100;
        }
      }
    }
    .user-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      padding: 0 3px;

      .user {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 140px;
        height: 50px;
        flex: 0 1 auto;
        font-size: 13px;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .username {
          flex: 0 1 auto;
        }
      }
      .daily-signin {
        width: 55px;
        height: 20px;
        border-radius: 10px;
        background-color: #fe3b39;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        color: #ffffff;
        span {
          font-size: 11px;
        }
      }
    }
    .user-option {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #e6e6e6;

      /* background-color: skyblue; */
      .option-list {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .option-item {
          height: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          color: #000;
          .iconfont {
            font-size: 22px;
          }
          .text {
            font-size: 13px;
          }
        }
      }
    }
    .other-options {
      height: 100%;
      .options-list {
        .list-item {
          display: flex;
          justify-content: space-between;
          height: 50px;
          line-height: 50px;
          color: #cccccc;
          .title {
            display: flex;
            .left {
              .iconfont {
                font-size: 25px;
              }
            }
            .center {
              margin-left: 12px;
            }
          }
          .right {
            width: 40xp;
          }
        }
      }
    }
  }
}
</style>
