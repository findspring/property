<template>
	<div class="message">
		<van-nav-bar title="我的消息" left-arrow :fixed="true" :z-index="100" @click-left="onClickLeft">
			<div slot="left">
				<i class="common-icon icon-back"></i>
			</div>
		</van-nav-bar>
		<div class="message-box">
			<div>
				<van-pull-refresh class="refresh" v-model="isLoading" @refresh="onRefresh">
					<van-list
            v-model="loading"
            :offset="50"
            :finished="finished"
            @load="onLoad"
          >
					  <div class="message-box-item" @click="goMsgInfo(item.id)"
							v-for="(item,index) in msgArr" :key="index"
						>
							<div class="message-headimg">
								<img :src="item.avatarUrl" alt="">
							</div>				
							<div class="message-content">
								<div class="message-content-top">
									<h4>{{item.msgTit}}</h4>
									<time>{{item.msgTime}}</time>
								</div>
								<div class="message-content-bottom">
									<p class="line-ellipsis01">{{item.msgIntro}}</p>
									<!-- <badge text="1"></badge> -->
								</div>
							</div>
						</div>
					</van-list>
				</van-pull-refresh>				
			</div>
					
		</div>
		<nav-bar :page="3"></nav-bar>	
	</div>
</template>

<script>
	import navBar from "components/navBar/navBar";
	// import {Badge} from 'vux'
	export default {
	  name: 'message',
	  data () {
	    return {
				isLoading: false,
				loading: false,
				finished: false,
				msgArr:[],
				pageNum:1,
	    }
	  },
	  components:{
	    // Badge,
	    navBar
	  },
	  mounted(){
	  	this.getMessageList(this.pageNum);
	  },
	  methods:{
	  	getMessageList(pageNum){
	  		let _this = this;
	  		let pageSize  = 5;
	  		_this.$http({
          method: "post",
          url: "/wechat/officialAccount/user/msgList",
          data: _this.$qs.stringify({
            'authToken':localStorage.getItem('authToken'),
            'pageNum':pageNum,
            // 'operateStatus':operateStatus,
            'pageSize':pageSize,
          })
        }).then((res) => {
        	let list = res.data.result;
        	if(_this.pageNum == 1){
        		_this.msgArr = list;
        		_this.pageNum++;
        	}else{
        		if(_this.pageNum > 2){
	        		_this.finished = true
	        	}else{
	        		if(0<list.length <= pageSize){
	        			_this.msgArr = _this.msgArr.concat(list);
	        			_this.pageNum++
		        	}
	        	}
        	}        	        	          
        }).catch((err) => {
        }); 
	  	},
	  	onLoad(){
	      // 异步更新数据
	      setTimeout(() => {
	        this.getMessageList(this.pageNum);
	        // 加载状态结束
	        this.loading = false;
	      }, 500);
	    },
	    onRefresh() {
	      setTimeout(() => {
	      	this.pageNum = 1;
	      	this.loading = false;
          this.finished = false;
          this.getMessageList(this.pageNum);
	        this.$toast('刷新成功');
	        this.isLoading = false;
	      }, 500);
	    },
	  	goMsgInfo(id){
	  		this.$router.push({path:'/msgInfo',query:{msgId:id}})
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
	.message
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
		.message-box
			padding-top 58px
			width 100%
			.message-box-item
				display flex
				align-items center
				width 100%
				height 1.25rem
				padding 0 .23rem 0 .28rem
				border-bottom 1px solid #F7EFEF
				.message-headimg
					margin-right .06rem
					img
						width .95rem
						height .95rem
						border-radius 50%
						overflow hidden
				.message-content
					.message-content-top
						min-width 5.9rem
						margin-bottom .08rem
						height .42rem
						display flex
						align-items center
						justify-content space-between
						h4
							font-size .3rem
							color #4A4A4A
						time
							font-size .18rem
							color #9D9D9F
					.message-content-bottom
						display flex
						align-items center
						justify-content space-between
						p
							max-width 5.6rem
							font-size .22rem
							color #9D9D9F
				
</style>