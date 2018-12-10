<template>
	<div class="visitorsInfo clearfix">
		<van-nav-bar title="访客详情" left-arrow  @click-left="onClickLeft">
			<!-- <div slot="right" @click="show"> -->
			<!-- <div slot="right" class="visitorsInfo-top-right">
				<i class="common-icon icon-position01"></i>
				<span>{{cityName}}</span>
			</div> -->
		</van-nav-bar>
		<div class="visitorsInfo-wrapper clearfix">
			<div class="visitorsInfo-main clearfix">
				<div class="visitorsInfo-headimg">
					<img :src="avatarUrl" alt="">
					<h4>{{owerName}}</h4>
				</div>
				<div class="visitorsInfo-content">
					<p>门牌号码：{{owerNum}}</p>
					<!-- <p>与业主的关系：<span>业主</span></p> -->
					<p>电话号码：{{phone}}</p>
					<p>身份证号码：{{idCardNo}}</p>
					<p>审批意见：</p>
					<textarea name="" v-model="auditOpinion">
						
					</textarea>
					<div class="audit-check-btns">
            <div class="audit-check-refused audit-btn" @click="proprietorAudit(2)">
              拒绝
            </div>
            <div class="audit-check-pass audit-btn" @click="proprietorAudit(1)">
              通过
            </div>
          </div>
				</div>
			</div>
		</div>
		<nav-bar :page="2"></nav-bar>
	</div>
</template>
<script>
	import navBar from "components/navBar/navBar";
	export default {
	  name: 'audit-info',
	  data () {
	    return {
	    	// cityName:localStorage.getItem('cityName') || '',
	    	avatarUrl:'',
	    	idCardNo:'',
	    	owerName:'',
	    	owerNum:'',
	    	phone:'',
	    	auditOpinion:'',
	    	status:false
	    }
	  },
	  components:{
	    navBar
	  },
	  beforeRouteLeave(to, from, next) {
      // 设置下一个路由的 meta
      if(this.status == false){
      	to.meta.keepAlive = false; // 跳转到 A 时让 A 不缓存，即刷新
      }else{
      	to.meta.keepAlive = true;
      }
      
      next();
    },
	  mounted(){
	  	let personnelId = this.$route.query.personnelId;
	  	this.getvisitorsInfo(personnelId);
	  },
	  methods:{
	  	getvisitorsInfo(personnelId){
	  		this.$http({
	  			method:'post',
	  			url:'/wechat/officialAccount/community/proprietorInfo',
	  			data:this.$qs.stringify({
        		'personnelId':personnelId,
	  			})
	  		}).then((res) => {
	  			let result = res.data.result;
	  			this.avatarUrl = result.avatarUrl;
	  			this.idCardNo = result.idCardNo;
	  			this.owerName = result.owerName;
	  			this.owerNum = result.owerNum;
	  			this.phone = result.phone;	  			
	    	}).catch((err) => {
	      });
	  	},
	  	proprietorAudit(auditSatus,personnelIds){
	  		console.log(this.auditOpinion);
	  		let personnelId = this.$route.query.personnelId;
        this.$http({
          method: "post",
          url: "/wechat/officialAccount/community/proprietorAudit",
          data: this.$qs.stringify({
            // 'authToken':localStorage.getItem('authToken'),
            'auditSatus':auditSatus,
            'personnelIds':personnelIds,
            'auditOpinion':this.auditOpinion

          })
        }).then((res) => {
          // if(auditSatus == 1){
          //   this.$toast({message:'审核通过！',duration:600});
          // }else if(auditSatus == 2){
          //   this.$toast({message:'审核拒绝！',duration:600});
          // }
          this.$router.push({path:'/visitors',query:{back:1}});
        }).catch((err) => {
        });
      },
	  	onClickLeft(){	  		
	  		this.status = true
	  		this.$router.go(-1);
	  	},
	  }
	}
</script>

<style lang="stylus" type="text/stylus">
	.visitorsInfo
		width 100%
		padding-bottom 1rem
		background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
		min-height 12rem
		.van-nav-bar
			background none
			.van-icon
				color #fff!important			
			.van-nav-bar__title
				font-weight 400!important
				color #fff!important
			.visitorsInfo-top-right
				display flex
				align-items center
				span
					font-size .28rem
					color #fff
					margin-left .06rem
		.visitorsInfo-wrapper
			padding 40px .21rem 0 .21rem
			width 100%
			.visitorsInfo-main
				width 100%
				height 9.4rem
				background #fff
				border-radius .14rem
				box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17)
				position relative
				.visitorsInfo-headimg
					position absolute
					left 50%
					top 0
					margin-left -.7rem
					margin-top: -.45rem
					overflow hidden
					text-align center
					img
						width 1.41rem
						height 1.41rem
						border-radius 50%
						overflow hidden
					h4
						font-weight 400
						font-size .43rem
						color #4A4A4A
						padding-top .2rem
				.visitorsInfo-content
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