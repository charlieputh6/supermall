<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check-button {
  border: 2px solid #aaa;
  border-radius: 50%;
}
.check {
  border-color: rgb(255, 129, 152);
  background-color: rgb(255, 129, 152);
}
</style>
