<template>
	<div class="login">
		<h2>欢迎使用智能门禁</h2>
		<!-- <div class="login-input" v-show="addressStatus">
			<div class="login-input-bg" @click="hideSearch"></div>
			<input type="text" v-on:input="searchCommunityList()" id="valcode" placeholder="请输入社区地址" v-model="address">
			<div class="login-input-content">
				<ul v-for="(item,index) in searchArr" :key="index">
					<li  @click="chooseCommunity(item.communityName)">{{item.communityName}}</li>
				</ul>
			</div>				
		</div> -->
		<form id="login-form">
			<div class="login-item">
				<div class="login-top">
					<div class="login-phone fl">
						<i class="icon login-icon icon-phone"></i>
		      	<input v-validate ="'required|phone'" type="number" id="phone" name="手机号" placeholder="我的手机" v-model="phone">
					</div>
					<!-- <div class="login-code fr" v-if="codeStatus"  @click="sendCode">获取验证码</div>
					<div class="login-code fr" v-else>{{time}}s后重新获取</div>	 -->	      
		    </div>
		    <span v-show="errors.has('手机号')">{{ errors.first('手机号')}}</span>
			</div>
			<div class="login-item">
				<div class="login-top">
		      <i class="icon login-icon icon-code"></i>
		      <input v-validate ="'required|valcode'" type="text" id="valcode" name="验证码" placeholder="验证码" readonly="readonly" v-if="disabled" v-model="valcode"  @click="canInput">
		      <input v-validate ="'required|valcode'" type="text" id="valcode" name="验证码" placeholder="验证码" v-else v-model="valcode">
		      <div class="login-code fr" v-if="codeStatus"  @click="sendCode">获取验证码</div>
					<div class="login-code fr" v-else>{{time}}s后重新获取</div>	
		    </div>
		    <span v-show="errors.has('验证码')">{{ errors.first('验证码')}}</span>
			</div>			
			<div class="login-item">
				<div class="login-top">
		      <i class="icon login-icon icon-address"></i>
		      <input v-validate ="'required|house'" type="text" id="community" name="社区地址" placeholder="社区地址" readonly="readonly" v-model="address" onfocus="this.blur()" >	      
		      <i class="common-icon icon-more"></i>
		      <select v-model="select" @change="changeSelect" id="selectAdd">
            <option v-for="(item,index) in addressList" :key="index" :value="item.value">{{item.name}}</option>
       	 	</select>
		      <!-- <popup-picker v-if="addressList&&addressList.length" :data="addressList" v-model="value1" :columns="1" show-name @on-change="changePicker"></popup-picker> -->
		    </div>
		    <span v-show="errors.has('社区地址')">{{ errors.first('社区地址')}}</span>
			</div>
			<div class="login-item">
				<div class="login-top">
		      <i class="icon login-icon icon-house"></i>
		      <input v-validate ="'required|house'" type="text" id="house" name="门牌号码" placeholder="门牌号码" v-model="house" >
		    </div>
		    <span v-show="errors.has('门牌号码')">{{ errors.first('门牌号码')}}</span>
			</div>	
			<div class="login-btn bg-gray" v-if="loginStatus" @click="validateBeforeSubmit">下一步</div>
			<div class="login-btn" v-else>下一步</div>
		</form>
	</div>
</template>

