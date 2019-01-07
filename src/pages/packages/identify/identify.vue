<template>
	<div class="identify clearfix">
		<div class="identify-main">			
			<div class="identify-idcard">
				<h5>拍摄/上传身份证正面照</h5>
				<v-photo :src1="src1" :iconStatus1="iconStatus1" :srcPreview1="srcPreview1" :userType="userType" @photoBack="photoBack"></v-photo>
			</div>
			<div class="identify-face">
				<h5>人脸识别扫描</h5>
				<v-face :src2="src2" :iconStatus2="iconStatus2" :srcPreview2="srcPreview2" :userType="userType" @faceBack="faceBack"></v-face>
			</div>
			<div class="identify-btn">
				<div @click="confirm" v-show="faceType&&photoType">下一步</div>
			</div>
		</div>
	</div>
</template>

<script>
	import vPhoto from 'components/photo/photo'
	import vFace from 'components/face/face'
	export default {
	  name: 'identify',
	  data () {
	    return {
	    	src1:require('./../../../assets/images/upidcard.png'),
	    	src2:require('./../../../assets/images/upface.png'),
	    	srcPreview1:'',
	    	iconStatus1:false,
	    	srcPreview2:'',
	    	iconStatus2:false,
	    	faceType:false,
	    	photoType:false,
	    	faceUrl:'',
	    	photoUrl:'',
	    	photoFormData:'',
	    	faceFormData:'',
	    	uploadFace:false,
	    	uploadPhoto:false,
	    	userType:1,
	    	idCardNo:'',
	    }
	  },	  
	  // beforeRouteLeave(to, from, next) {
   //    to.meta.keepAlive = true;      
   //    next();
   //  },
	  components:{
	  	vPhoto,vFace
	  },
	  mounted(){
	    this.idCardNo = this.$route.query.idCardNo || '';
	  	let urlFrom = this.$route.query.from;
	  	let urlType = this.$route.query.userType;
	  	let role = localStorage.getItem("role")
	    if(role == 'property'){
	      this.userType = 5
	    }else if(role == 'owner'){
	      this.userType = 1
	    }
	    if(urlType){
	    	this.userType = urlType;
	    }
	  	if(urlFrom == 'mine' || this.idCardNo){
	  		this.srcPreview1 = this.$route.query.identityImgUrl;
	  		this.iconStatus1 = true;
	  		this.srcPreview2 = this.$route.query.headPortraitUrl;
	  		this.iconStatus2 = true;
	  		this.faceType = true;
	  		this.photoType = true;
	  		this.uploadPhoto = true;
	  		this.uploadFace = true;
	  	}	  	
	  },
	  methods:{
	  	faceBack(val,formData){
	  		console.log('2',val)
	  		if(val){
	  			this.faceType = true
	  		}else{
	  			this.faceType = false
	  		}
	  		this.faceFormData = formData;
	  	},
	  	photoBack(val,formData){
	  		console.log('1',val)
	  		if(val){
	  			this.photoType = true
	  		}else{
	  			this.photoType = false
	  		}
	  		this.photoFormData = formData;
	  	},
	  	//上传图片
	  	uploadImg(formData,type){
	  		formData.append('cardNo',this.idCardNo);
	  		this.$http({
	        method: "post",
	        headers: {'content-type': 'multipart/form-data'},
	        url: "/pub/image/identityGather",
	        data:formData 
	      }).then(Response => {
	      	if(type == 1){
	      		if(Response.data.errCode == '0'){
	      			this.idCardNo = Response.data.result.idCardNo
	      			this.uploadPhoto = true;
	      		}else{
	      			this.uploadPhoto = false;
	      		}
	      	}else if(type == 2){
	      		if(Response.data.errCode == '0'){
	      			this.uploadFace = true;
	      		}else{
	      			this.$vux.loading.hide()
	      			this.uploadFace = false;
	      		}
	      	}
	      	if(this.uploadFace && this.uploadPhoto){
	  				this.goResult(this.idCardNo);
	  			}
        }).catch(function(err){
          return
        });  
	  	},
	  	//下一步
	  	confirm(){
	  		this.$vux.loading.show()
  			if(this.photoFormData !=""){
  				this.uploadImg(this.photoFormData,1)
  			}
  			if(this.faceFormData != ""){
  				this.uploadImg(this.faceFormData,2)	
  			} 
  			if(this.photoFormData =="" && this.faceFormData ==""){
  				this.goResult(this.idCardNo);
  			}	
	  	},
	  	//跳转到result
	  	goResult(idCardNo){
	  		this.$vux.loading.hide()
	  		let fromUrl = this.$route.query.from;
	  		if(fromUrl){
	  			this.$router.push({path:'/result',query:{from:fromUrl,idCardNo:idCardNo}}) 			
	  		}else{
	  			this.$router.push({path:'/result'})
	  		}	  		
	  	}
	  }
	}
</script>
<style lang="stylus" type="text/stylus" scoped>
	.identify
		width 100%
		.identify-top-right
			display flex
			align-items center
			span
				font-size .28rem
				color #A6A0A0
				margin-left .06rem
		.identify-main
			width 100%
			padding-top .34rem
			text-align center
			.identify-idcard
				margin-bottom .34rem
			.identify-common
				margin 0 auto
				overflow hidden
				width 5.68rem
				height 3.59rem
				// border-radius .12rem
				// border 1px solid #D6D6D6
				position relative
				// i
				// 	position absolute
				// 	width .8rem
				// 	height 1.01rem
				// 	top 50% 
				// 	margin-top -.5rem
				// .identify-delete
				// 	left 0
				// 	background-image url('./../../../assets/images/del.png')
				// .identify-big
				// 	right 0
				// 	background-image url('./../../../assets/images/big.png')
				img
					width 3.62rem	
					height 2.94rem
					position absolute
					left 1.02rem
					top .32rem
			h5				
				font-size .36rem
				color #5C5C5C
				line-height .5rem
				padding .2rem 0
			.identify-btn
				margin-top .64rem
				div
					margin 0 auto
					width 6.26rem
					height .88rem
					line-height .88rem
					text-align center
					background #CE3D3A
					color #fff
					font-size .36rem
					border-radius .44rem
	</style>
			
				