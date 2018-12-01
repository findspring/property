<template>
	<div class="members">
		<van-nav-bar title="家庭成员添加" left-arrow :fixed="true" :z-index="100" @click-left="onClickLeft">
			<div slot="right" class="members-top-right">
				<i class="common-icon icon-position02"></i>
				<span>{{cityName}}</span>
			</div>
		</van-nav-bar>
		<div class="members-tab">
			<van-tabs v-model="active" color="#D45855" :line-width="64" sticky :offset-top="46" @change="changeTab">
			  <van-tab :title="titleName">
			  	<div class="members-add">
			  		<form>
			  			<div class="members-add-item">
			  				<div>
			  					<p>姓名</p>
			  					<div>
			  						<input v-validate ="'required|realname'" type="text" id="realname" name="姓名" placeholder="请输入" v-model="realname">
			  					</div>				  				
			  				</div>
				  			<span v-show="errors.has('姓名')">{{ errors.first('姓名')}}</span>	
			  			</div>
			  			<div class="members-add-item">
			  				<div>
			  					<p>门牌号</p>
			  					<div>
			  						<input v-validate ="'required|house'" type="text" id="house" name="门牌号" placeholder="请输入" v-model="houseNum">
			  					</div>				  				
			  				</div>
				  			<span v-show="errors.has('门牌号')">{{ errors.first('门牌号')}}</span>	
			  			</div>
			  			<div class="members-add-item">
			  				<div>
			  					<p>与户主关系</p>
			  					<div>
			  						<input v-validate ="'required|relationShip'" type="text" id="relationShip" name="与户主关系" placeholder="请选择" v-model="relationShip">
			  						<popup-picker :data="list1" v-model="value1" @on-change="onChange" placeholder="111"></popup-picker>
			  					</div>				  				
			  				</div>
				  			<span v-show="errors.has('与户主关系')">{{ errors.first('与户主关系')}}</span>	
			  			</div>			  			
			  			<div class="members-add-item">
			  				<div>
			  					<p>身份证号码</p>
			  					<div>
			  						<input v-validate ="'required|idNum'" type="text" id="idNum" name="身份证号码" placeholder="请输入" v-model="idNum">
			  					</div>				  				
			  				</div>
				  			<span v-show="errors.has('身份证号码')">{{ errors.first('身份证号码')}}</span>	
			  			</div>
			  			<div class="common-btn fr" style="margin-top:.28rem" @click="nextStep">下一步</div>
			  		</form>
			  	</div>
			  </van-tab>
			  <van-tab title="我的家庭">
			  	<div class="members-family">
			  		<div class="members-family-item" v-for="(item,index) in familyArr" :key="index" >
			  			<div class="members-family-img">
			  				<img src="./../../../assets/images/headimg02.png" alt="">
			  			</div>			  			
			  			<div class="members-family-content">
			  				<div class="members-family-top">
			  					<h4>{{item.familyTiesName}}</h4>
			  					<i class="common-icon icon-edit" @click="editMember(item)"></i>
			  				</div>
			  				<p>身份证号码：{{item.familyTiesIdCard}}</p>
			  				<p>门牌号码：{{item.familyTiesOwerNum}}</p>
			  				<p>与业主的关系：<span>{{item.familyTiesRelation}}</span></p>
			  			</div>
			  		</div>
			  	</div>
			  </van-tab>
			</van-tabs>
		</div>
		<nav-bar :page="1"></nav-bar>	
	</div>
