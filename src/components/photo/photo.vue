<template>
	<div class="photo">
		<div class="photo-upload">
			<div class="photo-preview" v-show="previewStatus">
				<img :src="srcPreview" preview="0" preview-text="" alt="">
			</div>
			<i class="common-icon identify-delete" @click="clearAll" v-show="iconStatus"></i>
			<div class="photo-btn">
				<input type="file" name="file_head" id="file_head" @change="setImagePreview" />
				<img :src="src1" alt="" class="upload-bg">
				<div id="localImag">
					<img id="preview" />
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
	  	'src1':{
	  		type:String,
	  		default:''
	  	}
	  },
	  methods:{
	  	clearAll(){
	  		let file_head = document.getElementById("file_head"),preview = document.getElementById("preview");
	  		file_head.value = '';
	  		preview.src = '';
	  		preview.style.display = "none"
	  		this.srcPreview ='';
	  		this.iconStatus = false;
	  		console.log(1,file_head.value)
	  	},
	  	compressImg(){
	  		let compressFile = document.getElementById("file_head");
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
	  	setImagePreview(){
	  		let preview, img_txt, localImag, file_head = document.getElementById("file_head"),
	      picture = file_head.value;
	      if (!picture.match(/.jpg|.gif|.png|.bmp/i)) return this.$dialog.alert({message: '您上传的图片格式不正确，请重新选择！'}); 
	      if (preview = document.getElementById("preview"), file_head.files && file_head.files[0]){
	       	preview.style.display = "block",
	        preview.src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file_head.files[0]) : window.URL.createObjectURL(file_head.files[0]);
	      }
	      else {
	        // file_head.select(),
	        // file_head.blur(),
	        // img_txt = document.selection.createRange().text,
	        // localImag = document.getElementById("localImag");
	        // console.log(2,img_txt)
	        // try {
	        //   localImag.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)",
	        //   localImag.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = img_txt
	        // } catch(f) {
	        //   return alert("您上传的图片格式不正确，请重新选择！"),
	        //   !1
	        // }
	        // preview.style.display = "none",
	        // document.selection.empty()
	      }
	      this.srcPreview = preview.src;
	      this.iconStatus = true;
	  	}
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
				height 3.58rem
				position relative	
				margin 0 auto		
				.upload-bg
					position absolute
					left 0
					top 0
					z-index 1
					width 100%
					height 100%
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
						height 100%
					
</style>