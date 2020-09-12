import * as types from "./mutation-types";

const mutations = {
  [types.SHOW_OPTIONS_STATE](state) {
    state.showOptionState = true;
  },
  [types.CLOSE_OPTIONS_STATE](state) {
    state.showOptionState = false;
  }
};

export default mutations;
