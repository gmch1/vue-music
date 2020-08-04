<template>
  <div class="my-tab-wrapper">
    <swiper class="swipper-wrapper" ref="mySwiper" :options="swiperOptions">
      <swiper-slide
        class="swipper-item"
        v-for="(item, index) in bannerList"
        :key="index"
      >
        <img :src="item.imageUrl" alt="" />
      </swiper-slide>

      <!-- <div class="swiper-pagination" slot="pagination"></div> -->

      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        speed: 300,
        loop: true,
        autoplay: true, //等同于以下设置
        // Some Swiper option/callback...
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      },
      bannerList: [1, 2, 3, 4].map(() => {
        return {
          imageUrl:
            "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg"
        };
      })
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  mounted() {
    this.swiper.slideTo(0, 3000, false);
  }
};
</script>

<style scoped lang="scss">
.my-tab-wrapper {
  position: relative;
  .swipper-wrapper {
    .swipper-item {
      img {
        width: 100%;
      }
    }
  }
}
</style>
