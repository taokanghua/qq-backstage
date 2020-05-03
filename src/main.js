import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入全局样式
import './style/common.less'
// 导入接口
import api from '@/api/api.js'
Vue.prototype.$api = api
// 全局导入element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 全局导入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//导入axios
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:3002'
Vue.prototype.$axios = Axios

// 导入qs
import qs from 'qs'
Vue.prototype.$qs = qs


//全局请求拦截器
Axios.interceptors.request.use(config => {
  config.headers.Authorization = sessionStorage.getItem('btoken')
  return config
})


Vue.config.productionTip = false

let vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
