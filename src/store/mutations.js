import * as types from "./action-types";

const mutations = {
  [types.CHANGE_BANNER](state, payload) {
    state.bannerList = payload;
  },
  [types.CHANGE_RECOMMEND_LIST](state, payload) {
    state.recommendList = payload;
  }
};

export default mutations;
