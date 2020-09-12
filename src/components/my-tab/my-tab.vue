<template>
  <div class="my-tab-wrapper" @touchmove.stop>
    <div class="before"></div>
    <swiper class="swipper-wrapper" ref="mySwiper" :options="swiperOptions">
      <swiper-slide
        class="swipper-item"
        v-for="(item, index) in bannerList"
        :key="index"
      >
        <img :src="item.imageUrl" alt />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    bannerList: {
      type: Array
    }
  },
  data() {
    return {
      swiperOptions: {
        autoplay: true,
        freeMode: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  mounted() {
    this.swiper.slideTo(0, 300, false);
  }
};
</script>

<style lang="scss">
.my-tab-wrapper {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: white;
  .before {
    position: absolute;
    top: -300px;
    height: 400px;
    width: 100%;
    border-radius: 3px;
    background-color: #d44439;
  }
  .swipper-wrapper {
    position: relative;
    width: 98%;
    height: 160px;
    border-radius: 5px;
    .swipper-item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
