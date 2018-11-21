<template>
	<div class="mine">
		<div class="mine-top">
			<!-- infos -->
			<div class="mine-top-infos">
				<div class="mine-top-left">
					<h2>我是大表姐</h2>
					<p>爱笑的女孩运气不会差</p>
					<div class="mine-edit">
						<i class="common-icon icon-more"></i>
						<span>编辑</span>
					</div>
				</div>
				<div class="mine-top-right">
					<img src="https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg" alt="">
				</div>
			</div>
			<!-- total -->
			<div class="mine-top-total clearfix">
				<ul>
					<li>
						<div>
							<p>10</p>
							<span>本月访客</span>
						</div>
					</li>
					<li>
						<div>
							<p>28</p>
							<span>消息通知</span>
						</div>
					</li>
					<li>
						<div>
							<p>10</p>
							<span>签到</span>
						</div>
					</li>
				</ul>
			</div>	
		</div>
		<!-- padding -->
		<div class="pd16"></div>
		<!-- bottom -->
		<div class="mine-bottom">
			<div class="mine-item" @click="goLinks()">
				<div class="mine-item-left">
					<i class="nav-icon icon-home"></i>
					<span>我的通知</span>
				</div>
				<div class="mine-item-right">
					<i class="common-icon icon-more"></i>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
export default {
  name: 'mine',
  data () {
    return {

    }
  },
  methods:{
  	goLinks(){
  		this.$router.push({path:'/message'})
  	}
  }
}
</script>

<style lang="stylus" type="text/stylus" scoped>
	.mine
		padding-top 1rem
		.mine-top
			width 6.74rem
			margin 0 .38rem
			.mine-top-infos
				width 100%
				display flex
				justify-content space-between
				.mine-top-left
					h2
						font-size .4rem
						color #4A4A4A
						line-height .56rem
						padding-bottom .1rem
					p
						font-size .26rem
						color #9B9B9B
						line-height .37rem
						padding-bottom .3rem
					.mine-edit
						display flex
						align-items center
						width 1.2rem
						height .52rem
						line-height .52rem
						background rgba(241,242,243,1)
						border-radius .14rem
						i
							margin-left .17rem
						span
							margin-left .05rem
							font-size .26rem
							color #4A4A4A					
				.mine-top-right
					margin-top .1rem
					img
						width 1.4rem
						height 1.42rem
						border-radius 50%
						overflow hidden
			.mine-top-total
				margin-top .8rem
				width 100%
				padding-bottom .48rem
				ul
					width 100%
					display flex
					align-items center
					justify-content space-around
					li
						width 33.3%
						height .87rem
						text-align center
						border-right 1px solid #F7EFEF
						&:last-child
							border-right none
						p
							font-size .5rem
							color #4A4A4A
							line-height 1
							padding-bottom .12rem
							font-weight 700
						span
							font-size .26rem
							color #9B9B9B
		.mine-bottom
			width 6.74rem
			margin 0 .38rem
			.mine-item
				height 1.32rem
				border-bottom 1px solid #F7EFEF
				display flex
				align-items center
				justify-content space-between
				.mine-item-left
					
					display flex
					align-items center
					i
						margin-right .08rem
					span
						font-size .3rem
						color #4A4A4A
				.mine-item-right
					i
						margin-right .26rem
			
</style>