<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-buttonv"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>

    <div class="price">合计：{{ totalPrice }}</div>

    <div class="caculate" @click="calcClick">去结算：({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
export default {
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.getters.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    // 箭头函数里面一定要写return
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.find((item) => {
        return !item.checked;
      });
    },
  },
  methods: {
    checkClick() {
      // 调用isSelectAll（）方法不加括号
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach((item) => {
          item.checked = false;
        });
      } else
        this.$store.state.cartList.forEach((item) => {
          item.checked = true;
        });
    },
    calcClick() {
      // 一个都没选 要弹出提示
      if (!this.isSelectAll)
        this.$toast.show("请选择购买的商品，至少一件", 2000);
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  background-color: #eee;
  align-items: center;
  font-size: 14px;
  justify-content: space-between;
}
.check-content {
  display: flex;
  height: 40px;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
}
.caculate {
  width: 80px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: pink;
}
</style>
