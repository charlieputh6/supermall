// 1.安装插件
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
// getters为什么要在这里导入？
import getters from './getters'
Vue.use(Vuex)


const state = {
  cartList: []
}
// 2.创建Store对象
const store = new Vuex.Store({
  state,
  // 修改state里面东西最好是先通过mutations
  // mutations中的每个方法尽可能完成的时间比较单一
  // mutations唯一的目的就是state中状态 它可以跟踪
  mutations,
  actions,
  getters
})

// 3.挂载到Vue实例上
export default store
