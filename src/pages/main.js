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

fastClick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

