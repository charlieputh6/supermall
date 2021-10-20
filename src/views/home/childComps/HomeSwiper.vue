<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link"
        ><img :src="item.image" alt="" @load="imageLoad"
      /></a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: true,
    };
  },
  methods: {
    imageLoad() {
      if (this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = !this.isLoad;
      }
    },
  },
};
</script>

<style>
</style>
