<template>
	<div class="identify clearfix">
		<van-nav-bar title="身份认证" left-arrow :fixed="true" @click-left="onClickLeft">
			<div slot="right" class="identify-top-right">
				<i class="common-icon icon-position02"></i>
				<span>{{cityName}}</span>
			</div>
		</van-nav-bar>
		<div class="identify-main">			
			<div class="identify-idcard">
				<h5>拍摄/上传身份证正面照</h5>
				<div class="identify-upload identify-common">
					<img src="./../../../assets/images/upidcard.png" alt="">
				</div>
			</div>
			<div class="identify-face">
				<h5>人脸识别扫描</h5>
				<div class="identify-scan identify-common">
					<img src="./../../../assets/images/upface.png"  alt="">
				</div>
			</div>
			<div class="identify-btn">
				<div>上传</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	  name: 'identify',
	  data () {
	    return {
	    	cityName:localStorage.getItem('cityName') || ''
	    }
	  },
	  methods:{
	  	onClickLeft(){
	  		this.$router.go(-1);
	  	},
	  }
	}
</script>
<style lang="stylus" type="text/stylus" scoped>
	.identify
		width 100%
		.identify-top-right
			display flex
			align-items center
			span
				font-size .28rem
				color #A6A0A0
				margin-left .06rem
		.identify-main
			width 100%
			padding-top 50px
			text-align center
			.identify-idcard
				margin-bottom .34rem
			.identify-common
				margin 0 auto
				overflow hidden
				max-width 5.68rem
				height 3.58rem
				border 1px solid #D6D6D6
				border-radius .12rem
				img
					width 100%
			
			h5				
				font-size .36rem
				color #5C5C5C
				line-height .5rem
				padding .2rem 0
			.identify-btn
				margin-top .64rem
				div
					margin 0 auto
					width 6.26rem
					height .88rem
					line-height .88rem
					text-align center
					background #CE3D3A
					color #fff
					font-size .36rem
					border-radius .44rem
	</style>
			
				