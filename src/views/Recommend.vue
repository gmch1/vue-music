<template>
  <div class="home">
    <my-tab :bannerList="bannerList"></my-tab>
    <my-list :recommendList="recommendList"></my-list>
  </div>
</template>

<script>
// @ is an alias to /src
import MyTab from "@/components/my-tab/my-tab";
import MyList from "../components/my-list/my-list";

export default {
  data() {
    return {
      bannerList: [1, 2, 3, 4].map(() => {
        return {
          imageUrl:
            "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg"
        };
      }),
      recommendList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
        return {
          id: 1,
          picUrl:
            "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
          playCount: 17171122,
          name: "朴树、许巍、李健、郑钧、老狼、赵雷"
        };
      })
    };
  },
  components: {
    MyTab,
    MyList
  }
};
</script>
