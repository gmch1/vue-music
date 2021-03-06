import * as types from "./mutation-types";

const mutations = {
  [types.CHANGE_BANNER](state, payload) {
    state.bannerList = payload;
  },
  [types.CHANGE_RECOMMEND_LIST](state, payload) {
    state.recommendList = payload;
  },
  [types.CHANGE_ENTER_LOADING](state) {
    state.enterLoading = !state.enterLoading;
  }
};

export default mutations;
