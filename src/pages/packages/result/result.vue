<template>
	<div class="result clearfix">
		<van-nav-bar title="身份认证" left-arrow :fixed="true" @click-left="onClickLeft">
			<!-- <div slot="right" class="result-top-right">
				<i class="common-icon icon-position02"></i>
				<span>{{cityName}}</span>
			</div> -->
		</van-nav-bar>
		<div class="result-main">
			<!-- top -->
			<div class="result-top">
				<p>身份证提交不可修改</p>
				<div class="result-imgs">
					<div class="result-img">
						<img :src="photoUrl" alt="">
					</div>
					<div class="result-img">
						<img :src="faceUrl" alt="">
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
								<input v-validate ="'required|realname'" type="text" id="realname" name="姓名" v-model="realname">
								<i class="common-icon icon-edit"></i>
							</div>
							<span v-show="errors.has('姓名')">{{ errors.first('姓名')}}</span>
						</div>
						<div class="result-item">
							<p>性别</p>
							<div class="result-item-input">
								<input v-validate ="'required|sex'" type="text" id="sex" name="性别" v-model="sex">
								<i class="common-icon icon-edit"></i>
								<popup-picker :data="sexList" v-model="sexVal" @on-change="changeSex"></popup-picker>
							</div>
							<span v-show="errors.has('性别')">{{ errors.first('性别')}}</span>
						</div>
					</div>
					<div class="result-form-first">
						<div class="result-item">
							<p>地址</p>
							<div class="result-item-input">
								<input v-validate ="'required|address'" type="text" id="address" name="地址" v-model="address">
								<i class="common-icon icon-edit"></i>								
							</div>
							<span v-show="errors.has('地址')">{{ errors.first('地址')}}</span>
						</div>
						<div class="result-item">
							<p>身份证号码</p>
							<div class="result-item-input">
								<input v-validate ="'required|idNum'" type="text" id="idNum" name="身份证号码" v-model="idNum" disabled="disabled">
							</div>
							<span v-show="errors.has('身份证号码')">{{ errors.first('身份证号码')}}</span>
						</div>
					</div>
					<div class="result-btn">
						<div @click="submit">确认</div>
					</div>
				</form>
			</div>
		</div>
	</div>		
</template>
<script>
	import { PopupPicker } from 'vux'
	export default {
	  name: 'result',
	  data () {
	    return {
	    	// cityName:localStorage.getItem('cityName') || '',
	    	valcode:'',
	    	idNum:'',
	    	faceUrl:'',
	    	photoUrl:'',
	    	realname:'',
	    	sex:'男',
	    	sexVal:['男'],
	    	sexList:[["男","女"]],
	    	address:'',
	    	keepStatus:false,
	    }
	  },
	  components:{
	  	PopupPicker
	  },	  
	  beforeRouteLeave(to, from, next) {
	  	if(this.keepStatus == true){
	  		to.meta.keepAlive = true;  
	  	}else{
	  		to.meta.keepAlive = false;   
	  	}         
      next();
    },
	  mounted(){
	  	this.getIdentityInfo();
	  	this.faceUrl = this.$route.query.faceUrl
	  	this.photoUrl = this.$route.query.photoUrl
	  },
	  // beforeRouteLeave(to, from, next) {
   //    // 设置下一个路由的 meta
   //    to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新
   //    next();
   //  },
	  methods:{
	  	changeSex(val){
	  		this.sex = val[0];
	  	},
	  	getIdentityInfo(){
	  		let authToken = localStorage.getItem("authToken")
	  		this.$http({
	        method: "post",
	        url: "/wechat/mini/user/identityInfo",
	        data: this.$qs.stringify({
	        	'authToken':authToken,
	        })
	      }).then((res) => {
	      	let result = res.data.result;
	      	this.idNum = result.idCardNo
	      	this.address = result.address
	      	this.realname = result.userName
	      	this.sex = result.gender
	      	this.sexVal = [''+result.gender+'']
	      	this.faceUrl = result.headPortraitUrl
	      	this.photoUrl = result.identityImgUrl
	    	}).catch((err) => {
	      });
	  	},
	  	onClickLeft(){
	  		this.keepStatus = true
	  		this.$router.go(-1);
	  	},
	  	submit(){
	  		this.$validator.validateAll().then((result) => {
        if (result) {
        	let authToken = localStorage.getItem("authToken")
        	this.$http({
		        method: "post",
		        url: "/wechat/mini/user/identityConfirm",
		        data: this.$qs.stringify({
		        	'authToken':authToken,
		        	'cardNum':this.idNum,
		        	'address':this.address,
		        	'gender':this.sex,
		        	'userName':this.realname,
		        })
		      }).then((res) => {
		      	this.$toast({message:'您的申请已提交审批',duration:600});
		      	setTimeout(() =>{
		      		this.goIndex();
		      	},600);		      	
		    	}).catch((err) => {
		      });
          return
        }else{
        	// this.$router.push({path:'/identify'});
        	this.$dialog.alert({message:'信息输入有误！'});
        }        
      })
	  	},
	  	goIndex(){
	  		if(this.$route.query.from == 'members'){
	  			this.$router.push({path:'/members',query:{from:'members'}})
	  		}else if(this.$route.query.from == 'mine'){
	  			this.$router.push({path:'/mine'})
	  		}else{
	  			this.$router.push({path:'/'})
	  		}	
	  	}
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
								.vux-cell-box
									position absolute
									left 0
									top 0
									width 100%
									height .8rem
									z-index 2
									opacity 0
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