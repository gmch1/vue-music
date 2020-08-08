<template>
  <div class="my-player-wrapper" v-if="!isEmptyObject(currentSong)">
    <mini-player
      :fullScreen="fullScreen"
      :playing="playing"
      :song="currentSong"
      :percent="percent"
      @changeFullScreen="changeFullScreen(true)"
      @changePlaying="changePlaying"
      @togglePlayList="changeShowPlayList(true)"
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
      @toggle-play-list="changeShowPlayList(true)"
    ></normal-player>
    <play-list
      @handle-changemode="changeMode"
      :showPlayList="showPlayList"
      @toggle-close-playlist="changeShowPlayList(false)"
    ></play-list>
    <audio
      ref="audioRef"
      @timeupdate="updateTime"
      @error="error"
      @ended="handleEnd"
    ></audio>
  </div>
</template>

<script>
// 快速切歌这里没有做，如果需要做个节流就可以了
// 歌词模块未完成
import MiniPlayer from "./mini-player";
import NormalPlayer from "./normal-player";
import { getLyricRequest } from "../../api/request";
import Lyric from "../../api/lyric-parser";

import {
  getSongUrl,
  isEmptyObject,
  getRandomInt,
  shuffle,
  findIndex
} from "../../api/utils";
import { mapState, mapActions, mapGetters } from "vuex";
import { playMode } from "../../api/config";
import PlayList from "../../baseUI/play-list/play-list";

export default {
  props: {},
  components: {
    MiniPlayer,
    NormalPlayer,
    PlayList
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
    error(e) {
      console.log(e);
    },
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
    getLyric(id) {
      let lyric = "";
      getLyricRequest(id)
        .then(data => {
          console.log(data);
          lyric = data.lrc.lyric;
          if (!lyric) {
            this.currentLyric.current = null;
            return;
          }
        })
        .catch(e => {
          console.log(e);
          this.$refs.audioRef.play();
        });
    },
    _initAudio() {
      // console.log(this.currentSong);
      if (this.playList.length === 0) {
        return;
      }
      this.changeCurrentIndex(0); // 默认为-1，初始化改为0
      let current = this.playList[0];
      this.changeCurrentSong(current); // 更改当前播放歌曲
      // console.log(current);
      // console.log(this.$refs.audioRef.src);
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
      this.getLyric(current.id);
      this.changeCurrentSong(current);
      this.preSong = current;
      setTimeout(() => {
        // console.log(this.$refs.audioRef);
        this.$refs.audioRef.src = getSongUrl(current.id);
        this.$refs.audioRef.play();
      }, 20);
      setTimeout(() => {}, 20);
      this.changePlayingState(true);
      this.currentTime = 0;
      this.duration = (current.dt / 1000) | 0;
    }
  },
  watch: {
    playing(newVal, oldVal) {
      // 播放暂停

      if (this.$refs.audioRef) {
        newVal ? this.$refs.audioRef.play() : this.$refs.audioRef.pause();
      }
    },
    playList(newVal) {
      newVal.length !== 0 && this._watchPlay();
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
      preSong: {},
      currentLyric: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.my-player-wrapper {
}
</style>
