import { getRankListRequest } from "../../../api/request";
import { filterIndex } from "../../../api/utils";

// mutation-types
const types = {
  CHANGE_RANK_LIST: "home/rank/CHANGE_RANK_LIST",
  CHANGE_LOADING: "home/rank/CHANGE_LOADING"
};

const state = {
  // rank moudle
  rankList: [],
  loading: true //控制进场Loading
};

// actions

const changeRankList = ({ commit }, data) => {
  commit(types.CHANGE_RANK_LIST, data);
};

const changeLoading = ({ commit }, data) => {
  commit(types.CHANGE_LOADING, data);
};

export const getRankList = ({ dispatch }) => {
  getRankListRequest().then(data => {
    let list = data && data.list;
    dispatch("changeRankList", list);
    dispatch("changeLoading", false);
  });
};

const actions = {
  changeRankList,
  changeLoading,
  getRankList
};

// mutations
const mutations = {
  [types.CHANGE_RANK_LIST](state, payload) {
    state.rankList = payload;
  },
  [types.CHANGE_LOADING](state, payload) {
    state.loading = payload;
  }
};

// getters
const getters = {
  globalStartIndex: (state, getters) => {
    return filterIndex(state.rankList);
  },
  officialList: (state, getters) => {
    return state.rankList.slice(0, getters.globalStartIndex);
  },
  globalList: (state, getters) => {
    return state.rankList.slice(getters.globalStartIndex);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
