// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import './Assets/style.css'

axios.defaults.baseURL = 'http://localhost:2396'
axios.interceptors.request.use(function(config){
  config.headers.Authorization = window.localStorage.getItem('AuthorizationToken')
  return config
}, function(error){
  return Promise.reject(error);
})
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // 处理统一的验证失效错误.
  if (error && error.response) {
    if (error.response.status == 400) {
      for (const key in error.response.data) {
        var value = error.response.data[key]
        for (const temp in value) {
          ElementUI.Notification.error(value[temp])
        }
      }
    } else if (error.response.status == 401) {
      ElementUI.Notification.error('未授权，请登录')
      router.push({ name: 'Login' })
    }
  }
  return Promise.reject(error)
});

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
