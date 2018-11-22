<template>
	<div class="members">
		<van-nav-bar title="家庭成员添加" left-arrow :fixed="true" :z-index="100" >
			<div slot="right" class="members-top-right">
				<i class="common-icon icon-position02"></i>
				<span>{{cityName}}</span>
			</div>
		</van-nav-bar>
		<div class="members-tab">
			<van-tabs v-model="active" color="#D45855" :line-width="64">
			  <van-tab title="添加成员">
			  	<div class="members-add">
			  		<form>
			  			<div class="members-add-item">
			  				<div>
			  					<p>姓名</p>
			  					<div>
			  						<input v-validate ="'required|valcode'" type="text" id="valcode" name="姓名" placeholder="请输入" v-model="name">
			  					</div>				  				
			  				</div>
				  			<span v-show="errors.has('姓名')">{{ errors.first('姓名')}}</span>	
			  			</div>
			  			<div class="members-add-item">
			  				<div>
			  					<p>门牌号</p>
			  					<div>
			  						<input v-validate ="'required|valcode'" type="text" id="valcode" name="门牌号" placeholder="请输入" v-model="houseNum">
			  					</div>				  				
			  				</div>
				  			<span v-show="errors.has('门牌号')">{{ errors.first('门牌号')}}</span>	
			  			</div>
			  			<div class="members-add-item">
			  				<div>
			  					<p>与户主关系</p>
			  					<div>
			  						<input v-validate ="'required|valcode'" type="text" id="valcode" name="与户主关系" placeholder="请输入" v-model="relationShip">
			  					</div>				  				
			  				</div>
				  			<span v-show="errors.has('与户主关系')">{{ errors.first('与户主关系')}}</span>	
			  			</div>			  			
			  			<div class="members-add-item">
			  				<div>
			  					<p>身份证号码</p>
			  					<div>
			  						<input v-validate ="'required|valcode'" type="text" id="valcode" name="身份证号码" placeholder="请输入" v-model="cdNum">
			  					</div>				  				
			  				</div>
				  			<span v-show="errors.has('身份证号码')">{{ errors.first('身份证号码')}}</span>	
			  			</div>
			  			<div class="common-btn fr" style="margin-top:.28rem">下一步</div>
			  		</form>
			  	</div>
			  </van-tab>
			  <van-tab title="我的家庭">
			  	<div class="members-family">
			  		<div class="members-family-item">
			  			<div class="members-family-img">
			  				<img src="./../../../assets/images/headimg02.png" alt="">
			  			</div>			  			
			  			<div class="members-family-content">
			  				<div class="members-family-top">
			  					<h4>任桂英</h4>
			  					<i class="common-icon icon-edit"></i>
			  				</div>
			  				<p>身份证号码：530623398954897603</p>
			  				<p>门牌号码：A234678</p>
			  				<p>与业主的关系：<span>业主</span></p>
			  			</div>
			  		</div>
			  	</div>
			  </van-tab>
			</van-tabs>
		</div>
			
	</div>
</template>

<script>
	export default {
	  name: 'members',
	  data () {
	    return {
	    	cityName:localStorage.getItem('cityName') || '',
	    	active:2,
	    	name:'',
	    	houseNum:'',
	    	relationShip:'',
	    	cdNum:''

	    }
	  }
	}
</script>

<style lang="stylus" type="text/stylus">
	.members
		min-height 12rem
		background #e8e8e8
		padding-bottom 1rem
		.members-top-right
			display flex
			align-items center
			span
				font-size .28rem
				color #A6A0A0
				margin-left .06rem
		.members-tab
			width 100%
			padding-top 46px
			.van-hairline--top-bottom
				&::after
					border:none
			.van-tabs
				font-weight 700
				.van-ellipsis	
					font-size .32rem
					color #5C5C5C	
			.van-tab--active	
				.van-ellipsis			
					color #D45855
			.van-tabs__line
				// width 1.28rem!important
				// left .3rem!important
				height .04rem!important
				// background-color #D45855!important
			.van-tabs__content
				padding .21rem
				background #e8e8e8
				.members-add
					width 100%
					padding .64rem .18rem 0 .22rem
					background #fff
					min-height 10rem
					border-radius .14rem
					box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17)
					.members-add-item
						div
							font-size .32rem
							p								
								color #A6A0A0
								letter-spacing 1px 
								padding-left .36rem
								line-height .45rem
								padding-bottom .12rem
							div
								width 100%
								font-weight 400
								height .94rem
								line-height .94rem
								background:rgba(250,250,250,1);
								// box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17)
								border 1px solid #D8D8D8
								border-radius .14rem
								input
									color #333
									width 100%
									height .4rem
									line-height .4rem
									padding .27rem 0
									text-indent .36rem
									background:rgba(250,250,250,1);
									&::placeholder
										color #ccc
						span
							font-size .24rem
							display block!important
							height .44rem
							line-height .44rem
							padding-left .4rem
							color red						
							
				.members-family
					// padding .18rem .17rem 0 .21rem						
					.members-family-item
						display flex
						background #fff
						width 100%
						padding .36rem .44rem .24rem .43rem
						border-radius .14rem
						box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17);
						.members-family-img
							img
								width 1rem
								height 1rem
								border-radius 50%
								overflow hidden
								margin-right .37rem
						.members-family-content
							max-width 4.8rem
							.members-family-top
								display flex
								justify-content space-between
								align-items center
								padding-bottom .08rem
								h4
									font-size .43rem
									color #4A4A4A
									line-height .61rem
									font-weight 400
							p
								font-size: .28rem
								color #9B9B9B
								line-height .42rem
								padding-bottom  .08rem
								span
									color #D45855
									
						
			
 
</style>