<template>
  <div id="app">
    <keep-alive>
      <router-view transition="fade" transition-mode="out-in"></router-view> 
    </keep-alive>
    
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
      let code = new Date().getTime();
      this.$http({
        method: "post",
        url: "/wechat/officialAccount/user/accountLogin",
        data: this.$qs.stringify({
          'code':code
        })
      }).then((res) => {
        if(res.data.result && res.data.result.authToken){
          let authToken = res.data.result.authToken;
          localStorage.setItem("authToken", authToken)
        }
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
