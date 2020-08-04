<template>
  <div class="my-tab-wrapper">
    <div class="before"></div>
    <swiper class="swipper-wrapper" ref="mySwiper" :options="swiperOptions">
      <swiper-slide
        class="swipper-item"
        v-for="(item, index) in bannerList"
        :key="index"
      >
        <img :src="item.imageUrl" alt="" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        autoplay: true,
        freeMode: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
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
    top: 0;
    width: 100%;
    height: 60%;
    border-radius: 3px;
    background-color: #d44439;
  }
  .swipper-wrapper {
    position: relative;
    width: 98%;
    height: 160px;
    .swipper-item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
