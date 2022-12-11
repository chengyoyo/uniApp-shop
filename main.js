
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'

//封装弹框
uni.$showMsg = function (title = '数据加载失败' , duration = 1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

$http.baseUrl = 'https://api-hmugo-web.itheima.net'
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function (res) {
  if(res.data.meta.status != 200) {
   return uni.$showMsg();
  }
  uni.hideLoading()
}

uni.$http = $http



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif