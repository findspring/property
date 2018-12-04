<template>
	<div class="identify clearfix">
		<van-nav-bar title="身份认证" left-arrow :fixed="true" @click-left="onClickLeft">
			<div slot="right" class="identify-top-right">
				<i class="common-icon icon-position02"></i>
				<span>{{cityName}}</span>
			</div>
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
				<div @click="confirm">上传</div>
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
	    	cityName:localStorage.getItem('cityName') || '',
	    	faceType:false,
	    	photoType:false,
	    	faceUrl:'',
	    	photoUrl:'',
	    }
	  },	  
	  beforeRouteLeave(to, from, next) {
      to.meta.keepAlive = true;      
      next();
    },
	  components:{
	  	vPhoto,vFace
	  },
	  methods:{
	  	faceBack(val,url){
	  		if(val){
	  			this.faceType = true
	  		}else{
	  			this.faceType = false
	  		}
	  		this.faceUrl = url;
	  	},
	  	photoBack(val,url){
	  		if(val){
	  			this.photoType = true
	  		}else{
	  			this.photoType = false
	  		}
	  		this.photoUrl = url;
	  		console.log('photoBack',url)
	  	},
	  	onClickLeft(){
	  		this.$router.go(-1);
	  	},
	  	confirm(){
	  		console.log(this.photoType,this.faceType)
	  		if(this.photoType && this.faceType){
	  			this.goResult(this.photoUrl,this.faceUrl);
	  		}else{
	  			this.$dialog.alert({message:'请完成全部上传'})
	  		}
	  	},
	  	goResult(photoUrl,faceUrl){
	  		if(this.$route.query.from == 'members'){
	  			this.$router.push({path:'/result',query:{from:'members',photoUrl:photoUrl,faceUrl:faceUrl}})
	  		}else{
	  			this.$router.push({path:'/result',query:{photoUrl:photoUrl,faceUrl:faceUrl}})
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
				height 3.58rem
				border-radius .12rem
				border 1px solid #D6D6D6
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
			
				