</template>
<script>
	import { PopupPicker } from 'vux'
	import navBar from "components/navBar/navBar";
	export default {
	  name: 'members',
	  data () {
	    return {
	    	cityName:localStorage.getItem('cityName') || '',
	    	src1:require('./../../../assets/images/upidcard.png'),
	    	src2:require('./../../../assets/images/upface.png'),
	    	active:0,
	    	realname:'',
	    	houseNum:'',
	    	relationShip:'',
	    	idNum:'',
	    	msgStatus:true,
	    	photoStatus:false,
	    	value1: ['父母'], //当前选择关系
	    	list1: [['父母', '夫妻', '子女', '亲友', '租客', '其他']],
	    	familyArr:[],
	    	titleName:'添加成员'
	    }
	  },
	  components:{
	  	navBar,PopupPicker
	  },
	  mounted(){
	  	this.getMemberList();
	  },
	  beforeRouteLeave(to, from, next) {
      // 设置下一个路由的 meta
      to.meta.keepAlive = false; // 跳转到 A 时让 A 不缓存，即刷新
      next();
    },
	  methods:{
	  	editMember(item){
	  		this.titleName = "编辑成员"
	  		this.active = 0
	  		this.realname = item.familyTiesName
	  		this.houseNum = item.familyTiesOwerNum
	  		this.relationShip = item.familyTiesRelation
	  		this.value1 = [''+item.familyTiesRelation+'']
	  		this.idNum = item.familyTiesIdCard
	  	},
	  	changeTab(index){
	  		if(index == 1 && this.titleName == "编辑成员"){
	  			this.titleName = "添加成员"
	  			this.realname = ''
		  		this.houseNum = ''
		  		this.relationShip = ''
		  		this.value1 = ['父母']
		  		this.idNum = ''
	  		}
	  	},
	  	nextStep(){
	  		this.$validator.validateAll().then((result) => {
	        if (result) {
	        	this.$http({
			        method: "post",
			        url: "/wechat/officialAccount/user/saveFfmily",
			        data: this.$qs.stringify({
			        	'authToken':localStorage.getItem('authToken'),
			        	'userType':1,
			        	'userName':this.realname,
			        	'familyTies':this.relationShip,
			        	'owerNum':this.houseNum,
			        	'idCardNo':this.idNum,
			        })
			      }).then((res) => {
			      	console.log(1)
			      	this.$router.push({path:'/identify',query:{from:'members'}})
			      	// this.$router.push({path:'/identify'});
			    	}).catch((err) => {
			      });	          
	          // this.$dialog.alert({message:'验证成功'});
	          return
	        }else{
	        	// this.$router.push({path:'/identify'});
	        	this.$dialog.alert({message:'验证失败'});
	        }        
	      })	  		
	  	},
	  	getMemberList(){
	  		let communityName = this.address;
	  		let pageNum = 1;
	  		let pageSize = 100;
				this.$http({
	        method: "post",
	        url: "/wechat/officialAccount/user/familyTiesList",
	        data: this.$qs.stringify({
	        })
	      }).then((res) => {
	      	let result = res.data.result;
	      	this.familyArr = result;
	      	// this.searchArr = result.list
	    	}).catch((err) => {
	      });
	  	},
	  	onChange(val) {
	      // console.log(val)
	      this.relationShip = val[0];
	    },
	  	onClickLeft(){
	  		if(this.$route.query.from == 'members'){
	  			return
	  		}else{
	  			this.$router.go(-1);
	  		}	
	  	}
	  }
	}
</script>

<style lang="stylus" type="text/stylus">
	.members
		min-height 12rem
		background #e8e8e8
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
				.van-tab__pane
					width 100%!important
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
								position relative
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
								.vux-cell-box
									position absolute
									left 0
									top 0
									width 100%
									height .94rem
									overflow hidden
									z-index 10
									opacity 0									
						span
							font-size .24rem
							display block!important
							height .44rem
							line-height .44rem
							padding-left .4rem
							color red						
				.members-identify
					width 100%
					padding .64rem .18rem 0 .22rem
					background #fff
					min-height 12rem
					border-radius .14rem
					box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17)
					text-align center
					h5
						font-size .36rem
						color #5C5C5C
						line-height .5rem
						padding .2rem 0
					.members-identify-btn
						width 100%
						margin-top .6rem
						display flex
						align-items center
						justify-content center
							
				.members-family
					// padding .18rem .17rem 0 .21rem						
					.members-family-item
						display flex
						background #fff
						width 100%
						padding .36rem .44rem .24rem .43rem
						border-radius .14rem
						box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17);
						margin-bottom: .2rem
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