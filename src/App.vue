<template>
  <div id="app">
    <my-header></my-header>

    <keep-alive>
      <router-view />
    </keep-alive>
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
