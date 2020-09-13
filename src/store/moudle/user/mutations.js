import * as types from "./mutation-types";

const mutations = {
  [types.SHOW_OPTIONS_STATE](state) {
    state.showOptionState = true;
  },
  [types.CLOSE_OPTIONS_STATE](state) {
    state.showOptionState = false;
  },
  [types.CHANGE_USER_STATE](state, data) {
    state.user = data;
  }
};

export default mutations;
