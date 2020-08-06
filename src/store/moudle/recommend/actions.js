import * as types from "./action-types";
import {
  getBannerRequest,
  getRecommendListRequest
} from "../../../api/request";

export const changeBannerList = ({ commit }, banners) => {
  commit(types.CHANGE_BANNER, banners);
};

export const changeRecommendList = ({ commit }, data) => {
  commit(types.CHANGE_RECOMMEND_LIST, data);
};

// 获取轮播图数据
export const getBannerList = ({ dispatch }) => {
  getBannerRequest()
    .then(data => {
      dispatch("changeBannerList", data.banners);
    })
    .catch(e => {
      console.log(e);
      console.log("轮播图数据请求错误");
    });
};

// 获取推荐歌单数据
export const getRecommendList = ({ commit, dispatch }) => {
  getRecommendListRequest()
    .then(data => {
      dispatch("changeRecommendList", data.result);
      // 停止加载动画
      commit(types.CHANGE_ENTER_LOADING);
    })
    .catch(e => {
      console.log(e);
      console.log("推荐歌单数据请求错误");
    });
};
