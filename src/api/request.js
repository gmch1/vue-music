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
