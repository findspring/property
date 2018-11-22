<template>
	<div class="message">
		<van-nav-bar title="我的消息" left-arrow :fixed="true" :z-index="100">
			<div slot="left">
				<i class="common-icon icon-back"></i>
			</div>
			<!-- <div slot="right" @click="show"> -->
			<div slot="right">
				<i class="common-icon icon-date"></i>
			</div>
		</van-nav-bar>
		<!-- <v-header title="我的消息" :showBack="true" class="already-record"></v-header> -->
		<div class="message-box">
			<div class="message-box-item" @click="goMsgInfo">
				<div class="message-headimg">
					<img src="https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg" alt="">
				</div>				
				<div class="message-content">
					<div class="message-content-top">
						<h4>人脸识别不了</h4>
						<time>04月05日</time>
					</div>
					<div class="message-content-bottom">
						<p class="line-ellipsis01">视频过人脸验证，活体检测，为小米金融实现极速放款…</p>
						<badge text="1"></badge>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {Badge} from 'vux'
	export default {
	  name: 'message',
	  data () {
	    return {

	    }
	  },
	  components:{
	    Badge
	  },
	  methods:{
	  	goMsgInfo(){
	  		this.$router.push({path:'/msgInfo'})
	  	},
	  	onClickLeft(){
	  		this.$router.go(-1);
	  	},
	  	show(){
	  		alert(1);
	  	}
	  }
	}
</script>
<style lang="stylus" type="text/stylus">
	.message
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
		.message-box
			padding-top 58px
			width 100%
			.message-box-item
				display flex
				align-items center
				width 100%
				height 1.25rem
				padding 0 .23rem 0 .28rem
				border-bottom 1px solid #F7EFEF
				.message-headimg
					margin-right .06rem
					img
						width .95rem
						height .95rem
						border-radius 50%
						overflow hidden
				.message-content
					.message-content-top
						margin-bottom .08rem
						height .42rem
						display flex
						align-items center
						justify-content space-between
						h4
							font-size .3rem
							color #4A4A4A
						time
							font-size .18rem
							color #9D9D9F
					.message-content-bottom
						display flex
						align-items center
						justify-content space-between
						p
							max-width 5.6rem
							font-size .22rem
							color #9D9D9F
				
</style>