<template>
	<div class="index-wrapper">
		<!-- <van-nav-bar title="阿尔法智汇" left-arrow :fixed="true" @click-left="onClickLeft">
			<div slot="right" class="index-top-right">
				<i class="common-icon icon-position02"></i>
				<span>{{cityName}}</span>
			</div>
		</van-nav-bar> -->
		<!-- <v-header title="阿尔法智汇" :showBack="true" class="already-record"></v-header> -->
		<div class="index-main">
			<!-- 个人信息 -->
			<!-- <div class="index-info">
				<h3>ALFEYE</h3>
				<img src="./../../../assets/images/headimg01.png" alt="头像">
			</div> -->
			<!-- 搜索 -->
			<!-- <div class="index-search">
	      <div class="search-info">
	        <div ref="searchIcon" class="search-icon common-icon icon-search01 fl"></div>
	        <form  @submit.prevent="formSubmit" action="javascript:return true"> 
	        	<input ref="input" class="search-input" type="search" name="" value="" placeholder="search" @click="search" @blur="searchBlur" @keyup.13="keySearch">
	          <input ref="input" class="search-input" type="search" name="" value="" placeholder="search" @click="search" @keyup.13="keySearch">
	        </form>
	      </div>    
	    </div> -->
	    <!-- 轮播图 -->
			<!-- <div class="index-swipe">
				<van-swipe :autoplay="3000">
				  <van-swipe-item v-for="(image, index) in images" :key="index">
				    <img v-lazy="image" />
				  </van-swipe-item>
				</van-swipe>
			</div> -->
			<!-- links -->
			<div class="index-links">
				<ul>
					<li v-for="(item,index) in linkArr" :key="index"  @click="goItem()">
						<div>
							<img :src="item.imgUrl" alt="">
							<p>{{item.content}}</p>
						</div>
					</li>
				</ul>
				<!-- <ul>
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
				</ul> -->
			</div>
			<!-- 通知 -->
			<div class="index-notices">
				<div class="index-notices-left">
					<h2>小区</h2>
					<h2 class="red">头条</h2>
				</div>
				<div class="index-notices-right">
					<marquee>
	          <marquee-item v-for="i in 3" :key="i" @click.native="goNotice(i)">
	          	<p class="line-ellipsis02">{{(i)}}.大家好！由于节能施工改造，二期地源热泵机房于明天（12月4日）上午8点30分到8点30分到……</p>
	          </marquee-item>
	        </marquee>
				</div>
			</div>
			<!-- 项目 -->
			<div class="index-items">
				<div class="index-items-list">
					<div class="index-items-infos" v-for="(item,index) in itemArr" :key="index" @click="goItem()">
						<img :src="item.imgUrl" alt="">
						<p>{{item.content}}</p>
					</div>
				</div>
				<!-- <div class="index-items-list">
					<div class="index-items-infos">
						<img src="../../../assets/images/item01.png" alt="">
						<p>物业缴费</p>
					</div>
					<div class="index-items-infos">
						<img src="../../../assets/images/item02.png" alt="">
						<p>访客邀请</p>
					</div>
					<div class="index-items-infos">
						<img src="../../../assets/images/item03.png" alt="">
						<p>停车缴费</p>
					</div>
					<div class="index-items-infos">
						<img src="../../../assets/images/item04.png" alt="">
						<p>小区公告</p>
					</div>
					<div class="index-items-infos">
						<img src="../../../assets/images/item05.png" alt="">
						<p>挪车服务</p>
					</div>
					<div class="index-items-infos">
						<img src="../../../assets/images/item06.png" alt="">
						<p>投诉建议</p>
					</div>
				</div> -->
			</div>
			<!-- products -->
			<!-- <div class="index-products">
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
				
			</div> -->
		</div>
		<v-develop v-show="developStatus" @closeDevelop="closeDevelop"></v-develop>
		<nav-bar :page="0"></nav-bar>		
	</div>
