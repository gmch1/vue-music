import * as types from "./mutation-types";
import { getSingerInfoRequest } from "../../../api/request";

export const changeArtist = ({ commit }, data) => {
  commit(types.CHANGE_ARTIST, data);
};

export const changeSongs = ({ commit }, data) => {
  commit(types.CHANGE_SONGS_OF_ARTIST, data);
};

export const changeEnterLoading = ({ commit }, data) => {
  commit(types.CHANGE_ENTER_LOADING, data);
};

export const getSIngerInfo = ({ dispatch }, id) => {
  getSingerInfoRequest(id).then(data => {
    dispatch("changeArtist", data.artist);
    dispatch("changeSongs", data.hotSongs);
    dispatch("changeEnterLoading", false);
  });
};
