<template>
  <div class="app-wrapper">
    <!-- <my-home v-if="showpage"></my-home> -->
    <div class="img-wrapper">
      <h2>当前网站已迁移，请进入新链接访问</h2>
      <a class="link" href="http://81.69.9.242:8888/#/recommend">传送门</a>
      <img class="img-phone" src="./assets/image/use_phone.png" alt="" />
    </div>
  </div>
</template>

<script>
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
  }
};
</script>

<style lang="scss" scoped>
.img-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .link {
    margin: 10px;
    color: #000;
    font-size: 22px;
  }
}
.img-phone {
}
</style>
