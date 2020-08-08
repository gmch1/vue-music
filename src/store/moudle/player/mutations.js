import * as types from "./mutation-types";
import { findIndex } from "../../../api/utils";

const mutations = {
  [types.SET_CURRENT_SONG](state, payload) {
    state.currentSong = payload;
  },
  [types.SET_FULL_SCREEN](state, payload) {
    state.fullScreen = payload;
  },
  [types.SET_SEQUECE_PLAYLIST](state, payload) {
    state.sequencePlayList = payload;
  },
  [types.SET_PLAYLIST](state, payload) {
    state.playList = payload;
  },
  [types.SET_CURRENT_INDEX](state, payload) {
    state.currentIndex = payload;
  },
  [types.SET_SHOW_PLAYLIST](state, payload) {
    state.showPlayList = payload;
  },
  [types.SET_PLAY_MODE](state, payload) {
    state.mode = payload;
  },
  [types.SET_PLAYING_STATE](state, payload) {
    state.playing = payload;
  },
  [types.DELETE_SONG](state, song) {
    // 记住要做深拷贝
    const playList = JSON.parse(JSON.stringify(state.playList));
    const sequencePlayList = JSON.parse(JSON.stringify(state.sequencePlayList));
    let currentIndex = state.currentIndex;
    // 找出歌曲在对应播放列表的索引
    const fpIndex = findIndex(song, playList);
    // 在播放列表将其删除
    playList.splice(fpIndex, 1);
    // 如果删除项在正在播放项的前面，移动下标，让当前歌曲正常播放
    if (fpIndex < currentIndex) {
      currentIndex--;
    }
    // 在顺序播放列表直接删除即可
    const fsIndex = findIndex(song, sequencePlayList);
    sequencePlayList.splice(fsIndex, 1);
    state.playList = playList;
    state.sequencePlayList = sequencePlayList;
    state.currentIndex = currentIndex;
  }
};

export default mutations;
