import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'components/HelloWorld'
const index = r => require.ensure([],() => r(require('packages/index/index')),'index');
const recommend = r => require.ensure([],() => r(require('packages/recommend/recommend')),'recommend');
const search = r => require.ensure([],() => r(require('packages/search/search')),'search');


Vue.use(Router)

export default new Router({
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
    	path:'/HelloWorld',
    	name:'HelloWorld',
    	meta:{
    		requireAuth:false,
    	},
    	component:HelloWorld
    },
    {
      path: "/recommend",
      component: recommend
    },
    {
      path: "/search",
      component: search
    },
  ]
})
