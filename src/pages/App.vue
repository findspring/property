<template>
  <div id="app">
    <router-view/>
    <div class="nav-bar">
      <van-tabbar v-model="active">
        <van-tabbar-item @click="switchTo('/index')">
          <span>首页</span>
          <i slot="icon" slot-scope="props" class="nav-icon"
          :class="props.active ?'icon-home-on':'icon-home' "
          ></i>
        </van-tabbar-item>
        <van-tabbar-item @click="switchTo('/members')">
          <span>成员</span>
          <i slot="icon" slot-scope="props" class="nav-icon"
          :class="props.active ?'icon-members-on':'icon-members' "
          ></i>
        </van-tabbar-item>
        <van-tabbar-item @click="switchTo('/visitors')">
          <span>访客</span>
          <i slot="icon" slot-scope="props" class="nav-icon"
          :class="props.active ?'icon-visitors-on':'icon-visitors' "
          ></i>
        </van-tabbar-item>
        <van-tabbar-item @click="switchTo('/mine')">
          <span>我的</span>
          <i slot="icon" slot-scope="props" class="nav-icon"
          :class="props.active ?'icon-mine-on':'icon-mine' "
          ></i>
        </van-tabbar-item>
      </van-tabbar>
    </div>    
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      active: 0,
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
.nav-bar
  .van-tabbar-item
    color #9B9B9B
    font-size .2rem
  .van-tabbar-item--active
    color #CE3D3A  
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
