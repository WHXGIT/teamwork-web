import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import qs from 'qs'
import axios from 'axios'
import router from '@/router/index'
import store from '@/store/index'
import '@/registerServiceWorker'

Vue.config.productionTip = false

let axioscat = axios.create({
  baseURL: 'api',
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

Vue.prototype.$cat = axioscat
Vue.prototype.$qs = qs
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
