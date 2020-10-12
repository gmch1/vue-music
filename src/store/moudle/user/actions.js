import * as types from "./mutation-types";
import { getAlbumDetailRequest, getUserInfo } from "../../../api/request";

export const showOptionState = ({ commit }) => {
  commit(types.SHOW_OPTIONS_STATE);
  // commit(types.SHOW_OPTIONS_STATE);
};

export const closeOptionState = ({ commit }, data) => {
  commit(types.CLOSE_OPTIONS_STATE, data);
};

export const changeUserState = ({ commit }, data) => {
  commit(types.CHANGE_USER_STATE, data);
};

export const setUserId = ({ commit }, data) => {
  commit(types.SET_USER_ID, data);
};

export const userLoginInfo = ({ dispatch }, uid) => {
  getUserInfo(uid).then(res => {
    dispatch("changeUserState", res);
    dispatch("setUserId", uid);
  });
};
