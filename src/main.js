import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/iconfont/iconfont.css'
import axios from 'axios'

axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1/";
//使用axios拦截器添加token验证
axios.interceptors.request.use(config => {
  config.headers.Authorization = sessionStorage.getItem('token');
  return config;
});
Vue.prototype.$http = axios

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
