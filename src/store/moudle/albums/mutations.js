import * as types from "./mutation-types";

const mutations = {
  [types.CHANGE_CURRENT_ALBUM](state, payload) {
    state.currentAlbum = payload;
  },
  [types.CHANGE_ENTER_LOADING](state, payload) {
    state.enterLoading = payload;
  }
};

export default mutations;
