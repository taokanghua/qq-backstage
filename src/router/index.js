import Vue from 'vue'
import VueRouter from 'vue-router'

import routers from './main/index'
Vue.use(VueRouter)



  const routes = routers

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 全局路由守卫
router.beforeEach( (to, from, next) => {
  if(to.path == '/') return next()
  let token = sessionStorage.getItem('btoken')
  if(!token) return next('/')
  next()
})

export default router
