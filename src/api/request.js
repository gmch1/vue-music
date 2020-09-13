import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get("/banner");
};

export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized");
};

export const getHotSingerListRequest = count => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

export const getSingerListRequest = (category, alpha, count) => {
  // /artist/list?type=1&area=96
  // 根据性别、分类来查询，其他字段与先前一致
  let res = category.split(",");

  return axiosInstance.get(
    `/artist/list?type=${res[0]}&area=${
      res[1]
    }&initial=${alpha.toLowerCase()}&offset=${count}`
  );
};

// 获取排行数据
export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
};

// 获取歌单数据
export const getAlbumDetailRequest = id => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};

// 获取歌手主页数据
export const getSingerInfoRequest = id => {
  return axiosInstance.get(`/artists?id=${id}`);
};
// 获取歌词数据
export const getLyricRequest = id => {
  return axiosInstance.get(`/lyric?id=${id}`);
};

export const getHotKeyWordsRequest = () => {
  return axiosInstance.get(`/search/hot`);
};

export const getSuggestListRequest = query => {
  return axiosInstance.get(`/search/suggest?keywords=${query}`);
};

export const getResultSongsListRequest = query => {
  return axiosInstance.get(`/search?keywords=${query}`);
};

export const getSongDetailRequest = id => {
  return axiosInstance.get(`/song/detail?ids=${id}`);
};

// 登录接口

export const userLogin = (phone, password) => {
  return axiosInstance.post(
    `/login/cellphone?phone=${phone}&password=${password} `
  );
};

// 登陆后获取用户信息
export const getUserInfo = uid => {
  return axiosInstance.post(`/user/detail?uid=${uid}`);
};
