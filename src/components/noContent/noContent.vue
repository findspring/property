<template>
	<div class="noContent">
		<img src="./../../assets/images/none.png" alt="">
    <p>没内容真可怕</p>
	</div>
</template>
<script>
	export default {
	  name: 'noContent',
	  data () {
	    return {

	    }
	  }
	}
</script>
<style lang="stylus" type="text/stylus" scoped>
	.noContent
		width 100%
		height 8.5rem
		display flex
		justify-content center
		align-items center
		flex-direction column
		background:rgba(254,254,254,1);
		// box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17)
		// border-radius .14rem
		img
			width 100%
		p
			font-size .28rem
			color #A6A0A0
			margin-top .6rem
</style>