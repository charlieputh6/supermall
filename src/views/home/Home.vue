<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommendView from "./childComps/HomeRecommendView.vue";
import { getHomeMultidata } from "network/home";
export default {
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
    // 1.请求多个数据
    getHomeMultidata().then((res) => {
      // console.log(res);
      this.banners = res.data.banner.list;
      console.log(res.data);
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>

<style>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
