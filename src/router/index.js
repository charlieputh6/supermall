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
    component: () => import('../views/home/Home'),
    meta: {
      footShow: true,
    },
  },
  {
    path: '/cart',
    component: () => import('../views/cart/Cart'),
    meta: {
      footShow: true,
    },
  },
  {
    path: '/category',
    component: () => import('../views/category/Category'),
    meta: {
      footShow: true,
    },
  },
  {
    path: '/profile',
    component: () => import('../views/profile/Profile'),
    meta: {
      footShow: true,
    },
  },
  {
    path: '/detail/:iid',
    component: () => import('../views/detail/Detail'),
    meta: {
      footShow: false,
    },
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
