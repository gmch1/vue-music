import * as types from "./mutation-types";
import { getAlbumDetailRequest } from "../../../api/request";

export const changeCurrentAlbum = ({ commit }, data) => {
  commit(types.CHANGE_CURRENT_ALBUM, data);
};

export const changeEnterLoading = ({ commit }, data) => {
  commit(types.CHANGE_ENTER_LOADING, data);
};

export const getAlbumList = ({ dispatch }, id) => {
  getAlbumDetailRequest(id).then(res => {
    let data = res.playlist;
    dispatch("changeCurrentAlbum", data);
    dispatch("changeEnterLoading", false).catch(e => {
      console.log(e, "获取album数据失败");
    });
  });
};
