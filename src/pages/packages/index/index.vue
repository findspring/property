<template>
	<div class="index">
		test
		<swiper :list="demo01_list" :show-dots="false" auto loop></swiper>
		<group title="使用icon代替title">
      <x-input title="必须输入2333" :is-type="be2333" placeholder="I'm placeholder">
        <img slot="label" style="margin-right:10px;display:block;" src="https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg" width="24" height="24">
      </x-input>
    </group>
	</div>
</template>


<script>
import { Swiper,XInput, Group, XButton, Cell  } from 'vux'

const baseList = [{
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg'
}, {
  url: 'javascript:',
  // img: 'https://static.vux.li/demo/5.jpg',
  fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
}]

export default {
  name:'index',
  data () {
    return {
    	demo01_list: baseList,
    	be2333: function (value) {
        return {
          valid: value === '2333',
          msg: 'Must be 2333'
        }
      },
    }
  },
  components:{
  	Swiper,
  	XInput,
    XButton,
    Group,
    Cell
  },
  mounted(){
  	this.getIndex();
  },
  methods:{
  	getIndex(){
  		let day = new Date();
  		this.$http({
  			method:'post',
  			url:'/wechat/officialAccount/community/proprietorList',
  			data:this.$qs.stringify({
  				time:day
  			})
  		})
  	}
  }
}
</script>

<style lang="stylus" type="text/stylus" scoped>
	.index
		font-size .36rem
		color red
</style>