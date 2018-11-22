// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import fastClick from "fastclick"
import router from './../router/index'
import install from 'utils/install'
import 'utils/validate.js'
import Vant from 'vant';
import {ToastPlugin,LoadingPlugin,AlertPlugin} from 'vux'
import VueLazyLoad from 'vue-lazyload'

Vue.use(Vant);
Vue.use(install)
Vue.use(VueLazyLoad,{
    error:require('assets/logo.png'),
    loading:require('assets/loading.gif'),
    attempt:2
})
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)

import './../assets/css/reset.css';
import './../assets/stylus/index.styl';
import 'vant/lib/index.css';

router.beforeEach((to, from, next) => {
  //判断浏览器区分微信端、IOS端、安卓端
  // let authToken = localStorage.getItem("authToken") || "";
  // if (!authToken) {
  //   authToken = obj.getQueryString("authToken")
  //   if (authToken){
  //     localStorage.setItem("authToken", authToken)
  //   }
  // }
  //title变化
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // Vue.prototype.$http.defaults.headers['common']=httpHead;
  // Vue.prototype.$http.defaults.headers['common']['authToken']= localStorage.getItem("authToken")||"";
  next()
});

fastClick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

