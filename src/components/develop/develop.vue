<template>
	<div class="develop">
		<div class="develop-main">
			<img src="../../assets/images/wait.png" alt="">
			<h3>敬请期待</h3>
			<p>更多功能正在开发中</p>
		</div>
		<div class="develop-close" @click="closeDevelop">
			<img src="../../assets/images/close.png" alt="">
		</div>
	</div>
</template>

<script>
export default {
  name: 'develop',
  data () {
    return {

    }
  },
  methods:{
  	closeDevelop(){
  		this.$emit('closeDevelop',false)
  	},
  }
}
</script>
<style lang="stylus" type="text/stylus" scoped>
	.develop
		width 100%
		height 100%
		position: fixed
		left 0
		top 0
		right 0
		bottom 0
		z-index 999
		display flex
		align-items center
		justify-content center
		flex-direction column
		background rgba(0, 0, 0, .56)
		.develop-main
			width 6.68rem
			height 8rem
			background #fff
			border-radius .14rem
			padding .33rem 0 .94rem 0
			overflow hidden
			display flex
			align-items center
			justify-content flex-start
			flex-direction column
			img
				width 5.6rem
			h3
				font-size .42rem
				font-weight 400
				color #999999
				line-height .6rem
				margin .2rem 0 .1rem 0
			p
				color #D8D8D8
				font-size: .32rem
				line-height .45rem
		.develop-close
			margin-top .4rem
			width .58rem
			height .58rem
			img
				width 100%
</style>