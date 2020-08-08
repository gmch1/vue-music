import * as types from "./mutation-types";

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
  }
};

export default mutations;
