<template>
  <div class="my-header-wrapper">
    <div class="header-top">
      <div class="left">
        <i class="iconfont">&#xe65c;</i>
      </div>
      <div class="content">
        网抑云
      </div>
      <div class="right" @click="$router.push('search')">
        <i class="iconfont"> &#xe62b;</i>
      </div>
    </div>
    <div class="header-bottom">
      <router-link class="header-router select" to="/recommend"
        >推荐</router-link
      >
      <router-link class="header-router" to="/singers">歌手</router-link>
      <router-link class="header-router" to="/rank">排行榜</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.my-header-wrapper {
  height: 94px;
  .header-top {
    height: 50px;
    padding: 5px 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    background-color: #d44439;

    justify-content: space-between;
    font-size: 20px;
    color: #fff;
    div {
      height: 40px;
      line-height: 40px;
    }
    .iconfont {
      font-size: 25px;
    }
  }
  .header-bottom {
    box-sizing: border-box;
    padding: 2px 0;
    height: 44px;
    background-color: #d44439;
    display: flex;
    justify-content: space-around;
    line-height: 44px;
    .header-router {
      /* box-sizing: border-box; */
      font-size: 14px;
      color: #e4e4e4;
      &.router-link-active {
        /* padding: 2px 0; */
        font-weight: 700;
        color: #f1f1f1;
        border-bottom: 2px solid #f1f1f1;
      }
    }
  }
}
</style>
