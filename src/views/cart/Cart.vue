<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!-- 购物车内容 -->
    <Scroll class="content" ref="scroll">
      <cart-list @activatedRefresh="activatedRefresh" />
    </Scroll>
    <!-- 去结算内容 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll.vue";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";
export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar,
  },
  computed: {
    // 有两种mapGetters方法
    ...mapGetters(["cartLength", "cartList"]),
    // ...mapGetters({
    //   length: "cartLength",
    //   list: "cartList",
    // }),
  },
  methods: {
    activatedRefresh() {
      this.$refs.scroll.refresh();
    },
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 400;
}
.content {
  /* height: 100vh;  -44-49  减去的是上下导航栏的高度 再减去结算高度40*/
  height: calc(100vh - 133px);
  overflow: hidden;
}
</style>
