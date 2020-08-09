import * as types from "./mutation-types";

import {
  getHotKeyWordsRequest,
  getSuggestListRequest,
  getResultSongsListRequest
} from "../../../api/request";

export const changeHotKeyWords = ({ commit }, data) => {
  commit(types.SET_HOT_KEYWRODS, data);
};

export const changeSuggestList = ({ commit }, data) => {
  commit(types.SET_SUGGEST_LIST, data);
};

export const changeResultSongs = ({ commit }, data) => {
  commit(types.SET_RESULT_SONGS_LIST, data);
};

export const changeEnterLoading = ({ commit }, data) => {
  commit(types.SET_ENTER_LOADING, data);
};

// 获取关键词列表
export const getHotKeyWords = ({ dispatch }, data) => {
  getHotKeyWordsRequest().then(data => {
    let list = data.result.hots;
    dispatch("changeHotKeyWords", list);
  });
};

export const getSuggestList = ({ dispatch }, query) => {
  getSuggestListRequest(query).then(data => {
    if (!data) return;
    let res = data.result || [];
    dispatch("changeSuggestList", res);
  });
  getResultSongsListRequest(query).then(data => {
    if (!data) return;
    let res = data.result.songs || [];
    dispatch("changeResultSongs", res);
    dispatch("changeEnterLoading", false);
  });
};
