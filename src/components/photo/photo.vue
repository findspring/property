<template>
	<div class="photo">
		<div class="photo-upload">
			<div class="photo-preview" v-show="previewStatus">
				<img :src="srcPreview" preview="0" preview-text="" alt="">
			</div>
			<i class="common-icon identify-delete" @click="clearAll" v-show="iconStatus"></i>
			<div class="photo-btn">
				<input type="file" name="file_head" id="file_head" @change="compressImg" accept="image/*" capture="camera" />
				<img :src="src1" alt="" class="upload-bg">
				<div id="localImag">
					<img :src="srcPreview" id="preview" />
				</div>
			</div>
			<i class="common-icon identify-big" v-show="iconStatus"></i>
		</div>
	</div>
</template>

<script>
	export default {
	  name: 'photo',
	  data () {
	    return {
	    	srcPreview:'',
	    	previewStatus:true,
	    	iconStatus:false,
	    }
	  },
	  props:{
	  	src1:{
	  		type:String,
	  		default:''
	  	},
	  	srcPreview1:{
	  		type:String,
	  		default:''
	  	},
	  	iconStatus1:{
	  		type:Boolean,
	  		default:false,
	  	}
	  },
	  watch:{
	  	srcPreview1:{
	  		handler(newVal){
	  			this.srcPreview = newVal
	  		},
	  		immediate:true
	  	},
	  	iconStatus1:{
	  		handler(newVal){
	  			this.iconStatus = newVal
	  		},
	  		immediate:true
	  	},
	  },
	  mounted(){
	  },
	  methods:{
	  	showCapture(){
	  		let file = document.getElementById("file_head");
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
	  		let file_head = document.getElementById("file_head"),preview = document.getElementById("preview");
	  		file_head.value = '';
	  		preview.src = '';
	  		this.srcPreview ='';
	  		this.iconStatus = false;
	  		console.log(1,file_head.value)
	  		this.$emit('photoBack',false,'')
	  	},
	  	compressImg(){
	  		let compressFile = document.getElementById("file_head").files[0];
	  		let preview = document.getElementById("preview");
	  		let _this = this;
	  		// console.log(compressFile)
        if(compressFile.length <= 0){
          return;
        }
        lrz(compressFile,{
        	"quality":1,
          "width": 600
        }).then(function(rst){
        	// console.log(rst)
        	// rst.attachType = picType;
          //rst.srcName = compressFile.name;
          preview.src = rst.base64
          _this.srcPreview = preview.src;
	      	_this.iconStatus = true;
	      	let formData = new window.FormData()
	      	formData.append('file',compressFile)
	      	formData.append('uploadImgType','identity')
	      	formData.append('userType',1)
	      	formData.append('familyTies','')
	      	formData.append('owerNum','')
	      	_this.$emit('photoBack',true,formData)
	      	
        //   _this.$http({
		      //   method: "post",
		      //   headers: {'content-type': 'multipart/form-data'},
		      //   url: "/pub/image/identityGather",
		      //   data: formData
		      // }).then(Response => {
        //     let result = Response.data.result;
        //     let imgUrl = result.imgUrl
        //     _this.$emit('photoBack',true,imgUrl)
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
	.photo
		width 100%
		.photo-upload
			width 100%
			height 3.58rem
			display flex
			align-items center
			justify-content space-between
			position relative
			.photo-preview
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
			.photo-btn
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
						max-height 3.58rem
					
</style>