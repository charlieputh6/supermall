import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"

import toast from "components/common/toast/index.js"

Vue.config.productionTip = false

// 原本bus是空的  bus是事件总线
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
