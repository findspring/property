<template>
  <div id="app">
    <!-- <img v-lazy="src"> -->
    <!-- <img src="./../assets/logo.png"> -->
    <router-view/>
    <div class="bottom-tab">
      <div class="tab-item" @click="switchTo('/index')">
        <img :src="'/index' === $route.path ? tabBarImgArr[0].selected : tabBarImgArr[0].normal" alt="首页">
        <span :class="{on: '/index' === $route.path}">首页</span>
      </div>
      <div class="tab-item" @click="switchTo('/recommend')">
        <img :src="'/recommend' === $route.path ? tabBarImgArr[1].selected : tabBarImgArr[1].normal" alt="推荐">
        <span :class="{on: '/recommend' === $route.path}">推荐</span>
      </div>
      <div class="tab-item" @click="switchTo('/search')">
        <img :src="'/search' === $route.path ? tabBarImgArr[2].selected : tabBarImgArr[2].normal" alt="搜索">
        <span :class="{on: '/search' === $route.path}">搜索</span>
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
  height 50px
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
    font-size 14px
    color #666
    img
       width 35%
       margin-bottom 2px
    .on
      color red
</style>
