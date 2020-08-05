import * as types from "./mutation-types";
import {
  getHotSingerListRequest,
  getSingerListRequest
} from "../../../api/request";

export const changePageCount = ({ commit }, data) => {
  commit(types.CHANGE_PAGE_COUNT, data);
};

export const changeSingerList = ({ commit }, data) => {
  commit(types.CHANGE_SINGER_LIST, data);
};

export const changeEnterLoading = ({ commit }, data) => {
  // console.log(data);
  commit(types.CHANGE_ENTER_LOADING, data);
};

export const changePullUpLoading = ({ commit }, data) => {
  commit(types.CHANGE_PULLUP_LOADING, data);
};

export const changePullDownLoading = ({ commit }, data) => {
  commit(types.CHANGE_PULLDOWN_LOADING, data);
};

//第一次加载热门歌手
export const getHotSingerList = ({ dispatch }) => {
  getHotSingerListRequest(0)
    .then(res => {
      const data = res.artists;
      dispatch("changeSingerList", data);
      dispatch("changeEnterLoading", false);
      dispatch("changePullDownLoading", false);
    })
    .catch(e => {
      console.log(e, "热门歌手数据加载失败");
    });
};

// 加载更多热门歌手
export const refreshMoreHotSingerList = ({ dispatch, state }) => {
  const pageCount = state.pageCount;
  const singerList = state.singerList;
  getHotSingerListRequest(pageCount)
    .then(res => {
      const data = [...singerList, ...res.artists];
      dispatch("changeSingerList", data);
      dispatch("changePullUpLoading", false);
    })
    .catch(e => {
      console.log(e, "热门歌手数据加载失败");
    });
};

// 第一次加载对应类别的歌手
export const getSingerList = ({ dispatch, state }, ...res) => {
  let { category, alpha } = res[0];
  if (!category) category = "-1,-1";
  if (!alpha) alpha = "0";

  getSingerListRequest(category, alpha, 0)
    .then(res => {
      const data = res.artists;
      dispatch("changeSingerList", data);
      dispatch("changeEnterLoading", false);
      dispatch("changePullDownLoading", false);
    })
    .catch(e => {
      console.log(e, "歌手数据加载失败");
    });
};

// 加载更多歌手
export const refreshMoreSingerList = ({ dispatch, state }, ...res) => {
  let { category, alpha } = res[0];
  if (!category) category = "-1,-1";
  if (!alpha) alpha = "0";
  const pageCount = state.pageCount;
  const singerList = state.singerList;
  getSingerListRequest(category, alpha, pageCount)
    .then(res => {
      const data = [...singerList, ...res.artists];
      // console.log(res);
      dispatch("changeSingerList", data);
      dispatch("changePullDownLoading", false);
    })
    .catch(e => {
      console.log(e, "歌手数据加载失败");
    });
};
