<template>
	<div class="result clearfix">
		<van-nav-bar title="身份认证" left-arrow :fixed="true" @click-left="onClickLeft">
			<div slot="right" class="result-top-right">
				<i class="common-icon icon-position02"></i>
				<span>{{cityName}}</span>
			</div>
		</van-nav-bar>
		<div class="result-main">
			<!-- top -->
			<div class="result-top">
				<p>身份证提交不可修改</p>
				<div class="result-imgs">
					<div class="result-img">
						<img src="./../../../assets/images/upidcard.png" alt="">
					</div>
					<div class="result-img">
						<img src="./../../../assets/images/upidcard.png" alt="">
					</div>
				</div>
			</div>
			<!-- bottom -->
			<div class="result-bottom">
				<h5>请认真核对你的信息</h5>
				<form >
					<div class="result-form-two">
						<div class="result-item">
							<p>姓名</p>
							<div class="result-item-input">
								<input v-validate ="'required|valcode'" type="text" id="valcode" name="验证码" v-model="valcode">
								<i class="common-icon icon-edit"></i>
							</div>
							<span v-show="errors.has('验证码')">{{ errors.first('验证码')}}</span>
						</div>
						<div class="result-item">
							<p>性别</p>
							<div class="result-item-input">
								<input v-validate ="'required|valcode'" type="text" id="valcode" name="验证码" v-model="valcode">
								<i class="common-icon icon-edit"></i>
							</div>
							<span v-show="errors.has('验证码')">{{ errors.first('验证码')}}</span>
						</div>
					</div>
					<div class="result-form-first">
						<div class="result-item">
							<p>地址</p>
							<div class="result-item-input">
								<input v-validate ="'required|valcode'" type="text" id="valcode" name="验证码" v-model="valcode">
								<i class="common-icon icon-edit"></i>
							</div>
							<span v-show="errors.has('验证码')">{{ errors.first('验证码')}}</span>
						</div>
						<div class="result-item">
							<p>身份证号码</p>
							<div class="result-item-input">
								<input v-validate ="'required|valcode'" type="text" id="valcode" name="验证码" v-model="idNum" disabled="disabled">
							</div>
							<span v-show="errors.has('验证码')">{{ errors.first('验证码')}}</span>
						</div>
					</div>
					<div class="result-btn">
						<div>确认</div>
					</div>
				</form>
			</div>
		</div>
	</div>		
</template>
<script>
	export default {
	  name: 'result',
	  data () {
	    return {
	    	cityName:localStorage.getItem('cityName') || '',
	    	valcode:'',
	    	idNum:'1908231772323456789'
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
	.result
		width 100%
		padding-bottom 1.2rem
		.result-top-right
			display flex
			align-items center
			span
				font-size .28rem
				color #A6A0A0
				margin-left .06rem
		.result-main
			padding 50px .36rem 0 .36rem 
			width 100%
			.result-top
				p
					font-size .28rem
					color #ADADAD
					line-height .4rem
					padding-bottom .2rem
				.result-imgs
					display flex
					width 100%
					height 1.79rem
					align-items center
					justify-content space-between
					img
						width 3.2rem
						height 1.79rem
			.result-bottom
				width 100%
				h5
					margin .3rem 0 .4rem 0
					width 100%
					height .64rem
					line-height .64rem
					padding-left .19rem
					font-size .26rem
					color #D45855
					background #EFEFEF
					font-weight 400
				form
					.result-form-two
						display flex
						align-items center
						.result-item
							margin-right .36rem
							font-size .28rem
							p
								color #333
								line-height .4rem
								padding 0 0 .1rem .1rem
							.result-item-input
								position relative
								width 3.23rem
								height .8rem
								line-height .8rem
								border 1px solid #D8D8D8
								border-radius .14rem
								input
									height .4rem
									line-height .4rem
									padding .2rem 0
									text-indent .2rem
									color #ADADAD
									// &:placeholder
									// 	color #ADADAD
								i
									position absolute
									right .21rem
									top .21rem
							span
								height .3rem
								line-height .3rem
								font-size .24rem
								color red
								padding .1rem 0 0 .2rem
								display block!important
					.result-form-first
						width 100%
						.result-item
							width 100%
							font-size .28rem
							p
								color #333
								line-height .4rem
								padding 0 0 .1rem .1rem
							.result-item-input
								position relative
								width 100%
								height .8rem
								line-height .8rem
								border 1px solid #D8D8D8
								border-radius .14rem
								input
									min-width 5rem
									height .4rem
									line-height .4rem
									padding .2rem 0
									text-indent .2rem
									color #ADADAD
									background none
									box-sizing content-box
									// &:placeholder
									// 	color #ADADAD
								i
									position absolute
									right .21rem
									top .21rem
							span
								height .3rem
								line-height .3rem
								font-size .24rem
								color red
								padding .1rem 0 0 .2rem
								display block!important
					.result-btn
						width 100%
						margin-top .2rem
						display flex
						justify-content flex-end
						div
							width 2.4rem
							height .94rem
							line-height .94rem
							text-align center
							background:rgba(206,61,58,1)
							border-radius .47rem
							font-size .3rem
							color #FFFFFF
							
						
</style>