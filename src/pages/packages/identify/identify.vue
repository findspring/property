<template>
	<div class="identify clearfix">
		<van-nav-bar title="身份认证" left-arrow :fixed="true" @click-left="onClickLeft">
			<!-- <div slot="right" class="identify-top-right">
				<i class="common-icon icon-position02"></i>
				<span>{{cityName}}</span>
			</div> -->
		</van-nav-bar>
		<div class="identify-main">			
			<div class="identify-idcard">
				<h5>拍摄/上传身份证正面照</h5>
				<!-- <div class="identify-upload identify-common">
					<i class="common-icon identify-delete"></i>
					<i class="common-icon identify-big"></i>
					<input type="file" name="file_head" id="file_head" @change="setImagePreview" />
					<img src="./../../../assets/images/upidcard.png" alt="">
				</div> -->
				<v-photo :src1="src1" @photoBack="photoBack"></v-photo>
				<!-- <div id="localImag">
          <img id="preview" width="-1" height="-1" style="display: none" />
      	</div> -->
			</div>
			<div class="identify-face">
				<h5>人脸识别扫描</h5>
				<v-face :src2="src2" @faceBack="faceBack"></v-face>
				<!-- <div class="identify-scan identify-common">
					<img src="./../../../assets/images/upface.png"  alt="">
				</div> -->
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
	    	// cityName:localStorage.getItem('cityName') || '',
	    	faceType:false,
	    	photoType:false,
	    	faceUrl:'',
	    	photoUrl:'',
	    	photoFormData:'',
	    	faceFormData:'',
	    	uploadFace:false,
	    	uploadPhoto:false,
	    	// owerNum:'',
	    }
	  },	  
	  beforeRouteLeave(to, from, next) {
      to.meta.keepAlive = true;      
      next();
    },
	  components:{
	  	vPhoto,vFace
	  },
	  mounted(){
	  	// this.owerNum = this.$route.query.owerNum;	  	
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
	  		// this.faceUrl = url;
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
	  	onClickLeft(){
	  		this.$router.go(-1);
	  	},
	  	uploadImg(formData,type){
	  		this.$http({
	        method: "post",
	        headers: {'content-type': 'multipart/form-data'},
	        url: "/pub/image/identityGather",
	        data:formData 
	      }).then(Response => {
	      	if(type == 1){
	      		this.uploadPhoto = true;
	      	}else if(type == 2){
	      		this.uploadFace = true;
	      	}
	      	if(this.uploadFace && this.uploadPhoto){
	  				this.goResult();
	  			}
          let result = Response.data.result;
          // let imgUrl = result.imgUrl
        }).catch(function(err){
          return
        });  
	  	},
	  	confirm(){
	  		// console.log(this.photoType,this.faceType)
	  		if(this.photoType && this.faceType){
	  			this.uploadImg(this.photoFormData,1)
	  			this.uploadImg(this.faceFormData,2)	  			          
	  			// this.goResult(this.photoUrl,this.faceUrl);
	  		}else{
	  			this.$dialog.alert({message:'请完成全部上传'})
	  		}
	  	},
	  	goResult(photoUrl,faceUrl){
	  		let fromUrl = this.$route.query.from;
	  		if(fromUrl){
	  			this.$router.push({path:'/result',query:{from:fromUrl}})
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
			padding-top 50px
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
			
				