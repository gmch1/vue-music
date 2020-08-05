import * as types from "./action-types";
import { getBannerRequest, getRecommendListRequest } from "../api/request";

export const changeBannerList = ({ commit }, banners) => {
  commit(types.CHANGE_BANNER, banners);
};

export const changeRecommendList = ({ commit }, data) => {
  commit(types.CHANGE_RECOMMEND_LIST, data);
};

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

export const getRecommendList = ({ dispatch }) => {
  getRecommendListRequest()
    .then(data => {
      dispatch("changeRecommendList", data.result);
    })
    .catch(e => {
      console.log(e);
      console.log("推荐歌单数据请求错误");
    });
};
