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
      const data = { ...singerList, ...res.artists };
      dispatch("changeSingerList", data);
      dispatch("changePullDownLoading", false);
    })
    .catch(e => {
      console.log(e, "热门歌手数据加载失败");
    });
};

// 第一次加载对应类别的歌手
export const getSingerList = ({ dispatch, state }, ...res) => {
  const { category = "-1,-1", alpha = "0" } = res[0];
  console.log(category, alpha);
  getSingerListRequest(category, alpha, 0)
    .then(res => {
      const data = res.artists;
      console.log(res);
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
  const { category, alpha } = res[0];
  const pageCount = state.pageCount;
  const singerList = state.singerList;
  getSingerListRequest(category, alpha, pageCount)
    .then(res => {
      const data = [...singerList, ...res.artists];
      console.log(res);
      dispatch("changeSingerList", data);
      dispatch("changePullDownLoading", false);
    })
    .catch(e => {
      console.log(e, "歌手数据加载失败");
    });
};
