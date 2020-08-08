import * as types from "./mutation-types";

const mutations = {
  [types.SET_HOT_KEYWRODS](state, payload) {
    state.hotList = payload;
  },
  [types.SET_SUGGEST_LIST](state, payload) {
    state.suggestList = payload;
  },
  [types.SET_RESULT_SONGS_LIST](state, payload) {
    state.songsList = payload;
  },
  [types.SET_ENTER_LOADING](state, payload) {
    state.enterLoading = payload;
  }
};

export default mutations;
