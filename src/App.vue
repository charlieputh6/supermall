<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>

    <main-tab-bar v-if="$route.meta.footShow" />
  </div>
</template>

<script>
// import MainTabBar from "components/content/mainTabbar/MainTabBar";
import MainTabBar from "./components/content/mainTabbar/MainTabBar.vue";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import url("./assets/css/base.css");
</style>