<script>
import { PopupPicker } from 'vux'
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
    	fCityCode:'110000',
    	addressStatus:false,
    	searchArr:[],
    	value1: [],
    	addressList: [],
    	disabled:true,
    	select:''
    }
  },
  components:{
  	PopupPicker
  },
  mounted(){
  	this.getCommunityList();
  },
  methods:{
  	changeSelect(){
  		let selectAdd = document.getElementById('selectAdd');
  		let index = selectAdd.selectedIndex;
  		this.address = selectAdd[index].text
  	},
  	canInput(){
  		if(this.disabled == true){
  			this.$dialog.alert({message:"请先获取验证码"})
  		}else{

  		}
  	},
  	changePicker(val){
      this.address = val[0];
    },
  	showSearch(){
  		this.addressStatus = true
  	},
  	hideSearch(){
  		this.addressStatus = false
  	},
  	chooseCommunity(val){
  		console.log(val);
  		this.address = val;
  		this.addressStatus = false
  	},
  	searchCommunityList(){
  		let communityName = this.address;
  		let pageNum = 1;
  		let pageSize = 100;
			this.$http({
        method: "post",
        url: "/pub/pubBase/communityList",
        data: this.$qs.stringify({
        	'communityName':communityName,
        	'pageNum':pageNum,
        	'pageSize':pageSize
        })
      }).then((res) => {
      	let result = res.data.result;
      	this.searchArr = result.list
    	}).catch((err) => {
      });
  		console.log(this.address)
  	},
  	getCommunityList(){
  		let pageNum = 1;
  		let pageSize = 10000;
			this.$http({
        method: "post",
        url: "/pub/pubBase/communityList",
        data: this.$qs.stringify({
        	'pageNum':pageNum,
        	'pageSize':pageSize
        })
      }).then((res) => {
      	let list = res.data.result.list;
      	list.forEach((item,index) => {
      	  this.addressList.push({name:item.communityName,value:item.id})
      	})
      	// this.addressList = listArr;
      	console.log(this.addressList)
    	}).catch((err) => {
      });
  	},
  	getCityList(){
  		let fCityCode = this.fCityCode;
  		let pageNum = 1;
  		let pageSize = 100;
			this.$http({
        method: "post",
        url: "/pub/pubBase/cityList",
        data: this.$qs.stringify({
        	'fCityCode':fCityCode,
        	'pageNum':pageNum,
        	'pageSize':pageSize
        })
      }).then((res) => {
    	}).catch((err) => {
      });
  	},
  	sendCode(){
  		this.$validator.validate('手机号',this.phone).then((result) => {
        if (result) {
          this.codeStatus = false;
          this.disabled = false
		    	let timer = setInterval(() => {
		    	  if (this.time > 1) {
			        this.time--;
			      }else{
		          this.codeStatus = true;
		          this.time = 60;
			      	clearInterval(timer);
			      }
		    	}, 1000)
		    	let phoneNumber = this.phone;
		    	this.$http({
		        method: "post",
		        url: "/pub/pubBase/queryVcode",
		        data: this.$qs.stringify({'phone':phoneNumber})
		      }).then((res) => {
		    	}).catch((err) => {
		      });
          return
        }
        console.log('验证失败')
        return
      }); 		  				    	
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
        	this.$http({
		        method: "post",
		        url: "/wechat/officialAccount/user/phoneRegister",
		        data: this.$qs.stringify({
		        	'userType':1,
		        	'verCode':this.valcode,
		        	'communityId':this.select,
		        	'phone':this.phone,
		        	'owerNum':this.house,
		        })
		      }).then((res) => {
		      	if(res.data.errCode == '0'){
		      		this.$router.push({path:'/identify'});
		      	}else{
		      		return false
		      	}		      	
		      	// this.$router.push({path:'/identify',query:{owerNum:this.house}});
		    	}).catch((err) => {
		      });
          
          // this.$dialog.alert({message:'验证成功'});
          return
        }else{
        	// this.$router.push({path:'/identify'});
        	this.$dialog.alert({message:'验证失败'});
        }        
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
		.login-input
			width  100%
			height 100%
			// background rgba(0,0,0,.3)
			position fixed
			left  0 
			top 0
			bottom 0
			z-index 101
			.login-input-bg
				width  100%
				height 100%
				background rgba(0,0,0,.3)
				position fixed
				left  0 
				top 0
				bottom 0
				z-index 102
			input 
				position absolute
				left 0 
				top 0
				width 100%
				height .3rem
				line-height .3rem
				padding .3rem 0
				text-indent .2rem
				box-sizing content-box
				z-index 103
			.login-input-content
				position absolute
				border-top 1px solid #ccc
				left 0 
				top .9rem
				width 100%
				background #fff
				z-index 103
				ul
					width 100%
					li
						height .8rem
						line-height .8rem
						border-bottom 1px solid #ccc
						text-indent .2rem								
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
					position relative
					.icon
						display block
						float left
						margin .31rem .25rem 0 .57rem
					.icon-more
						position absolute
						right .4rem
						top  .3rem
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
					select
						position absolute
						width 100%
						height .96rem
						left 0
						top  0
						z-index 10 
						opacity:0	
						overflow hidden
					.vux-cell-box
						position absolute
						width 100%
						height .96rem
						left 0
						top  0
						z-index 10 
						opacity:0	
						overflow hidden		
					.login-phone
						width 4.18rem
						height .96rem
						input
							width 2rem
					.login-code 
						position absolute
						right 0
						top 0
						z-index 10
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