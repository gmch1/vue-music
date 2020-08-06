<template>
  <div id="app">
    <my-header></my-header>
    <!-- keepalive 会导致路由匹配错误，暂时不使用 -->
    <router-view />
  </div>
</template>

<script>
import MyHeader from "./components/my-header/my-header";

export default {
  components: {
    MyHeader
  }
};
</script>
<style>
/* #app{
  height: 100vh;
} */
</style>
