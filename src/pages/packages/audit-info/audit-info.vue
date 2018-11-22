<template>
	<div class="auditInfo clearfix">
		<van-nav-bar title="审核详情" left-arrow>
			<!-- <div slot="right" @click="show"> -->
			<div slot="right" class="auditInfo-top-right">
				<i class="common-icon icon-position01"></i>
				<span>深圳</span>
			</div>
		</van-nav-bar>
		<div class="auditInfo-wrapper clearfix">
			<div class="auditInfo-main clearfix">
				<div class="auditInfo-headimg">
					<img src="./../../../assets/images/headimg01.png" height="141" width="141" alt="">
					<h4>傅小小</h4>
				</div>
				<div class="auditInfo-content">
					<p>门牌号码：A234678</p>
					<p>与业主的关系：<span>业主</span></p>
					<p>电话号码：19320625035</p>
					<p>身份证号码：530623398954897603</p>
					<p>审批意见：</p>
					<textarea name="">
						
					</textarea>
					<div class="audit-check-btns">
            <div class="audit-check-refused audit-btn">
              拒绝
            </div>
            <div class="audit-check-pass audit-btn">
              通过
            </div>
          </div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
	  name: 'audit-info',
	  data () {
	    return {

	    }
	  }
	}
</script>

<style lang="stylus" type="text/stylus">
	.auditInfo
		width 100%
		padding-bottom 1rem
		background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
		min-height 12rem
		.van-nav-bar
			background none
			.van-icon
				color #fff!important			
			.van-nav-bar__title
				color #fff!important
			.auditInfo-top-right
				display flex
				align-items center
				span
					font-size .28rem
					color #fff
					margin-left .06rem
		.auditInfo-wrapper
			padding 50px .21rem 0 .21rem
			width 100%
			.auditInfo-main
				width 100%
				height 9.4rem
				background #fff
				border-radius .14rem
				box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17)
				position relative
				.auditInfo-headimg
					position absolute
					left 50%
					top 0
					margin-left -.7rem
					margin-top: -.7rem
					overflow hidden
					text-align center
					img
						width 1.41rem
						height 1.41rem
						border-radius 50%
						overflow hidden
					h4
						font-size .43rem
						color #4A4A4A
						padding-top .2rem
				.auditInfo-content
					width 100%
					padding 2.5rem .6rem 0 .6rem
					p
						font-size .3rem
						color #9B9B9B
						line-height .42rem
						padding-bottom .08rem
						span
							color #D45855
					textarea
						margin-top .2rem
						resize none 
						font-size .28rem
						padding .1rem
						line-height 1.3
						width 100%
						height 2.6rem
						background:rgba(250,250,250,1);
						border-radius:14px;
						border:1px solid #D8D8D8
					.audit-check-btns
						margin-top .36rem
						width 100%
						display flex
						align-items center
						justify-content center
						.audit-check-refused
							background #F7EFEF
							color #9B9B9B
							margin-right .44rem
						.audit-check-pass
							background #D45855
							color #fff
</style>