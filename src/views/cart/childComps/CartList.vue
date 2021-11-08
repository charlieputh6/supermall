<template>
  <div class="cart-list">
    <cart-list-item
      v-for="(item, index) in cartList"
      :key="index"
      :itemInfo="item"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem.vue";

export default {
  components: {
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  // bsscroll当你添加了新的内容的时候需要重新计算也就是刷新才行
  activated() {
    this.$emit("activatedRefresh");
  },
};
</script>

<style scoped>
</style>
