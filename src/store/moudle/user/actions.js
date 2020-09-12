import * as types from "./mutation-types";
import { getAlbumDetailRequest } from "../../../api/request";

export const showOptionState = ({ commit }) => {
  commit(types.SHOW_OPTIONS_STATE);
  // commit(types.SHOW_OPTIONS_STATE);
};

export const closeOptionState = ({ commit }, data) => {
  commit(types.CLOSE_OPTIONS_STATE, data);
};
