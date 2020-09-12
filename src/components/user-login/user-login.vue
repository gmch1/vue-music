<template>
  <div class="user-login">
    <img class="logo" src="logo.png" alt />
    <div class="form-login">
      <div class="login-button" @click="handleLoginWithPhone">手机号登录</div>
      <div class="login-button">立即体验</div>
      <!-- 第三方登录 -->
      <div class="other-options">
        <span class="iconfont">&#xe614;</span>
        <span class="iconfont">&#xe6e3;</span>
        <span class="iconfont">&#xe643;</span>
        <span class="iconfont">&#xe69d;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleLoginWithPhone() {
      this.$router.push("login");
    }
  }
};
</script>

<style lang="scss" scoped>
.user-login {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #dc2c1f;
  .logo {
    position: fixed;
    left: 50%;
    top: 25%;
    width: 100px;
    transform: translateX(-50%);
  }
  .form-login {
    position: fixed;
    left: 50%;
    bottom: 15%;
    width: 300px;
    transform: translateX(-50%);
    .login-button {
      margin: 15px 0;
      text-align: center;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      letter-spacing: 2px;
      border-radius: 25px;

      &:nth-child(1) {
        background-color: #fff;
        color: #dc2c1f;
      }
      &:nth-child(2) {
        position: relative;
        background-color: #dc2c1f;
        color: #fff;
      }
    }
    .login-button:nth-child(2)::after {
      display: block;
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200%;
      height: 200%;
      border: 1px solid #ccc;
      border-radius: 50px;
      transform: translate(-50%, -50%) scale(0.5, 0.5);
    }
    .other-options {
      display: flex;
      padding: 0 20px;
      color: #ffffff;
      justify-content: space-between;
      .iconfont {
        position: relative;
        font-size: 20px;
        width: 25px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        /* border: 1px solid #ccc; */
        border-radius: 50%;
      }
      .iconfont::after {
        display: block;
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200%;
        height: 200%;
        border: 1px solid #ccc;
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0.5, 0.5);
      }
    }
  }
}
</style>
