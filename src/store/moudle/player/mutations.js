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
  },
  [types.INSERT_SONG](state, song) {
    const playList = JSON.parse(JSON.stringify(state.playList));
    const sequencePlayList = JSON.parse(JSON.stringify(state.sequencePlayList));
    let currentIndex = state.currentIndex;
    let fpIndex = findIndex(song, playList);
    // 如果是当前歌曲直接不处理
    if (fpIndex === currentIndex && currentIndex !== -1) return;
    // currentIndex++; //0
    // 把歌放进去，放到当前播放曲目的下一个位置
    playList.splice(currentIndex, 0, song);
    // 如果列表中已经存在要添加的歌，暂且称它 oldSong
    if (fpIndex > -1) {
      // 如果 oldSong 的索引在目前播放歌曲的索引小，那么删除它，同时当前 index 要减一
      if (currentIndex > fpIndex) {
        playList.splice(fpIndex, 1);
        currentIndex--;
      } else {
        // 否则直接删掉 oldSong
        playList.splice(fpIndex + 1, 1);
      }
    }
    // 同
    console.log(playList);
    console.log(currentIndex);
    let sequenceIndex = findIndex(playList[currentIndex], sequencePlayList) + 1;
    let fsIndex = findIndex(song, sequencePlayList);
    // 插入歌曲
    sequencePlayList.splice(sequenceIndex, 0, song);
    if (fsIndex > -1) {
      // 跟上面类似的逻辑。如果在前面就删掉，index--; 如果在后面就直接删除
      if (sequenceIndex > fsIndex) {
        sequencePlayList.splice(fsIndex, 1);
        sequenceIndex--;
      } else {
        sequencePlayList.splice(fsIndex + 1, 1);
      }
    }
    state.playList = playList;
    state.sequencePlayList = sequencePlayList;
    state.currentIndex = currentIndex;
  }
};

export default mutations;
