<template>
  <div class="search-box">
    <i class="iconfont icon-back" @click="goback">&#xe655;</i>
    <input
      ref="queryRef"
      class="box"
      placeholder="搜索歌曲、歌手、专辑"
      v-model="query"
    />
    <i class="iconfont icon-delete" @click="clearQuery" v-show="query"
      >&#xe600;</i
    >
  </div>
</template>

<script>
export default {
  props: {
    handleQuery: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      query: "",
      timer: null,
      newQuery: ""
    };
  },
  methods: {
    goback() {
      this.$emit("back");
    },
    clearQuery() {}
  },
  watch: {
    query(newVal, oldVal) {
      if (oldVal === newVal) return;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.$emit("input-change", this.query);
      }, 700);
    },
    newQuery(newVal, oldVal) {
      if (newVal !== this.query) {
        this.query = newVal;
      }
    }
  },
  mounted() {
    this.$refs.queryRef.focus();
  }
};
</script>

<style lang="scss" scoped>
.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  padding-right: 20px;
  height: 40px;
  background: #d44439;
  .icon-back {
    font-size: 24px;
    color: #f1f1f1;
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: #d44439;
    color: #fff;
    font-size: 14px;
    outline: none;
    border: none;
    border-bottom: 1px solid #e4e4e4;
    &::placeholder {
      color: #f1f1f1;
    }
  }
  .icon-delete {
    font-size: 16px;
    color: #f2f3f4;
  }
}
</style>
