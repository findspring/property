<template>
  <div class="wrap">
    <x-header class="head"
    :left-options="{showBack: showBack,backText:'','preventGoBack':preventGoBack}"
    :title="title"
    @on-click-back="back"></x-header>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  export default {
    name: 'vHeader',
    data() {
      return {

      }
    },
    props:{
      title:{
        type:String,
        default:""
      },
      showBack:{
        type:Boolean,
        default:false
      },
      preventGoBack:{
        type:Boolean,
        default:false
      }
    },
    created(){
    },
    mounted(){
    },
    components: {
      XHeader
    },
    methods:{
      // back () {
      //   this.$router.push({path: `${this.$road}`})
      // },
      back(){
        if(this.preventGoBack){
          this.$emit('back')
        }else{
          this.$router ? this.$router.back() : window.history.back()
        }
      },


    }
  }
</script>


<style scoped lang="stylus" type="text/stylus">
.wrap
  padding-bottom: .88rem    
  .head
    background-color #fff
    height .88rem
    color #333!important
    position fixed
    top 0
    left 0
    width 100%
    z-index: 10
    .vux-header-title
    	color #333!important
</style>
