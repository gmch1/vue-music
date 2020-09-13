<template>
  <div class="login-wrapper-pass" @touchstart.stop @touchmove.stop>
    <div class="login-header">
      <div class="left-goback" @click="$emit('goback')">
        <span class="iconfont">&#xe602;</span>
      </div>
      <span class="phone">手机号登录</span>
    </div>
    <div class="login-input-wrapper">
      <input
        type="text"
        class="input-login"
        placeholder="请输入密码"
        v-model="password"
      />
      <div class="forget-password">忘记密码？</div>
    </div>
    <div class="button-wrapper" @click="handleSubmitPass">
      <span class="next">登录</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "13572157391"
    };
  },
  methods: {
    handleSubmitPass() {
      if (!this.password) return;
      this.$emit("enter-password", this.password);
    }
  }
};
</script>

<style lang="scss" scoped>
.login-wrapper-pass {
  position: fixed;
  padding: 0 10px;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  .login-header {
    display: flex;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    font-weight: 500;
    .left-goback {
      margin-right: 25px;
    }
  }
  .login-input-wrapper {
    position: absolute;
    left: 50%;
    top: 70px;
    transform: translateX(-50%);
    width: 90vw;
    top: 70px;
    background-color: red;
    height: 24px;
    .input-login {
      position: relative;
      border: none;
      box-sizing: border-box;
      width: 100%;
      border-bottom: 1px solid #ccc;
      font-size: 14px;
      padding: 0 13px;
      height: 24px;
      line-height: 24px;
      &:focus {
        outline: none;
      }
    }
    .forget-password {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 11px;
      height: 24px;
      line-height: 24px;
      color: rgb(148, 138, 138);
    }
  }
  .button-wrapper {
    position: fixed;
    top: 110px;
    left: 50%;
    transform: translateX(-50%);
    width: 90vw;
    height: 35px;
    background-color: #d43c33;
    color: #fff;
    font-weight: 200;
    letter-spacing: 1px;
    text-align: center;
    line-height: 35px;
    border-radius: 25px;
  }
}
</style>
