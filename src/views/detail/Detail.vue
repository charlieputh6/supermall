<template>
  <div id="detail">
    <detail-nav-bar />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
export default {
  components: {
    DetailNavBar,
  },
  data() {
    return {
      iid: null,
    };
  },
  activated() {
    this.iid = this.$route.params.iid;
  },
};
</script>

<style scoped>
</style>>
