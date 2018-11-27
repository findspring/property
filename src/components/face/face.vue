<template>
	<div class="face">
		<div class="face-upload">
			<div class="face-preview" v-show="previewStatus">
				<img :src="srcPreview" preview="1" preview-text="" alt="">
			</div>
			<i class="common-icon identify-delete" @click="clearAll" v-show="iconStatus"></i>
			<div class="face-btn">
				<input type="file" name="face" id="face" @change="changeFace" accept="image/*" capture="camera" />
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
	  		faceView.style.display = "none"
	  		this.srcPreview ='';
	  		this.iconStatus = false;
	  		console.log(1,face.value)
	  	},
	  	compressImg(){
	  		let compressFile = document.getElementById("face");
	  		let preview = document.getElementById("preview");
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
          // preview.src = rst.base64
          _this.$http.post(uploadurl, {
            "formData":rst
          }).then(Response => {
            let data = JSON.parse(Response.body);
            // console.log(data);
            if (data) {
              if (0 != data.errCode) {
                _this.$dialog.alert(data.errMsg);
                return;
              }
              if (1 == num) {
                  _this.msg.custAgentIdFront = data.result.attachKey;
                  _this.ocrRecog(num, 2, rst.base64);
              }
              if (2 == num) {
                  console.log(num);
                  _this.msg.custAgentIdBack = data.result.attachKey;
              }
              if (3 == num) {
                  _this.msg.bankCard = data.result.attachKey;
                  _this.ocrRecog(num, 17, rst.base64);
              }
              if (4 == num) {
                  _this.msg.investigation.push(data.result.attachKey);
                  // console.log(_this.msg.investigation);
                  let fname = $("#file_" + num).val()
              }
            }
          }).catch(function(err){
              console.log(err);
          });  
        }).catch(function (err){
        	// 处理失败会执行
        }).always(function () {
          e.target.value = null;
          // 不管是成功失败，都会执行
        })
	  	},
	  	changeFace(){
	  		let faceView, img_txt, localImag, face = document.getElementById("face"),
	      picture = face.value;
	      if (!picture.match(/.jpg|.gif|.png|.bmp/i)) return this.$dialog.alert({message: '您上传的图片格式不正确，请重新选择！'}); 
	      if (faceView = document.getElementById("faceView"), face.files && face.files[0]){
	       	faceView.style.display = "block",
	        faceView.src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(face.files[0]) : window.URL.createObjectURL(face.files[0]);
	      }
	      this.srcPreview = faceView.src;
	      this.iconStatus = true;
	  	}
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
				height 3.58rem
				position relative	
				margin 0 auto	
				border 1px solid #D6D6D6
				border-radius .12rem
				overflow hidden	
				.upload-bg
					position absolute
					left 1.03rem
					top .33rem
					z-index 1
					width 3.62rem	
					height 2.94rem
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