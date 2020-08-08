import * as types from "./mutation-types";
// import {} from '../../../api/request';

export const changeCurrentSong = ({ commit }, data) => {
  commit(types.SET_CURRENT_SONG, data);
};

export const changeFullScreen = ({ commit }, data) => {
  commit(types.SET_FULL_SCREEN, data);
};

export const changePlayingState = ({ commit }, data) => {
  commit(types.SET_PLAYING_STATE, data);
};

export const changeSequencePlayList = ({ commit }, data) => {
  commit(types.SET_SEQUECE_PLAYLIST, data);
};

export const changePlayList = ({ commit }, data) => {
  commit(types.SET_PLAYLIST, data);
};

export const changePlayMode = ({ commit }, data) => {
  commit(types.SET_PLAY_MODE, data);
};

export const changeCurrentIndex = ({ commit }, data) => {
  commit(types.SET_CURRENT_INDEX, data);
};

export const changeShowPlayList = ({ commit }, data) => {
  commit(types.SET_SHOW_PLAYLIST, data);
};
