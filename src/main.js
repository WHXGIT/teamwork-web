import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import qs from 'qs'
import axios from 'axios'

const app = createApp(App)
const VueProto = app.config.globalProperties
VueProto.$qs = qs
VueProto.$axios = axios

app
  .use(store)
  .use(router)
  .mount('#app')
