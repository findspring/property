<template>
	<div class="search">
		<van-pull-refresh class="refresh" v-model="isLoading" @refresh="onRefresh">
		  <p>刷新次数: {{ count }}</p>
		</van-pull-refresh>
	</div>
</template>

<script>


export default {

  name: 'search',

  data () {
    return {
    	count: 0,
      isLoading: false
    }
  },
  methods:{
  	onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
    }
  }
}
</script>

<style lang="stylus" type="text/stylus" scoped>
  .search
 		min-height 8rem
 		.refresh
 			min-height: 7rem;
 			.van-pull-refresh__track
 				min-height: 7rem;
</style>