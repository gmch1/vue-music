<template>
  <div id="app">
    <my-header></my-header>
    <!-- keepalive 会导致路由匹配错误，暂时不使用 -->
    <router-view />
    <my-player></my-player>
  </div>
</template>

<script>
import MyHeader from "./components/my-header/my-header";
import MyPlayer from "./views/Player/my-player";

export default {
  components: {
    MyHeader,
    MyPlayer
  }
};
</script>
<style>
/* #app{
  height: 100vh;
} */
</style>
