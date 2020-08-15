<template>
  <div class="rank-wrapper">
    <my-scroll class="rank-scroll">
      <div>
        <h1 class="offical">官方榜</h1>
        <ul class="rank-list">
          <li
            class="rank-item"
            v-for="(item, index) in officialList"
            :key="index"
            @click="handleRouterClick(item.id)"
          >
            <div class="img-wrapper">
              <img :src="item.coverImgUrl" alt="" />
              <div class="decorate"></div>
              <span class="update-frequecy">
                {{ item.updateFrequency }}
              </span>
            </div>
            <ul class="song-list" v-if="item.tracks.length">
              <li
                class="song-item"
                v-for="(item, index) in item.tracks"
                :key="index"
              >
                {{ index + 1 }}.{{ item.first }}-{{ item.second }}
              </li>
            </ul>
          </li>
        </ul>
        <h1 class="global">全球榜</h1>
        <ul class="rank-list">
          <li
            class="rank-item"
            v-for="(item, index) in globalList"
            :key="index"
            @click="handleRouterClick(item.id)"
          >
            <div class="img-wrapper img-bigger">
              <img :src="item.coverImgUrl" alt="" />
              <div class="decorate"></div>
              <span class="update-frequecy">
                {{ item.updateFrequency }}
              </span>
            </div>
            <ul class="song-list" v-if="item.tracks.length">
              <li
                class="song-item"
                v-for="(item, index) in item.tracks"
                :key="index"
              >
                {{ index + 1 }}.{{ item.first }}-{{ item.second }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </my-scroll>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions, mapGetters } from "vuex";
import MyScroll from "../components/my-scroll/my-scroll";

export default {
  name: "rank",
  components: { MyScroll },
  computed: {
    ...mapState("rank", {
      rankList: state => state.rankList,
      loading: state => state.loading
    }),
    ...mapGetters("rank", ["globalStartIndex", "officialList", "globalList"])
  },
  methods: {
    ...mapActions("rank", ["changeRankList", "changeLoading", "getRankList"]),
    getRankListDataDispatch() {
      this.getRankList();
    },
    handleRouterClick(id) {
      // console.log(id);
      this.$router.push(`/recommend/${id}`);

      // this.$router.replace({ name: "recommend1", params: { id } });
      // console.log(this.$router.history);
    }
  },
  mounted() {
    this.getRankListDataDispatch();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/base.scss";

.rank-wrapper {
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
  .rank-scroll {
    height: 100%;
    overflow: hidden;
  }
  .offical,
  .global {
    margin: 10px 5px;
    padding-top: 15px;
    font-weight: 700;
    font-size: $font-size-m;
    color: rgb(46, 48, 48);
  }
  .rank-list {
    margin-top: 10px;
    padding: 0 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    background: $background-color;
    &::after {
      content: "";
      display: block;
      width: 32vw;
    }
    .rank-item {
      /* display: ${props => props.tracks.length ? "flex": ""}; */
      display: flex;
      padding: 3px 0;
      /* border-bottom: 1px solid ${style ["border-color"]}; */
      border-bottom: 1px solid rgb(228, 228, 228);

      .img-wrapper {
        /* width:  ${props => props.tracks.length ? "27vw": "32vw"}; */
        /* height: ${props => props.tracks.length ? "27vw": "32vw"}; */
        width: 27vw;
        height: 27vw;
        border-radius: 3px;
        position: relative;
        .decorate {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 35px;
          border-radius: 3px;
          background: linear-gradient
            (hsla (0, 0%, 100%, 0), hsla (0, 0%, 43%, 0.4));
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }
        .update-frequecy {
          position: absolute;
          left: 7px;
          bottom: 7px;
          font-size: $font-size-ss;
          color: rgb(241, 241, 241);
        }
      }
      .img-bigger {
        width: 32vw;
        height: 32vw;
      }
      .song-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 10px 10px;

        .song-item {
          font-size: $font-size-s;
          color: grey;
        }
      }
    }
  }
}
</style>
