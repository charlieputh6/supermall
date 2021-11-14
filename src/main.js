import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"

import toast from "components/common/toast/index.js"
import FastClick from "fastclick"
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 原本bus是空的  bus是事件总线
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/bgImage.jpg'),
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
