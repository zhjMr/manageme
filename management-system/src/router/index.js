import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    redirect: "/index",
    component: () => import('../views/home.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../viewshoust/index'),
        meta:{
           title:"首页"
        }
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../viewshoust/goods'),
        meta:{
          title:"商品管理"
       }
      },
      {
        path: '/staff',
        name: 'staff',
        component: () => import('../viewshoust/staff'),
        meta:{
          title:"员工管理"
       }
      },
      {
        path: '/member',
        name: 'member',
        component: () => import('../viewshoust/member'),
        meta:{
          title:"会员管理"
       }
      },
      {
        path: '/supplier',
        name: 'supplier',
        component: () => import('../viewshoust/supplier'),
        meta:{
          title:"供应商管理"
       }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
