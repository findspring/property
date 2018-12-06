<template>
	<div class="navBar">
		<ul class="nav">
	    <li v-for="(item,index)  in navArr" :style="item.hide?'display:none':''">
	    	<div @click="goNav(item.url,index)">
	      <!-- <router-link :to="{path:item.url}"> -->
	        <i class="nav-icon" :class="index===page?item.iconClassActive:item.iconClass"></i>
	        <span :class="{active:index===page}" >{{ item.title }}</span>
	      <!-- </router-link> -->
	      </div>
	    </li>
	  </ul>
	</div>
</template>
<script>
export default {
  name: 'navBar',
  data () {
    return {
      type:1,
      navArr:[],
    	arr:[
    		{
    			title: "首页",
    		 	url: "/index",
    		 	iconClass: "icon-home",
    		 	iconClassActive:"icon-home-on"
    		},
    		{
    			title: "成员",
    		 	url: "/members",
    		 	iconClass: "icon-members",
    		 	iconClassActive:"icon-members-on"
    		},
    		{
    			title: "访客",
    		 	url: "/visitors",
    		 	iconClass: "icon-visitors",
    		 	iconClassActive:"icon-visitors-on"
    		},
    		{
    			title: "我的",
    		 	url: "/mine",
    		 	iconClass: "icon-mine",
    		 	iconClassActive:"icon-mine-on"
    		},
    	],
      arr2:[
        {
          title: "首页",
          hide:false,
          url: "/index",
          iconClass: "icon-home",
          iconClassActive:"icon-home-on"
        },
        {
          title: "访客",
          hide:true,
          url: "/visitors",
          iconClass: "icon-visitors",
          iconClassActive:"icon-visitors-on"
        },
        {
          title: "物业",
          hide:false,
          url: "/audit",
          iconClass: "icon-audit",
          iconClassActive:"icon-audit-on"
        },
        {
          title: "我的",
          hide:false,
          url: "/mine",
          iconClass: "icon-mine",
          iconClassActive:"icon-mine-on"
        },
      ],
    }
  },
  props:['page'],
  mounted(){
    if(this.type == 2){
      this.navArr = this.arr2;
    }else{
      this.navArr = this.arr;
    }
  },
  methods:{
  	goNav(url,index){
  		if(index == this.page){
  			return;
  		}else{
  			this.$router.push({path:''+url});
  		}  		
  	}
  }
}
</script>
<style lang="stylus" type="text/stylus" scoped>
  .navBar
    width 100%    
    padding-top 1rem
		.nav
			width 100%
			height 1rem
			border-top 1px solid #ccc
			background-color #fff
			position fixed
			left 0px
			bottom 0px
			display flex
			z-index 99
			li
				display flex
				flex 1          
				div
					display flex
					flex 1
					flex-direction column
					align-items center
					justify-content center
					span
						color #999
						font-size .2rem
						margin-top .08rem
					.active
						color #CE3D3A
  				
</style>