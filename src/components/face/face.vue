<template>
	<div class="face">
		<div class="face-upload">
			<div class="face-preview" v-show="previewStatus">
				<img :src="srcPreview" preview="1" preview-text="" alt="">
			</div>
			<i class="common-icon identify-delete" @click="clearAll" v-show="iconStatus"></i>
			<div class="face-btn">
				<input type="file" name="face" id="face" @change="compressFace" accept="image/*" capture="camera" />
				<img :src="src2" alt="" class="upload-bg">
				<div id="localImag">
					<img id="faceView" />
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
	    }
	  },
	  props:{
	  	'src2':{
	  		type:String,
	  		default:''
	  	}
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
	  		face.value = '';
	  		faceView.src = '';
	  		this.srcPreview ='';
	  		this.iconStatus = false;
	  		console.log(1,face.value)
	  		this.$emit('faceBack',false,'')
	  	},
	  	compressFace(){
	  		let compressFile = document.getElementById("face").files[0];
	  		let faceView = document.getElementById("faceView");
	  		let _this = this;
        if(compressFile.length <= 0){
          return;
        }
        lrz(compressFile,{
        	"quality":1,
          "width": 600
        }).then(function(rst){
        	// rst.attachType = picType;
          //rst.srcName = compressFile.name;
          console.log(rst)
          faceView.src = rst.base64;
          _this.srcPreview = faceView.src;
	      	_this.iconStatus = true;
          let formData = new window.FormData()
	      	formData.append('file',compressFile)
	      	formData.append('uploadImgType','headPortrait')
	      	formData.append('userType',1)	
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
				#localImag
					width 100%
					height 100%
					position absolute
					left 0
					top 0
					z-index 3
					img
						width 100%
						max-height 3.59rem
					
</style>