</template>
<script>
	import { Marquee, MarqueeItem } from 'vux'
	import vDevelop from "components/develop/develop";
	import navBar from "components/navBar/navBar";
	export default {
	  name:'index',
	  data () {
	    return {
	    	// cityName:localStorage.getItem('cityName') || '',
	    	images: [
	    		// './../../../../static/images/banner.png',
	      //   './../../../../static/images/banner.png'
	        require('./../../../assets/images/banner.png'),
	        require('./../../../assets/images/banner.png'),
	      ],
	      linkArr:[
	      	{imgUrl:require('./../../../assets/images/icon01.png'),content:'访客通行'},
	      	{imgUrl:require('./../../../assets/images/icon02.png'),content:'一键开门'},
	      	{imgUrl:require('./../../../assets/images/icon03.png'),content:'小区头条'},
	      	{imgUrl:require('./../../../assets/images/icon04.png'),content:'我的房屋'},
	      	{imgUrl:require('./../../../assets/images/icon05.png'),content:'全部'},
	      ],
	      itemArr:[
	      	{imgUrl:require('./../../../assets/images/item01.png'),content:'物业缴费'},
	      	{imgUrl:require('./../../../assets/images/item02.png'),content:'访客邀请'},
	      	{imgUrl:require('./../../../assets/images/item03.png'),content:'停车缴费'},
	      	{imgUrl:require('./../../../assets/images/item04.png'),content:'小区公告'},
	      	{imgUrl:require('./../../../assets/images/item05.png'),content:'挪车服务'},
	      	{imgUrl:require('./../../../assets/images/item06.png'),content:'投诉建议'},
	      ],
	      developStatus:false,
	    }
	  },
	  components:{
	    navBar,Marquee, MarqueeItem,vDevelop
	  },
	  mounted(){
      // laydate.render({
      //     elem: '#test1',
      //     range: true
      // });
	  	this.getProprietorList();
	  },
	  methods:{
	  	closeDevelop(val){
	  		this.developStatus = val;
	  	},
	  	goItem(){
	  		this.developStatus = true;
	  		// this.$dialog.alert({
	  		// 	message:'即将上线'
	  		// })
	  	},
	  	goNotice(i){
	  		this.developStatus = true;
	  		// this.$dialog.alert({
	  		// 	message:'即将上线'
	  		// })
	  	},
	  	formSubmit() {
	      return false
	    },
	    onClickLeft(){
	    	return 
	  		this.$router.go(-1);
	  	},
	    search(){

	    }, 
	  	getProprietorList(){ //业主列表接口
	  		let day = new Date();
	  		let cityCode = this.cityCode;
	  		let pageNum = 1;
	  		let pageSize = 100;
	  		let auditStatus = 1;
	  		let search = '';
	  		this.$http({
	  			method:'post',
	  			url:'/wechat/officialAccount/community/proprietorList',
	  			data:this.$qs.stringify({
	  				'auditStatus':auditStatus,
        		'pageNum':pageNum,
        		'pageSize':pageSize,
        		'search':search
	  			})
	  		}).then((res) => {

	    	}).catch((err) => {
	      });
	  	}
	  }
	}
</script>

<style lang="stylus" type="text/stylus" scoped>
	.index-wrapper
		.index-top-right
			display flex
			align-items center
			span
				font-size .28rem
				color #A6A0A0
				margin-left .06rem
		.index-main
			// padding-top 46px
			width 100%
			padding 0 .37rem
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
				margin-top .33rem
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
			.index-notices
				width 100%
				height 1.46rem
				border-radius .2rem
				border 1px solid #D8D8D8
				margin .32rem 0 .26rem 0
				padding .42rem .41rem .29rem .47rem
				display flex
				align-items center
				justify-content space-between
				.index-notices-left
					min-width .72rem
					height .72rem
					padding-right .2rem
					border-right 1px solid #D8D8D8
					// display flex
					// align-items center
					// justify-content center
					// flex-direction column
					h2
						min-width .72rem
						font-size .32rem
						color #333
						line-height .36rem
					.red
						color #D45855
				.index-notices-right
					width 4.8rem
					margin-left .11rem
					height .72rem
					p
						font-size: .24rem
						color #4A4A4A
						line-height .36rem
						width 100%
						height .72rem
			.index-items
				width 100%
				padding-bottom .3rem
				.index-items-list
					width 100%
					display flex
					align-items center
					justify-content space-between
					flex-wrap: wrap;
					.index-items-infos
						width 3.24rem
						height 2.06rem
						margin-bottom .31rem
						display flex
						align-items center
						justify-content center
						flex-direction: column
						border 1px solid #D8D8D8
						border-radius .2rem
						text-align center
						img
							width 1.1rem
						p
							font-size .3rem
							color #333
							font-weight: 700
							padding-top .18rem
				 		
			// .index-products
			// 	margin-top .7rem
			// 	.index-products-title
			// 		h4
			// 			font-size .34rem
			// 			color #333
			// 			height .39rem
			// 			line-height .39rem
			// 			span
			// 				display inline-block
			// 				width .07rem
			// 				height .39rem
			// 				background #D45855 
			// 				float left
			// 				margin-right .12rem
			// 	.index-products-item
			// 		margin-top .4rem
			// 		.index-products-img
			// 			margin-right .25rem
			// 			img
			// 				width 2.06rem
			// 				height 2.54rem
			// 		.index-products-content
			// 			width 4rem
			// 			h5
			// 				font-size .32rem
			// 				color #333
			// 				line-height .72rem
			// 			p
			// 				font-size .24rem
			// 				color #A6A0A0
			// 				padding-bottom .16rem
			// 			.index-products-info
			// 				margin-top .2rem
			// 				display flex
			// 				align-items center
			// 				justify-content space-between
			// 				.index-products-price
			// 					font-size .4rem
			// 					color #D45855
			// 				.index-goinfo
			// 					font-size .24rem
			// 					color #EFEFEF
			// 					width 1.4rem
			// 					height .49rem
			// 					line-height .49rem
			// 					text-align center
			// 					border-radius .245rem
			// 					background #CE3D3A
								
						
					
				
</style>