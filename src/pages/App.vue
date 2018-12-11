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
      active: 0,
    }
  },
  created(){
    this.getAccountLogin();
  },
  methods:{
    getAccountLogin(){
      // let code = new Date().getTime();
      this.$http({
        method: "post",
        // url: "/pub/pubBase/communityList",
        // headers:{
        //   'Content-type': 'text/plain'
        // },
        url: "/wechat/officialAccount/user/accountLogin",
        data: this.$qs.stringify({
          // 'code':code
        })
      }).then((res) => {
        let isRegister = res.data.result.isRegister;
        if(isRegister == 1){
          location.href = "https://www.alfyun.cn/index";
        }else if(isRegister == 2){
          location.href = "https://www.alfyun.cn/login";
        }
        // if(res.data.result && res.data.result.authToken){
        //   let authToken = res.data.result.authToken;
        //   // localStorage.setItem("authToken", authToken)
        // }
      }).catch((err) => {
      });
    },
    switchTo(path){
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="stylus" type="text/stylus" scoped>

</style>
