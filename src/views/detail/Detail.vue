<template>
  <div id="detail">
    <detail-nav-bar class="detail-bav" @titleClick="titleClick" ref="nav" />
    <!-- <div class="contain">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
    </div> -->
    <!-- 传probe-type记得还要传pullUpLoad -->
    <Scroll
      class="content"
      ref="scroll"
      @scroll="contentSroll"
      :probe-type="3"
      :pullUpLoad="true"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detail-info="detailInfo"
        @imgLoad="imageLoad"
      ></detail-goods-info>
      <!-- :后面属性不能驼峰 -->
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </Scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <!-- 给vue组件绑定事件时候，必须加上native ，不然不会生效（监听根元素的原生事件，使用 .native 修饰符） -->
    <back-top @click.native="backTop" v-show="isShowBackTop" />
    <!-- <toast /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import { debounce } from "common/utils.js";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import BackTop from "components/content/backTop/BackTop.vue";
import { backTopMixin } from "common/mixin.js";

// import Toast from "components/common/toast/Toast.vue";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    getRecommend,
    GoodsList,
    debounce,
    DetailBottomBar,
    backTopMixin,
    BackTop,
    // Toast,
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      res: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message: "",
      // show: false,
    };
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      // 哪里能获取到正确的offsetTop值
      // 1.create不行，不能获取元素
      // 2.mounted不行，数据还没有获取到
      // 3.获取到数据得回调中也不行，dom还没有渲染完
      // 4.$nextClick不行，因为图片得高度没有被计算在内
      // 5.在图片加载完成后，获取的高度才是正确得，及下面得getThemeTopY
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    contentSroll(position) {
      // 1.获取y值
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      // for (let i = 0; i < length; i++) {
      //   if (
      //     (this.currentIndex != i &&
      //       i < length - 1 &&
      //       positionY >= this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1]) ||
      //     (i == length - 1 && positionY >= this.themeTopYs[i])
      //   ) {
      //     this.currentIndex = i;
      //     // 改变导航栏得currentIndex
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex != i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 3.是否回到顶部
      this.listenShowBackTop(position);
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 2.将商品添加到购物车里
      // this.$store.commit("addCart", product);
      // 最好通过actions->mutations->state
      this.$store.dispatch("addCart", product).then((res) => {
        // this.message = res;
        // this.show = true;
        // setTimeout(() => {
        //   this.message = "";
        //   this.show = false;
        // }, 1500);
        this.$toast.show(res, 2000);
      });
      // 3.添加到购物车成功
    },
  },
  // 等页面渲染完成后再计算可滚动高度 一定要写
  updated() {
    this.$refs.scroll.refresh();
  },
  created() {
    // 1.保存存入的id
    this.iid = this.$route.params.iid;
    //2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      this.res = res;
      const data = res.result;
      // 获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取商家信息
      this.shop = new Shop(data.shopInfo);
      // 获取商品详细信息
      this.detailInfo = data.detailInfo;
      // 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 获取评论信息
      this.commentInfo = data.rate.list[0];
    });
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
    // 4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      // console.log("---");
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 100);
  },
  activated() {
    // create只能拿一次id  后面都是重复的
    this.iid = this.$route.params.iid;
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.detail-bav {
  position: relative;
  z-index: 3;
  background-color: #fff;
}

.content {
  /* height: 100vh;  -44-49  减去的是上下导航栏的高度*/
  height: calc(100% - 93px);
}

.contain {
  flex: 1;
  overflow: auto;
}
</style>>
