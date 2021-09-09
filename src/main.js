// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
// import Vuex from 'vuex'
import store from './store'
import 'babel-polyfill'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import qs from 'QS'

import './assets/css/app-style.css'
import './assets/css/sidebar-menu.css'

// Vue.use(ElementUI)
// Vue.use(VueAxios, axios)
// Vue.use(Vuex)
// Vue.prototype.$axios = axios
// Vue.prototype.$qs = qs
// 配置请求的根路径
axios.defaults.baseURL = "/api"
Vue.config.productionTip = false

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // 时间格式年月日、时分秒
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
//     let token = request.localStorageGet('token');
//     console.log(token)
//     console.log('需要登录');
//     if (token) { // 判断当前的token是否存在 ； 登录存入的token
//       next();
//     } else {
//       next({
//         path: '/signin',
//         query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//   } else {
//     next();
//   }
// });

// 判断是否登录
// router.beforeEach(function (to, from, next) {
//   let token = request.localStorageGet('token');
//     console.log(token)
//   if (to.meta.needLogin) {
//     //从cookie中获取用户信息，判断是否已登录
//     if (token) {
//       next(); //表示已经登录
//     } else {
//       //未登录
//       //next可以传递一个路由对象作为参数 表示需要跳转到的页面
//       next({
//         path: '/signin',
//         query: {redirect: to.meta.redirect} //登录后再跳回此页面时要做的配置
//       });
//     }
//   } else {
//     //表示不需要登录
//     next(); //继续往后走
//   }
// });

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   // render: h => h(App)
//   components: { App },
//   template: '<App/>'
// });
// vue实例化
var vue = new Vue({
  router,
  store,
  render: h => h(App),
  components: {
    App
  }
}).$mount('#app')
// 导出vue
export default vue;
