<template>
	<div class="msgInfo clearfix">
		<van-nav-bar title="我的消息" left-arrow :fixed="true" :z-index="100" @click-left="onClickLeft">
			<div slot="left">
				<i class="common-icon icon-back"></i>
			</div>
			<!-- <div slot="right" @click="show"> -->
			<div slot="right">
				<i class="common-icon icon-date"></i>
			</div>
		</van-nav-bar>
		<div class="msgInfo-main">
			<div class="msgInfo-item">
				<time>04月05日</time>
				<div class="msgInfo-msg">
					<div class="msgInfo-headimg">
						<img src="./../../../assets/images/headimg05.png" alt="">
					</div>					
					<div class="msgInfo-context">
						<h5>人脸识别不了</h5>
						<p>通过深度学习技术，将用户照片与数据源照片（可以来自身份证，或者客户自己提供）进行精准匹配，判断身份一致性。</p>
						<p>通过深度学习技术，将用户照片与数据源照片（可以来自身份证，或者客户自己提供）进行精准匹配，判断身份一致性。</p>
						<img src="./../../../assets/images/banner.png" alt="">
					</div>
				</div>
			</div>
		</div>
		<nav-bar :page="3"></nav-bar>
	</div>
</template>

<script>
	import navBar from "components/navBar/navBar";
	export default {
	  name: 'msg-info',
	  data () {
	    return {

	    }
	  },
	  components:{
	    navBar
	  },
	  methods:{
	  	onClickLeft(){
	  		this.$router.go(-1);
	  	},
	  }
	}
</script>
<style lang="stylus" type="text/stylus">
	.msgInfo
		width 100%
		.van-nav-bar
			background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
			.icon-back
				margin-bottom .3rem
			.icon-date
				margin-bottom .26rem
			.van-nav-bar__title
				color #fff!important
				font-size .36rem!important
				font-weight 700!important
		.msgInfo-main
			padding 46px .59rem 0 .37rem
			width 100%
			.msgInfo-item
				width 100%				
				time
					display block
					width 1.89rem
					height .29rem
					line-height .29rem
					margin .24rem auto
					background:rgba(216,216,217,1)
					border-radius .15rem
					text-align center
					font-size .18rem
					color #fff
				.msgInfo-msg
					display flex
					.msgInfo-headimg
						img
							width .59rem
							height .59rem
							border-radius 50%
							overflow hidden
							margin-right .16rem
					.msgInfo-context
						width 5.79rem
						padding .1rem .2rem .3rem .15rem
						border-radius 0 .4rem .4rem .4rem
						background #E7E6EB
						h5
							font-size .28rem
							color #4A4A4A
							line-height .4rem
							padding-bottom .2rem
						p
							font-size .24rem
							color #4A4A4A
							line-height 1.2
							padding-bottom .3rem
							text-align justify
							max-width 5rem
						img
							max-width 5.28rem
						
					
		
</style>