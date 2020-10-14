<template>
  <div class="app-wrapper">
    <my-home v-if="showpage"></my-home>
    <div class="img-wrapper" v-if="!showpage">
      <h2>请使用手机扫码打开，或开启开发者选项，切换至手机预览</h2>
      <img class="img-phone" src="./assets/image/use_phone.png" alt="" />
    </div>
  </div>
</template>

<script>
import MyHome from "./views/Home";

export default {
  computed: {
    showpage() {
      // return window.navigator.userAgent;
      let flag = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(
        navigator.userAgent
      );
      console.log(navigator.userAgent);
      return flag;
    }
  },
  components: {
    MyHome
  }
};
</script>

<style scoped>
.img-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-phone {
}
</style>
