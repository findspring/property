<template>
  <div id="app">
    <router-view/>
    <div class="bottom-tab" v-if="'/login' != $route.path">
      <div class="tab-item" @click="switchTo('/index')">
        <!-- <img :src="'/index' === $route.path ? tabBarImgArr[0].selected : tabBarImgArr[0].normal" alt="首页"> -->
        <i class="nav-icon " :class="'/index' === $route.path ?'icon-home-on':'icon-home'"></i>
        <span :class="{on: '/index' === $route.path}">首页</span>
      </div>
      <div class="tab-item" @click="switchTo('/recommend')">
        <i class="nav-icon " :class="'/recommend' === $route.path ?'icon-visitors-on':'icon-visitors'"></i>
        <span :class="{on: '/recommend' === $route.path}">访客</span>
      </div>
      <div class="tab-item" @click="switchTo('/search')">
        <i class="nav-icon " :class="'/search' === $route.path ?'icon-audit-on':'icon-audit'"></i>
        <span :class="{on: '/search' === $route.path}">审核</span>
      </div>
      <div class="tab-item" @click="switchTo('/mine')">
        <i class="nav-icon " :class="'/mine' === $route.path ?'icon-my-on':'icon-my'"></i>
        <span :class="{on: '/mine' === $route.path}">我的</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      src:'assets/logo.png',
      tabBarImgArr:[   //图片切换
        {normal: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg', selected: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'},
        {normal: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg', selected: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg'},
        {normal: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg', selected: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'}
        ]
    }
  },
  methods:{
    switchTo(path){
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="stylus" type="text/stylus" scoped>
.bottom-tab
  width 100%
  height 1rem
  border-top 1px solid #ccc
  background-color #fff
  position fixed
  left 0px
  bottom 0px
  display flex
  z-index 999
  .tab-item
    display flex
    flex 1
    flex-direction column
    align-items center
    justify-content center
    font-size .2rem
    color #9B9B9B
    span
      margin-top .1rem
    .on
      color #D45855
</style>
