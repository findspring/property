import Vue from 'vue'
import Router from 'vue-router'
const login = r => require.ensure([],() => r(require('packages/login/login')),'login');
const index = r => require.ensure([],() => r(require('packages/index/index')),'index');
const recommend = r => require.ensure([],() => r(require('packages/recommend/recommend')),'recommend');
const search = r => require.ensure([],() => r(require('packages/search/search')),'search');
const mine = r => require.ensure([],() => r(require('packages/mine/mine')),'mine');


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      name: 'index',
      meta:{
      	requireAuth:true,
      	txt:'首页',
      	flag:'index',
      	belongToGroup:'首页'
      },
      component:index
    },
    {
      path: "/recommend",
      component: recommend
    },
    {
      path: "/search",
      component: search
    },
    {
      path: "/mine",
      component: mine
    },
    {
      path: "/login",
      component: login
    },
  ]
})
