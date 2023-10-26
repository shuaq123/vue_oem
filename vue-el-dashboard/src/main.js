import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import App from './App'
import router from './router'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.3.17:8214'
  // baseURL: 'http://154.8.192.103:5008'
})

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // 从本地存储中获取token
    if (token) {
      config.headers['Authorization'] = token; // 添加token头部信息
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据进行处理
    return response;
  },
  function (error) {
    // 对响应错误进行处理
    if (error.response.status === 401) {
      // 登录状态失效，跳转到登录页面
      alert("登陆失效，请重新登陆");
      router.push('/login');
    }
    return Promise.reject(error);
  }
);



Vue.prototype.$axios = instance
export default instance
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
