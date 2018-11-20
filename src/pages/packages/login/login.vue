<template>
	<div class="login">
		<h2>欢迎使用智能门禁</h2>
		<form id="login-form">
			<div class="login-item">
				<div class="login-top">
					<div class="login-phone fl">
						<i class="icon login-icon icon-phone"></i>
		      	<input v-validate ="'required|phone'" type="text" id="phone" name="手机号" placeholder="我的手机" v-model="phone">
					</div>
					<div class="login-code fr" v-if="codeStatus"  @click="sendCode">获取验证码</div>
					<div class="login-code fr" v-else>{{time}}s后重新获取</div>		      
		    </div>
		    <span v-show="errors.has('手机号')">{{ errors.first('手机号')}}</span>
			</div>
			<div class="login-item">
				<div class="login-top">
		      <i class="icon login-icon icon-code"></i>
		      <input v-validate ="'required|valcode'" type="text" id="valcode" name="验证码" placeholder="验证码" v-model="valcode">
		    </div>
		    <span v-show="errors.has('验证码')">{{ errors.first('验证码')}}</span>
			</div>
			<div class="login-item">
				<div class="login-top">
		      <i class="icon login-icon icon-address"></i>
		      <input v-validate ="'required|valcode'" type="text" id="valcode" name="社区地址" placeholder="社区地址" v-model="address">
		    </div>
		    <span v-show="errors.has('社区地址')">{{ errors.first('社区地址')}}</span>
			</div>
			<div class="login-item">
				<div class="login-top">
		      <i class="icon login-icon icon-house"></i>
		      <input v-validate ="'required|house'" type="text" id="house" name="门牌号码" placeholder="门牌号码">
		    </div>
		    <span v-show="errors.has('门牌号码')">{{ errors.first('门牌号码')}}</span>
			</div>	
			<div class="login-btn bg-gray" v-if="loginStatus" @click="validateBeforeSubmit">下一步</div>
			<div class="login-btn" v-else>下一步</div>
		</form>
	</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
    	codeStatus:true,
    	time:60,
    	loginStatus:true,
    	phone:'',
    	valcode:'',
    	address:'',
    	house:'',

    }
  },
  methods:{
  	sendCode(){
    	this.codeStatus = false;
    	let timer = setInterval(() => {
    	  if (this.time > 1) {
	        this.time--;
	      }else{
          this.codeStatus = true;
          this.time = 60;
	      	clearInterval(timer);
	      }
    	}, 1000)
    	// let phoneNumber = this.phoneNumber;
    	// this.$http({
     //    method: "post",
     //    url: "/tibes-userservice/user/phoneCode",
     //    data: this.$qs.stringify({'phoneNumber':phoneNumber})
     //  }).then((res) => {
    	// }).catch((err) => {
     //  });
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          alert('验证成功');
          return
        }

        alert('验证失败')
      })
    }
  }
}
</script>
<style lang="stylus" type="text/stylus" scoped>
	.login
		h2
			font-size .38rem;
			color #333
			text-align center
			padding 1.13rem 0 .67rem 0
		#login-form
			margin-left .54rem
			width 6.42rem
			.login-item
				.login-top
					width 100%
					height .96rem
					line-height .96rem
					border-radius .48rem
					background #f5f5f5
					overflow hidden
					.icon
						display block
						float left
						margin .31rem .25rem 0 .57rem
					input
						min-width 3rem
						font-size .28rem
						color #333
						background #f5f5f5
						height .3rem
						line-height .3rem
						padding .33rem 0
						::palceholder
							color #A6A0A0					
					.login-phone
						width 4.18rem
						height .96rem
						input
							width 2rem
					.login-code 
						font-size: .28rem
						width 2.24rem
						text-align center
						background #D45855
						color #FBFBFB
						cursor pointer
				span
					font-size .24rem
					display block!important
					height .35rem
					line-height .35rem
					padding-left .4rem
					color red
			.login-btn
				margin-top .05rem
				width 6.42rem
				height .96rem
				line-height .96rem
				font-size .38rem
				border-radius .48rem
				text-align center
				background #D45855
				color #fff
				
		
</style>