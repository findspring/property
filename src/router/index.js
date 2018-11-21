import Vue from 'vue'
import Router from 'vue-router'
const login = r => require.ensure([],() => r(require('packages/login/login')),'login');
const index = r => require.ensure([],() => r(require('packages/index/index')),'index');
const visitors = r => require.ensure([],() => r(require('packages/visitors/visitors')),'visitors');
const members = r => require.ensure([],() => r(require('packages/members/members')),'members');
const audit = r => require.ensure([],() => r(require('packages/audit/audit')),'audit');
const mine = r => require.ensure([],() => r(require('packages/mine/mine')),'mine');
const message = r => require.ensure([],() => r(require('packages/message/message')),'message');


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
      path: "/visitors",
      component: visitors
    },
    {
      path: "/members",
      component: members
    },
    {
      path: "/audit",
      component: audit
    },
    {
      path: "/mine",
      component: mine
    },
    {
      path: "/message",
      component: message
    },
    {
      path: "/login",
      component: login
    },


  ]
})
