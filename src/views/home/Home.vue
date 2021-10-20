<template>
  <div id="home" class="wrapper">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tableClick="tableClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="scrollContent"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tableClick="tableClick"
        ref="tabControl2"
      ></tab-control>
      <!-- tableClick子传父会默认把参数传进来 所以不用写 -->
      <goods-list :goods="showGoods"></goods-list>
    </Scroll>

    <!-- .nave监听原生组件的事件  -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 导入公共的组件(以空格隔开)
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

// 导入home子组件
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommendView from "./childComps/HomeRecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

// 导入的方法
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
export default {
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  // 回到当前页面
  activated() {
    this.$refs.scroll.refresh();
    // 回到当前上次浏览的地方
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    // 记录离开首页时的位置
    this.saveY = this.$refs.scroll.getScrollY();
  },
  created() {
    // 1.请求多个数据  轮播图的数据
    this.getHomeMultidata();

    // 下面的商品信息

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 3.监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    // 监听子组件的方法
    tableClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 网络请求数据的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        // console.log(res.data);
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 请求下一页的数据
      const page = this.goods[type].page + 1;
      // 下面getHomeGoods有两个参数
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        // 将数据放入list里面
        // ...es6语法 会把数组里面的每个数取数来执行push函数
        this.goods[type].list.push(...res.data.list);
        // 最后将原本的页数加一
        this.goods[type].page += 1;
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp1();
      });
    },
    backClick() {
      // this.$refs.scroll组件对象 可调用属性和方法
      // this.$refs.scroll.scroll拿到scroll对象
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500);
      // Scroll.vue封装了scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    scrollContent(position) {
      // 判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 决定tabControl是否吸顶 判断页面滚动到哪儿了
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    // 为完成吸顶效果 监听主要是轮播图加载完成
    //获取tabControl的offset
    // 所有的组件都有一个属性$el,用于获取组件中的元素

    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  /* 视口 就能屏幕看得见的部分 */
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
/* 不起作用原因 不是原生js帮我们做滚动 而是better-scroll 系统没法检测滚动到哪里了  */
/* .tabControl {
  position: relative;
  top: 35px;
  z-index: 3;
} */
.tab-control {
  position: relative;
  z-index: 3;
}
/* 用定位来代替计算  */
/* content必须得有高度 */
.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* 就是这个问题 */
.wrapper {
  height: auto;
  width: 100%;
  background: white;
}
</style>
