<template>
  <div class="my-player-wrapper">
    <!--       v-if="isEmptyObject(currentSong)" -->
    <mini-player
      :fullScreen="fullScreen"
      :playing="playing"
      :song="currentSong"
      :percent="percent"
      @changeFullScreen="changeFullScreen(true)"
      @changePlaying="changePlaying"
    ></mini-player>
    <normal-player
      :song="currentSong"
      :fullScreen="fullScreen"
      :playing="playing"
      :percent="percent"
      :duration="duration"
      :currentTime="currentTime"
      :mode="mode"
      @handle-changemode="changeMode"
      @handle-prev="handlePrev"
      @handle-next="handleNext"
      @percentChange="percentChange"
      @changePlaying="changePlaying"
      @changeFullScreen="changeFullScreen(false)"
    ></normal-player>
    <audio ref="audioRef" @timeupdate="updateTime" @ended="handleEnd"></audio>
  </div>
</template>

<script>
import MiniPlayer from "./mini-player";
import NormalPlayer from "./normal-player";
import {
  getSongUrl,
  isEmptyObject,
  getRandomInt,
  shuffle,
  findIndex
} from "../../api/utils";
import { mapState, mapActions, mapGetters } from "vuex";
import { playMode } from "../../api/config";

export default {
  props: {},
  components: {
    MiniPlayer,
    NormalPlayer
  },
  computed: {
    ...mapState("player", {
      fullScreen: state => state.fullScreen,
      playing: state => state.playing,
      sequencePlayList: state => state.sequencePlayList,
      playList: state => state.playList,
      mode: state => state.mode,
      currentIndex: state => state.currentIndex,
      showPlayList: state => state.showPlayList,
      currentSong: state => state.currentSong
    }),
    percent() {
      return this.currentTime / this.duration;
    }
  },
  methods: {
    handleEnd() {
      if (this.mode === playMode.loop) {
        this.handleLoop();
      } else {
        this.handleNext();
      }
    },
    //修改播放模式
    changeMode() {
      let newMode = (this.mode + 1) % 3;
      if (newMode === 0) {
        // 顺序模式
        this.changePlayList(this.sequencePlayList);
        let index = findIndex(this.currentSong, this.sequencePlayList);
        this.changeCurrentIndex(index);
      } else if (newMode === 1) {
        // 单曲循环
        this.changePlayList(this.sequencePlayList);
      } else if (newMode === 2) {
        // 随机播放
        let newList = shuffle(this.sequencePlayList);
        let index = findIndex(this.currentSong, newList);
        this.changePlayList(newList);
        this.changeCurrentIndex(index);
      }
      this.changePlayMode(newMode);
    },
    // 上一曲
    handlePrev() {
      // 播放列表只有一首歌曲，单曲循环
      if (this.playList.length === 1) {
        this.handleLoop();
        return;
      }
      let index = this.currentIndex - 1;
      if (index < 0) {
        index = this.playList.length - 1;
      }
      if (!this.playing) {
        this.changePlayingState(true);
      }
      this.changeCurrentIndex(index);
    },
    // 下一曲
    handleNext() {
      // 播放列表只有一首歌曲，单曲循环
      if (this.playList.length === 1) {
        this.handleLoop();
        return;
      }
      let index = this.currentIndex + 1;
      if (index === this.playList.length) {
        index = 0;
      }
      if (!this.playing) {
        this.changePlayingState(true);
      }
      this.changeCurrentIndex(index);
    },
    isEmptyObject(e) {
      return isEmptyObject(e);
    },
    // 单曲循环
    handleLoop() {
      this.$refs.audioRef.currentTime = 0;
      this.changePlayingState(true);
      this.$refs.audioRef.play();
    },
    ...mapActions("player", [
      "changeCurrentSong",
      "changeFullScreen",
      "changePlayingState",
      "changeSequencePlayList",
      "changePlayList",
      "changePlayMode",
      "changeCurrentIndex",
      "changeShowPlayList"
    ]),
    percentChange(e) {
      const newTime = e * this.duration;
      this.currentTime = newTime;
      this.$refs.audioRef.currentTime = newTime;
      if (!this.playing) {
        this.changePlayingState(true);
      }
    },
    changePlaying(e) {
      this.changePlayingState(e);
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    _initAudio() {
      if (!this.currentSong) return;
      this.changeCurrentIndex(0); // 默认为-1，初始化改为0
      let current = this.playList[0];
      this.changeCurrentSong(current); // 更改当前播放歌曲
      this.$refs.audioRef.src = getSongUrl(current.id);
      this.changePlayingState(true); // 修改播放状态
      this.currentTime = 0;
      this.duration = (current.dt / 1000) | 0; // 时长
    },
    _watchPlay() {
      if (
        !this.playList.length ||
        this.currentIndex === -1 ||
        !this.playList[this.currentIndex] ||
        this.playList[this.currentIndex].id === this.preSong.id
      ) {
        return;
      }
      let current = this.playList[this.currentIndex];
      this.changeCurrentSong(current);
      this.preSong = current;
      this.$refs.audioRef.src = getSongUrl(current.id);
      setTimeout(() => {
        this.$refs.audioRef.play();
      });
      this.changePlayingState(true);
      this.currentTime = 0;
      this.duration = (current.dt / 1000) | 0;
    }
  },
  watch: {
    playing(newVal) {
      // 播放暂停
      newVal ? this.$refs.audioRef.play() : this.$refs.audioRef.pause();
    },
    playList() {
      this._watchPlay();
    },
    currentIndex() {
      this._watchPlay();
    }
  },
  mounted() {
    this._initAudio();
    this.changeCurrentIndex(0);
  },
  data() {
    return {
      currentTime: 0,
      duration: 0,
      preSong: {}
    };
  }
};
</script>

<style lang="scss" scoped>
.my-player-wrapper {
}
</style>
