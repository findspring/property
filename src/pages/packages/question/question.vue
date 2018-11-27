<template>
	<div class="question">
		<van-nav-bar title="常见问题" left-arrow :fixed="true" :z-index="100" @click-left="onClickLeft">
			<div slot="left">
				<i class="common-icon icon-back"></i>
			</div>
		</van-nav-bar>
		<div class="question-main">
			<van-collapse v-model="activeNames">
			  <van-collapse-item title="有赞微商城" name="1">
			    提供多样店铺模板，快速搭建网上商城网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
			    <div class="question-bg"></div>
			  </van-collapse-item>
			  <van-collapse-item title="有赞零售" name="2">
		  		网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失			    
			    <div class="question-bg"></div>
			  </van-collapse-item>
			  <van-collapse-item title="有赞美业" name="3">
			    线上拓客，随时预约，贴心顺手的开单收银
			    <div class="question-bg"></div>
			  </van-collapse-item>
			</van-collapse>
		</div>
		<nav-bar :page="3"></nav-bar>	
	</div>
</template>

<script>
	import navBar from "components/navBar/navBar";
	export default {
	  name: 'question',
	  data () {
	    return {
	    	activeNames: [''],
	    }
	  },
	  components:{
	  	navBar
	  },
	  mounted(){
	  	this.getIssueList();
	  },
	  methods:{
	  	getIssueList(){
	  		let pageNum = 1;
  			let pageSize = 100;
	  		this.$http({
	  			method:'post',
	  			url:'/pub/customerComplaint/issueList',
	  			data:this.$qs.stringify({
	  				'bizType':2,
        		'pageNum':pageNum,
        		'pageSize':pageSize,
	  			})
	  		}).then((res) => {

	    	}).catch((err) => {
	      });
	  	},
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
	.question
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
		.question-main
			margin-top 46px
			.van-hairline--top-bottom
				&::after
					border none!important
				.van-collapse-item
					margin-left .32rem		
					.van-cell
						font-size .34rem
						color #333
						padding .28rem .32rem .28rem 0
						&::after
							display none
					.van-collapse-item__wrapper
						overflow inherit
						position relative
						.van-collapse-item__content
							padding .5rem .41rem 1.25rem 0
							font-size .3rem
							line-height 1.2
							color #999999
							// position relative
							.question-bg
								position absolute
								left -.32rem 
								bottom 0
								width 7.5rem
								height .1rem
								background #f5f5f5
					.van-collapse-item__title--expanded
						border-bottom 1px solid #EEEEEE
</style>