<template>
  <div class="login-wrapper">
    <div class="login-header">
      <div class="left-goback">
        <span class="iconfont">&#xe602;</span>
      </div>
      <span class="phone">手机号登录</span>
    </div>
    <div class="login-input-wrapper">
      <input type="text" class="input-login" placeholder="请输入密码" />
      <div class="forget-password">忘记密码？</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.login-wrapper {
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
    /* width: 100vw; */

    top: 70px;
    .input-login {
      position: relative;
      border: none;
      width: ceil(100vw-5);
      border-bottom: 1px solid #ccc;
      font-size: 18px;
      &:focus {
        outline: none;
      }
    }
    .forget-password {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 11px;
      color: rgb(148, 138, 138);
    }
  }
}
</style>
