<template>
	<div>
		<!-- <van-collapse v-model="activeNames">
		  <van-collapse-item title="有赞微商城" name="1">
		    提供多样店铺模板，快速搭建网上商城
		  </van-collapse-item>
		  <van-collapse-item title="有赞零售" name="2">
		    网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
		  </van-collapse-item>
		  <van-collapse-item title="有赞美业" name="3">
		    线上拓客，随时预约，贴心顺手的开单收银
		  </van-collapse-item>
		</van-collapse> -->
		<div>
			<van-pull-refresh class="refresh" v-model="isLoading" @refresh="onRefresh">
			  <p>刷新次数: {{ count }}</p>
			  <van-list
				  v-model="loading"
				  :finished="finished"
				  @load="onLoad"
				>
				  <van-cell
				    v-for="item in list"
				    :key="item"
				    :title="item"
				  />
				</van-list>
			</van-pull-refresh>
				
		</div>
			
	</div>
</template>

<script>
export default {

  name: 'recommend',

  data () {
    return {
    	activeNames: ['1'],
    	count: 0,
      isLoading: false,
    	list: [],
      loading: false,
      finished: false
    }
  },
  methods:{
  	onLoad(){
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
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

<style lang="css" scoped>
</style>