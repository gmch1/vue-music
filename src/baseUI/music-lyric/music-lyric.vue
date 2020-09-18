<template>
  <div class="music-lyric"></div>
</template>

<script>
export default {
  props: {
    lrc: {
      type: Array,
      default: () => []
    }
  },
  activated() {
    console.log(this.lrc);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.music-lyric {
}
</style>
