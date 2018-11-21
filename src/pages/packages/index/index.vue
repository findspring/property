<template>
	<div class="index-wrapper">
		<van-nav-bar title="阿尔法智汇" left-arrow :fixed="true" >
			<!-- <div slot="left" @click="show">
				aaa
			</div> -->
			<!-- <div slot="right" @click="show"> -->
			<div slot="right">
				111
			</div>
		</van-nav-bar>
		<!-- <v-header title="阿尔法智汇" :showBack="true" class="already-record"></v-header> -->
		<div class="index-main">
			<!-- 个人信息 -->
			<div class="index-info">
				<h3>ALFEYE</h3>
				<img src="./../../../assets/images/headimg01.png" alt="头像">
			</div>
			<!-- 搜索 -->
			<div class="index-search">
	      <div class="search-info">
	        <div ref="searchIcon" class="search-icon icon-search fl"></div>
	        <form  @submit.prevent="formSubmit" action="javascript:return true"> 
	        	<!-- <input ref="input" class="search-input" type="search" name="" value="" placeholder="search" @click="search" @blur="searchBlur" @keyup.13="keySearch"> -->
	          <input ref="input" class="search-input" type="search" name="" value="" placeholder="search" @click="search" @keyup.13="keySearch">
	        </form>
	      </div>    
	    </div>
	    <!-- 轮播图 -->
			<div class="index-swipe">
				<van-swipe :autoplay="3000">
				  <van-swipe-item v-for="(image, index) in images" :key="index">
				    <img v-lazy="image" />
				  </van-swipe-item>
				</van-swipe>
			</div>
			<!-- links -->
			<div class="index-links">
				<ul>
					<li>
						<div>
							<img src="./../../../assets/images/icon01.png" alt="">
							<p>访客通行</p>
						</div>
					</li>
					<li>
						<div>
							<img src="./../../../assets/images/icon02.png" alt="">
							<p>一键开门</p>
						</div>
					</li>
					<li>
						<div>
							<img src="./../../../assets/images/icon03.png" alt="">
							<p>小区头条</p>
						</div>
					</li>
					<li>
						<div>
							<img src="./../../../assets/images/icon04.png" alt="">
							<p>我的房屋</p>
						</div>
					</li>
					<li>
						<div>
							<img src="./../../../assets/images/icon05.png" alt="">
							<p>全部</p>
						</div>
					</li>
				</ul>
			</div>
			<!-- products -->
			<div class="index-products">
				<div class="index-products-title">
					<h4><span></span>猜你喜欢</h4>
				</div>
				<div class="index-products-all">
					<div class="index-products-item clearfix">
						<div class="index-products-img fl">
							<img src="./../../../assets/images/icon01.png" alt="">
						</div>
						<div class="index-products-content fl">
							<h5>单目闸机伴侣</h5>
							<p>AI-AD</p>
							<p class="index-intro">单目人脸识别摄像头+人脸识别</p>
							<div class="index-products-info">
								<div class="index-products-price">¥4079</div>
								<div class="index-goinfo">了解详情</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</div>		
	</div>
</template>
<script>
	import vHeader from "components/header/header";
	export default {
	  name:'index',
	  data () {
	    return {
	    	images: [
	    		// './../../../../static/images/banner.png',
	      //   './../../../../static/images/banner.png'
	        require('./../../../assets/images/banner.png'),
	        require('./../../../assets/images/banner.png'),
	      ]
	    }
	  },
	  components:{
	    vHeader
	  },
	  mounted(){
	  	this.getIndex();
	  },
	  methods:{
	  	formSubmit() {
	      return false
	    },
	    search(){

	    },
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
	.index-wrapper
		padding-bottom 1rem
		.index-main
			padding-top 46px
			width 6.82rem
			margin-left .35rem
			.index-info
				width 100%
				height 1.52rem
				display flex
				align-items center
				justify-content space-between
				h3
					font-size .4rem
				img
					width .9rem
					height .9rem
					border-radius 50%
					overflow hidden				
			.index-swipe
				width 100%
				height 3.64rem
				border-radius .14rem
				overflow hidden
				img
					width 100%
					height auto
			.index-search
				width 100%
				height .73rem
				background rgba(247,239,239,1)
				border-radius .14rem
				margin-bottom .27rem
				.search-info
					height .73rem
					.search-icon
						display block
						margin .2rem .3rem 0 .32rem
					input
						min-width 4rem
						font-size .34rem
						background rgba(247,239,239,1)
						height .35rem
						line-height .35rem
						padding .19rem 0
						color #333
			.index-links
				margin-top .47rem
				width 100%
				ul
					display flex
					align-items center
					justify-content space-around
					li
						width 20%
						text-align center
						img
							width .7rem
							height .73rem
						p
							font-size .22rem
							color #333
							line-height 1
							padding-top .12rem
			.index-products
				margin-top .7rem
				.index-products-title
					h4
						font-size .34rem
						color #333
						height .39rem
						line-height .39rem
						span
							display inline-block
							width .07rem
							height .39rem
							background #D45855 
							float left
							margin-right .12rem
				.index-products-item
					margin-top .4rem
					.index-products-img
						margin-right .25rem
						img
							width 2.06rem
							height 2.54rem
					.index-products-content
						width 4rem
						h5
							font-size .32rem
							color #333
							line-height .72rem
						p
							font-size .24rem
							color #A6A0A0
							padding-bottom .16rem
						.index-products-info
							margin-top .2rem
							display flex
							align-items center
							justify-content space-between
							.index-products-price
								font-size .4rem
								color #D45855
							.index-goinfo
								font-size .24rem
								color #EFEFEF
								width 1.4rem
								height .49rem
								line-height .49rem
								text-align center
								border-radius .245rem
								background #CE3D3A
								
						
					
				
</style>