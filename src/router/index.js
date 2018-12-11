import Vue from 'vue'
import Router from 'vue-router'
const login = r => require.ensure([],() => r(require('packages/login/login')),'login');
const index = r => require.ensure([],() => r(require('packages/index/index')),'index');
const visitors = r => require.ensure([],() => r(require('packages/visitors/visitors')),'visitors');
const manage = r => require.ensure([],() => r(require('packages/manage/manage')),'manage');
const visitorsInfo = r => require.ensure([],() => r(require('packages/visitors-info/visitors-info')),'visitorsInfo');
const members = r => require.ensure([],() => r(require('packages/members/members')),'members');
const audit = r => require.ensure([],() => r(require('packages/audit/audit')),'audit');
const auditInfo = r => require.ensure([],() => r(require('packages/audit-info/audit-info')),'auditInfo');
const mine = r => require.ensure([],() => r(require('packages/mine/mine')),'mine');
const edit = r => require.ensure([],() => r(require('packages/edit/edit')),'edit');
const message = r => require.ensure([],() => r(require('packages/message/message')),'message');
const question = r => require.ensure([],() => r(require('packages/question/question')),'question');
const msgInfo = r => require.ensure([],() => r(require('packages/msg-info/msg-info')),'msgInfo');
const identify = r => require.ensure([],() => r(require('packages/identify/identify')),'identify');
const result = r => require.ensure([],() => r(require('packages/result/result')),'result');


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
      	title:'阿尔法智汇',
      	flag:'index',
      	belongToGroup:'阿尔法智汇',
        keepAlive: false,
      },
      component:index
    },
    {
      path: "/visitors",
      name:'visitors',
      meta: {
        title: '访客',
        flag: 'visitors',
        keepAlive: true,
      },
      component: visitors
    },
    {
      path: "/manage",
      name:'manage',
      meta: {
        title: '访客预约',
        flag: 'manage',
        keepAlive: true,
      },
      component: manage
    },
    {
      path: "/visitorsInfo",
      name:'visitorsInfo',
      meta: {
        title: '访客详情',
        flag: 'visitorsInfo',
        keepAlive: false,
      },
      component: visitorsInfo
    },
    {
      path: "/members",
      name:'members',
      meta: {
        title: '家庭成员添加',
        flag: 'members',
        keepAlive: true,
      },
      component: members
    },
    {
      path: "/audit",
      name:'audit',
      meta: {
        title: '审核',
        flag: 'audit',
        keepAlive: true,
      },
      component: audit
    },
    {
      path: "/auditInfo",
      name:'auditInfo',
      meta: {
        title: '审核详情',
        flag: 'auditInfo',
        keepAlive: false,
      },
      component: auditInfo
    },
    {
      path: "/mine",
      name:'mine',
      meta: {
        title: '我的',
        flag: 'mine',
        keepAlive: false,
      },
      component: mine
    },
    {
      path: "/edit",
      name:'edit',
      meta: {
        title: '修改资料',
        flag: 'edit',
        keepAlive: true,
      },
      component: edit
    },
    {
      path: "/message",
      name:'message',
      meta: {
        title: '我的消息',
        flag: 'message',
        keepAlive: false,
      },
      component: message
    },
    {
      path: "/question",
      name:'question',
      meta: {
        title: '常见问题',
        flag: 'question',
        keepAlive: true,
      },
      component: question
    },
    {
      path: "/msgInfo",
      name:'msgInfo',
      meta: {
        title: '我的消息',
        flag: 'msgInfo',
        keepAlive: true,
      },
      component: msgInfo
    },
    {
      path: "/login",
      name:'login',
      meta: {
        title: '阿尔法智汇',
        flag: 'login',
        keepAlive: true,
      },
      component: login
    },
    {
      path: "/identify",
      name:'identify',
      meta: {
        title: '身份认证',
        flag: 'identify',
        keepAlive: true,
      },
      component: identify
    },
    {
      path: "/result",
      name:'result',
      meta: {
        title: '身份认证',
        flag: 'result',
        keepAlive: false,
      },
      component: result
    },


  ]
})
