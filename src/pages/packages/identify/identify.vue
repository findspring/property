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
				<v-photo :src1="src1"></v-photo>
				<!-- <div id="localImag">
          <img id="preview" width="-1" height="-1" style="display: none" />
      	</div> -->
			</div>
			<div class="identify-face">
				<h5>人脸识别扫描</h5>
				<div class="identify-scan identify-common">
					<img src="./../../../assets/images/upface.png"  alt="">
				</div>
			</div>
			<div class="identify-btn">
				<div>上传</div>
			</div>
		</div>
	</div>
</template>

<script>
	import vPhoto from 'components/photo/photo'
	export default {
	  name: 'identify',
	  data () {
	    return {
	    	src1:require('./../../../assets/images/upidcard.png'),
	    	cityName:localStorage.getItem('cityName') || ''
	    }
	  },
	  components:{
	  	vPhoto
	  },
	  methods:{
	  	onClickLeft(){
	  		this.$router.go(-1);
	  	},
	  	// setImagePreview(){
	  	// 	var preview, img_txt, localImag, file_head = document.getElementById("file_head"),
	   //    picture = file_head.value;
	   //    if (!picture.match(/.jpg|.gif|.png|.bmp/i)) return alert("您上传的图片格式不正确，请重新选择！"),
	   //    !1;
	   //    if (preview = document.getElementById("preview"), file_head.files && file_head.files[0]) preview.style.display = "block",
	   //      preview.style.width = "63px",
	   //      preview.style.height = "63px",
	   //      preview.src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file_head.files[0]) : window.URL.createObjectURL(file_head.files[0]);
	   //    else {
	   //      file_head.select(),
	   //      file_head.blur(),
	   //      img_txt = document.selection.createRange().text,
	   //      localImag = document.getElementById("localImag"),
	   //      localImag.style.width = "63px",
	   //      localImag.style.height = "63px";
	   //      try {
	   //        localImag.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)",
	   //        localImag.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = img_txt
	   //      } catch(f) {
	   //        return alert("您上传的图片格式不正确，请重新选择！"),
	   //        !1
	   //      }
	   //      preview.style.display = "none",
	   //      document.selection.empty()
	   //    }
	   //    // return document.getElementById("DivUp").style.display = "block",
	   //    !0
	  	// }
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
				width 100%
				height 3.58rem
				border-radius .12rem
				position relative
				i
					position absolute
					width .8rem
					height 1.01rem
					top 50% 
					margin-top -.5rem
				.identify-delete
					left 0
					background-image url('./../../../assets/images/del.png')
				.identify-big
					right 0
					background-image url('./../../../assets/images/big.png')
				img
					width 5.68rem	
					border 1px solid #D6D6D6
					height 100%
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
			
				