<template>
  <div class="user-card">
    <div class="card-container">
      <div class="user-header">
        <div class="user">
          <img width="40" height="40" :src="user.profile.avatarUrl" alt />
          <div class="username">{{ user.profile.signature }}</div>
        </div>
        <div class="daily-signin">
          <span class="iconfont">&#xe60a;</span>
          签到
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
export default {
  props: {
    user: {
      type: Object,
      default: () => {}
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
        width: 70px;
        height: 25px;
        border-radius: 10px;
        background-color: #fe3b39;
        line-height: 25px;
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
