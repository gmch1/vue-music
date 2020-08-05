import * as types from "./mutation-types";

const mutations = {
  [types.CHANGE_SINGER_LIST](state, payload) {
    state.singerList = payload;
  },

  [types.CHANGE_PAGE_COUNT](state, payload) {
    state.pageCount = payload;
  },

  [types.CHANGE_PULLUP_LOADING](state, payload) {
    state.pullUpLoading = payload;
  },
  [types.CHANGE_PULLDOWN_LOADING](state, payload) {
    state.pullDownLoading = payload;
  },
  [types.CHANGE_ENTER_LOADING](state) {
    state.enterLoading = !state.enterLoading;
  }
};

export default mutations;
