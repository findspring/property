<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" transition="fade" transition-mode="out-in"></router-view> 
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" transition="fade" transition-mode="out-in"></router-view>     
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
    }
  },
  created(){
    this.stopBack();
  },
  methods:{
    stopBack(){
      //防止页面后退
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL);
      }); 
    }
    // getAccountLogin(){
    //   this.$http({
    //     method: "post",
    //     url: "/wechat/officialAccount/user/accountLogin",
    //     data: this.$qs.stringify({
    //     })
    //   }).then((res) => {
    //     let isRegister = res.data.result.isRegister;
    //     if(isRegister == 1){
    //       location.href = "https://www.alfyun.cn/index";
    //     }else if(isRegister == 2){
    //       location.href = "https://www.alfyun.cn/login";
    //     }
    //   }).catch((err) => {
    //   });
    // },
  }
}
</script>

<style lang="stylus" type="text/stylus" scoped>

</style>
