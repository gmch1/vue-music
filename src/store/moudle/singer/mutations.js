import * as types from "./mutation-types";

const mutations = {
  [types.CHANGE_ARTIST](state, payload) {
    state.artist = payload;
  },
  [types.CHANGE_SONGS_OF_ARTIST](state, payload) {
    state.songsOfArtist = payload;
  },
  [types.CHANGE_ENTER_LOADING](state, payload) {
    state.loading = payload;
  }
};

export default mutations;
