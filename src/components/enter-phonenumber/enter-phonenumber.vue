<template>
  <div class="login-wrapper-phone" @touchstart.stop @touchmove.stop>
    <div class="login-header">
      <div class="left-goback" @click="goback">
        <span class="iconfont">&#xe602;</span>
      </div>
      <span class="phone">手机号登录</span>
    </div>
    <div class="login-input-wrapper">
      <input
        type="text"
        class="input-login"
        placeholder="请输入手机号"
        v-model="phone"
      />
      <div class="forget-password iconfont">&#xe6f1;</div>
    </div>
    <div class="button-wrapper" @click.stop="handleSubmitPhone">
      <span class="next">下一步</span>
    </div>
    <div class="phone-check" v-if="err">
      <span>{{ errorText }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "13572157391",
      err: false,
      errorText: ""
    };
  },
  methods: {
    handleSubmitPhone() {
      if (!this.phone) {
        this.errorBound("请输入手机号");
        return;
      }
      if (!this.checkPhoneNumber()) {
        this.errorBound("手机格式错误");
        return;
      }
      this.$emit("enter-phonenumber", this.phone);
    },
    errorBound(text) {
      this.errorText = text;
      this.err = true;
      setTimeout(() => {
        this.err = false;
        this.phone = "";
      }, 300);
    },
    checkPhoneNumber() {
      return /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/.test(
        this.phone
      );
    },
    goback() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.login-wrapper-phone {
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
  .phone-check {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 233;
    font-size: 14px;

    span {
      position: absolute;
      left: 50%;
      bottom: 25%;
      height: 35px;
      line-height: 35px;
      width: 8em;
      background-color: #ffffff;
      border-radius: 25px;
      transform: translateX(-50%);
      text-align: center;
      /* filter: blur(20px); */
      box-shadow: 0 8px 6px 0 rgba(0, 0, 0, 0.2),
        0 6px 8px 0 rgba(0, 0, 0, 0.19);
      opacity: 0.3;
    }
  }
}
</style>
