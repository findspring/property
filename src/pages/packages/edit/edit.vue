<template>
	<div class="edit">
		<van-nav-bar title="修改资料" left-arrow :fixed="true" :z-index="100" @click-left="onClickLeft">
			<div slot="left">
				<i class="common-icon icon-back"></i>
			</div>
			<!-- <div slot="right" @click="show"> -->
			<!-- <div slot="right">
				<i class="common-icon icon-date"></i>
			</div> -->
		</van-nav-bar>
	</div>
</template>

<script>
	export default {
	  name: 'edit',
	  data () {
	    return {

	    }
	  },
	  methods:{
	  	onClickLeft(){
	  		this.$router.go(-1);
	  	},
	  }
	}
</script>
<style lang="stylus" type="text/stylus">
	.edit
		background #fff
		.van-nav-bar
			background linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)!important
			.icon-back
				margin-bottom .3rem
			.icon-date
				margin-bottom .26rem
			.van-nav-bar__title
				color #fff!important
				font-size .36rem!important
				font-weight 700!important
		
</style>