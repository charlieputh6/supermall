import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter);

// 创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    // 懒加载忘了？？？？
    component: () => import('../views/home/Home')
  },
  {
    path: '/cart',
    component: () => import('../views/cart/Cart')
  },
  {
    path: '/category',
    component: () => import('../views/category/Category')
  },
  {
    path: '/profile',
    component: () => import('../views/profile/Profile')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
