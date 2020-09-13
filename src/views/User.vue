<template>
  <div class="user-wrapper">
    <user-login>
      <div class="login-page"></div>
    </user-login>
  </div>
</template>

<script>
import UserLogin from "../components/user-login/user-login";

export default {
  components: {
    UserLogin
  }
};
</script>

<style lang="scss" scoped>
.user-wrapper {
  z-index: 233;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
}
</style>
