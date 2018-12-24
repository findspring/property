<template>
	<div class="face">
		<div class="face-upload">
			<div class="face-preview" v-show="previewStatus">
				<img :src="srcPreview" preview="1" preview-text="" alt="">
			</div>
			<i class="common-icon identify-delete" @click="clearAll" v-show="iconStatus"></i>
			<div class="face-btn">
				<input type="file" name="face" id="face" @change="compressFace" accept="image/*" capture="camera" />
				<img src="../../assets/images/upface.png" alt="" class="upload-bg">
				<div id="localImage" v-show="iconStatus">
					<img :src="srcPreview" id="faceView" />
				</div>
			</div>
			<i class="common-icon identify-big" v-show="iconStatus"></i>
		</div>
	</div>
</template>

<script>
	export default {
	  name: 'face',
	  data () {
	    return {
	    	srcPreview:'',
	    	previewStatus:true,
	    	iconStatus:false,
	    	// src2:require('../../assets/images/upface.png'),
	    }
	  },
	  props:{
	  	// src2:{
	  	// 	type:String,
	  	// 	default:''
	  	// },
	  	srcPreview2:{
	  		type:String,
	  		default:''
	  	},
	  	userType:{
	  	},
	  	iconStatus2:{
	  		type:Boolean,
	  		default:false,
	  	}
	  },
	  watch:{
	  	srcPreview2:{
	  		handler(newVal){
	  			console.log(newVal);
	  			this.srcPreview = newVal
	  		},
	  		immediate:true
	  	},
	  	iconStatus2:{
	  		handler(newVal){
	  			console.log('test',newVal);
	  			this.iconStatus = newVal
	  		},
	  		immediate:true
	  	},
	  },
	  created(){
	  	// this.showCapture();
	  },
	  methods:{
	  	showCapture(){
	  		let file = document.getElementById("face");
	  		if(this.getIos()){
	  			file.removeAttribute("multiple");
	  		}
	  	},
	  	getIos(){
	  		if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            return true;
          } else {
            return false;
          }
	  	},
	  	clearAll(){
	  		let face = document.getElementById("face"),faceView = document.getElementById("faceView");
	  		// let localImage = document.getElementById("localImage");
	  		// localImage.style.display = 'none';
	  		face.value = '';
	  		faceView.src = '';
	  		this.srcPreview ='';
	  		this.iconStatus = false;
	  		// console.log(1,face.value)
	  		this.$emit('faceBack',false,'')
	  	},
	  	compressFace(){
	  		let compressFile = document.getElementById("face").files[0];
	  		let faceView = document.getElementById("faceView");
	  		// let localImage = document.getElementById("localImage");
	  		let _this = this;
        if(compressFile.length <= 0){
          return;
        }
        lrz(compressFile,{
        	"quality":0.7,
          "width": 300
        }).then(function(rst){
        	// rst.attachType = picType;
        	// localImage.style.display = 'block';
          rst.srcName = compressFile.name;
          console.log(rst.srcName)
          faceView.src = rst.base64;
          _this.srcPreview = faceView.src;
	      	_this.iconStatus = true;
          let formData = new window.FormData()
	      	formData.append('fileBase64',rst.base64)
	      	formData.append('fileName',rst.srcName)
	      	formData.append('uploadImgType','headPortrait')
	      	formData.append('userType',_this.userType)	
	      	_this.$emit('faceBack',true,formData)      	
        //   _this.$http({
		      //   method: "post",
		      //   headers: {'content-type': 'multipart/form-data'},
		      //   url: "/pub/image/identityGather",
		      //   data: formData
		      // }).then(Response => {
        //     let result = Response.data.result;
        //     let imgUrl = result.imgUrl
        //     _this.$emit('faceBack',true,imgUrl)
        //     // console.log(data);
        //   }).catch(function(err){
        //       console.log(err);
        //   });   
        }).catch(function (err){
        	// 处理失败会执行
        }).always(function () {
          // e.target.value = null;
          // 不管是成功失败，都会执行
        })
	  	},
	  },
	}
</script>
<style lang="stylus" type="text/stylus" scoped>
	.face
		width 100%
		.face-upload
			width 100%
			height 3.58rem
			display flex
			align-items center
			justify-content space-between
			position relative
			.face-preview
				position absolute
				right 0
				top 50%
				width .8rem
				height 1.01rem
				margin-top -0.5rem
				z-index 2
				opacity 0
				img
					width 100%
					height 100%
			i
				width .8rem
				height 1.01rem
			.identify-delete
				background-image url('./../../assets/images/del.png')
			.identify-big
				background-image url('./../../assets/images/big.png')
			.face-btn
				width 5.68rem
				height 3.59rem
				position relative	
				margin 0 auto	
				border 1px solid #D6D6D6
				border-radius .12rem
				overflow hidden	
				.upload-bg
					position absolute
					left -1px
					top -1px
					z-index 1
					width 5.68rem	
					height 3.59rem
				input
					width 100%
					height 100%
					position absolute
					left 0
					top 0
					z-index 5
					opacity 0
				#localImage
					display flex
					align-items center
					justify-content center
					width 100%
					height 100%
					background #fff
					position absolute
					left 0
					top 0
					z-index 3
					img
						max-width 5.68rem
						max-height 3.58rem
						line-height 3.58rem
					
</style>