<template>
  <div class="manage">  
    <div class="manage-top">
      <div class="manage-header">
        <i class="common-icon icon-back01" @click="goback"></i>
        <div class="search-info">
          <div ref="searchIcon" class="search-icon common-icon icon-search fl"  @click="keySearch"></div>
          <form  @submit.prevent="formSubmit" action="javascript:return true"> 
            <input ref="input" class="search-input" type="search" name="" v-model="searchVal" placeholder="search" v-on:focus="searchFocus" @blur="searchBlur" @keyup.13="keySearch">
            <i class="common-icon icon-delete" v-show="clearStatus" @click="clearAll"></i>
            <!-- <input ref="input" class="search-input" type="search" name="" value="" placeholder="search"> -->
          </form>
        </div>
        <div class="top-right">
          <i class="common-icon icon-date"></i>
          <input type="text" id="test1" v-model="date" onfocus="this.blur()">
        </div>          
      </div>    
    </div>
    <div class="manage-gray"></div>
    <div class="manage-tab">
      <div class="manage-tab-top">
        <ul>
          <li 
          v-for="(item,index) in tabs" 
          :class="{active:index == num}"
           @click="tab(index)">{{item}}
         </li>
        </ul>
      </div>
      <!-- <div class="manage-tab-mid"></div> -->
      <div class="manage-tab-bottom">
        <!-- <div class="manage-tab-bg"></div> -->
        <div class="manage-item manage-has" v-if="num == 0">
          <div v-if="hasArr.length">
            <van-pull-refresh class="refresh" v-model="isLoading" @refresh="onRefresh(1)"> 
              <van-list
                v-model="loading"
                :offset="50"
                :finished="finished"
                @load="onLoad(1)"
              >
                <div class="manage-has-item" v-if="hasArr &&hasArr.length" v-for="(val,y) in hasArr" :key="y">
                  <div class="manage-has-img">
                    <img :src="val.avatarUrl" alt="">
                  </div>              
                  <div class="manage-has-content">
                    <div class="manage-has-top">
                      <h4>{{val.appointmentName}}</h4>
                      <i class="manage-has-type pass" v-if="val.appointmentStatus == 1">已通过</i>
                      <i class="manage-has-type arrived" v-else-if="val.appointmentStatus == 2">已到访</i>
                      <i class="manage-has-type expire" v-else-if="val.appointmentStatus == 3">已过期</i>
                      <i class="manage-has-type refused" v-else-if="val.appointmentStatus == 4">已拒绝</i>
                    </div>
                    <p>预约电话：{{val.phone}}</p>
                    <p>预约时间：{{val.appointmentTime}}</p>
                    <p>拜访小区：{{val.reasons}}</p>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
          <div class="manage-nodata" v-else>
            <img src="./../../../assets/images/none.png" alt="">
            <p>没内容真可怕</p>
          </div>
        </div>
        <div class="manage-item manage-none" v-else-if="num == 1">
          <div v-if="noneArr.length">
            <van-pull-refresh class="refresh" v-model="isLoading1" @refresh="onRefresh(2)"> 
              <van-list
                v-model="loading1"
                :offset="50"
                :finished="finished1"
                @load="onLoad(2)"
              >
                <!-- <transition-group name="animate" tag="p"> -->
                  <div class="manage-none-item" v-for="(item,index) in noneArr" :key="index">
                    <div class="manage-none-img">
                      <img :src="item.avatarUrl" alt="">
                    </div>              
                    <div class="manage-none-content">
                      <div class="manage-none-top">
                        <h4>{{item.appointmentName}}</h4>
                        <i class="manage-none-type pass" v-if="item.appointmentStatus == 1">已通过</i>
                        <i class="manage-none-type arrived" v-else-if="item.appointmentStatus == 2">已到访</i>
                        <i class="manage-none-type expire" v-else-if="item.appointmentStatus == 3">已过期</i>
                        <i class="manage-none-type refused" v-else-if="item.appointmentStatus == 4">已拒绝</i>
                      </div>
                      <p>预约电话：{{item.phone}}</p>
                      <p>预约时间：{{item.appointmentTime}}</p>
                      <p>拜访小区：{{item.reasons}}</p>
                    </div>
                  </div> 
                <!-- </transition-group> -->
              </van-list>
            </van-pull-refresh>       
          </div>
          <div class="manage-nodata" v-if="!noneArr.length">
            <img src="./../../../assets/images/none.png" alt="">
            <p>没内容真可怕</p>
          </div>          
        </div>
        <div class="manage-item manage-none" v-else-if="num == 2">
          <div v-if="noneArr.length">
            <van-pull-refresh class="refresh" v-model="isLoading2" @refresh="onRefresh(3)"> 
              <van-list
                v-model="loading2"
                :offset="50"
                :finished="finished2"
                @load="onLoad(3)"
              >
                <!-- <transition-group name="animate" tag="p"> -->
                  <div class="manage-month-item" v-for="(item,index) in monthArr" :key="index">
                    <div class="manage-month-img">
                      <img :src="item.avatarUrl" alt="">
                    </div>              
                    <div class="manage-month-content">
                      <div class="manage-month-top">
                        <h4>{{item.appointmentName}}</h4>
                        <i class="manage-month-type pass" v-if="item.appointmentStatus == 1">已通过</i>
                        <i class="manage-month-type arrived" v-else-if="item.appointmentStatus == 2">已到访</i>
                        <i class="manage-month-type expire" v-else-if="item.appointmentStatus == 3">已过期</i>
                        <i class="manage-month-type refused" v-else-if="item.appointmentStatus == 4">已拒绝</i>
                      </div>
                      <p>预约电话：{{item.phone}}</p>
                      <p>预约时间：{{item.appointmentTime}}</p>
                      <p>拜访小区：{{item.reasons}}</p>
                    </div>
                  </div> 
                <!-- </transition-group> -->
              </van-list>
            </van-pull-refresh>       
          </div>
          <div class="manage-nodata" v-if="!monthArr.length">
            <img src="./../../../assets/images/none.png" alt="">
            <p>没内容真可怕</p>
          </div>          
        </div>       
      </div>
    </div>
    <nav-bar :page="1"></nav-bar>
  </div>
</template>

<script>
  import init from 'utils/index'
  import navBar from "components/navBar/navBar";
  export default {
    name: 'manage',
    data () {
      return {
        isLoading: false,
        loading: false,
        finished: false,
        isLoading1: false,
        loading1: false,
        finished1: false,
        isLoading2: false,
        loading2: false,
        finished2: false,
        date:'',
        tabs: ["今日", "本周", "本月"],
        num: 0,
        hasArr:[],
        noneArr:[],
        monthArr:[],
        pageNum:1,
        pageNum1:1,
        pageNum2:1,
        clearStatus: false,
        searchVal:'',

      }
    },
    components:{
      navBar
    },
    mounted(){
      laydate.render({
          elem: '#test1',
          range: true,
          done: (value) => {
            // console.log(value)
            this.date = value
            this.keySearch()
          }
      });
      this.getVistorsList(1,1,'today')
      // this.tab(0); 
    },
    methods:{
      formSubmit() {
        return false
      },
      clearAll(){
        this.clearStatus = false;
        this.searchVal = '';
        this.date = '';
      },
      keySearch(){
        this.getVistorsList((this.num+1),1,'all',this.searchVal,this.date);
      },
      searchFocus(){
        this.clearStatus = true;
      },
      searchBlur(){
        this.clearStatus = false;
      },
      onLoad(type){ //已操作 
        if(type == 1){
          // 异步更新数据
          setTimeout(() => {
            this.getVistorsList(1,this.pageNum,'today');
            // 加载状态结束
            this.loading = false;
          }, 1000);
        }else if(type == 2){
          setTimeout(() => {
            this.getVistorsList(2,this.pageNum1,'week');
            // 加载状态结束
            this.loading1 = false;
          }, 1000);
        }else if(type == 3){
          setTimeout(() => {
            this.getVistorsList(3,this.pageNum2,'month');
            // 加载状态结束
            this.loading2 = false;
          }, 1000);
        }             
      },
      onRefresh(type) {
        if(type == 1){
          setTimeout(() => { 
            this.pageNum = 1;
            this.getVistorsList(1,this.pageNum,'today');
            this.loading = false;
            this.finished = false;
            this.$toast({message:'刷新成功',duration:600});
            this.isLoading = false;
          }, 500);
        }else if(type == 2){
          setTimeout(() => { 
            this.pageNum1 = 1;
            this.getVistorsList(2,this.pageNum1,'week');
            this.loading1 = false;
            this.finished1 = false;
            this.$toast({message:'刷新成功',duration:600});
            this.isLoading1 = false;
          }, 500);
        }else if(type == 3){
          setTimeout(() => { 
            this.pageNum2 = 1;
            this.getVistorsList(3,this.pageNum2,'month');
            this.loading2 = false;
            this.finished2 = false;
            this.$toast({message:'刷新成功',duration:600});
            this.isLoading2 = false;
          }, 500);
        }
      },
      //获取访客审核数据
      getVistorsList(operateStatus,pageNum,key,val,time){
        let _this = this;
        let pageSize = 10;
        let startDate,endDate;
        if(time){
          startDate = this.dateFormat(_this.date.substring(0,10));
          endDate = this.dateFormat(_this.date.substring(_this.date.length - 10));
        }else{
          startDate = '';
          endDate = ''
        }
        // console.log(11,startDate)
        _this.$http({
          method: "post",
          url: "/wechat/officialAccount/appointment/appointmentList",
          data: _this.$qs.stringify({
            // 'authToken':localStorage.getItem('authToken'),
            'pageNum':pageNum,
            'operateStatus':operateStatus,
            'pageSize':pageSize,
            'startDate':startDate,
            'endDate':endDate,
            'searchTxt':val,
            search:key
          })
        }).then((res) => {
          let result = res.data.result;
          if(operateStatus == 1){
            let list = result.list;
            let pages = result.pages;
            if(_this.pageNum == 1){
              _this.hasArr = list;
              _this.pageNum++;
            }else{
              if(_this.pageNum > pages){ 
                _this.finished = true
              }else{
                if(0 < list.length <= pageSize){
                  _this.hasArr = _this.hasArr.concat(list);
                  _this.pageNum++
                }   
              } 
            }              
          }else if(operateStatus == 2){
            let list = result.list;
            let pages = result.pages;
            if(_this.pageNum1 == 1){
              _this.noneArr = list;
              _this.pageNum1++;
            }else{
              if(_this.pageNum1 > pages){ 
                _this.finished1 = true
              }else{
                if(0 < list.length <= pageSize){
                  _this.noneArr = _this.noneArr.concat(list);
                  _this.pageNum1++
                }   
              }
            }                                              
          }else if(operateStatus == 3){
            let list = result.list;
            let pages = result.pages;
            if(_this.pageNum2 == 1){
              _this.monthArr = list;
              _this.pageNum2++;
            }else{
              if(_this.pageNum2 > pages){ 
                _this.finished2 = true
              }else{
                if(0 < list.length <= pageSize){
                  _this.monthArr = _this.monthArr.concat(list);
                  _this.pageNum2++
                }   
              }
            }                                              
          }
        }).catch((err) => {
        }); 
      },
      dateFormat(date) {
        return init.dateFormat(new Date(date.replace(/-/g,'/')),"yyyyMMdd");
      },
      tab(index) {
        // let time = new Date().toLocaleDateString();
        // let nowDay = this.dateFormat(time);
        // let starDay = nowDay.substring(0,nowDay.length-2)+'01';
        // console.log(starDay);
        this.num = index;
        this.pageNum = 1;
        this.pageNum1 = 1;
        this.pageNum2 = 1;
        this.finished = false;
        this.finished1 = false;
        this.finished2 = false;
        if(index == 0){
          this.getVistorsList(1,1,'today')
        }else if(index == 1){
          this.getVistorsList(2,1,'week')
        }else if(index == 2){
          this.getVistorsList(3,1,'month')
        }
        ;
      },
      goback(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .manage
    background #fff
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    // min-height 13rem
    .manage-top
      // padding-top .18rem
      // width 100%
      // height 3.9rem
      // background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
      .manage-header
        height 1.1rem
        width 100%
        position fixed
        left 0 
        top 0
        z-index 10
        background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
        display flex
        justify-content: space-around
        align-items center
        .icon-back01
          margin-left .2rem
          margin-right .1rem
        .search-info
          width 5.87rem
          height .72rem
          background:rgba(247,239,239,0.8)
          border 1px solid rgba(247,239,239,0.2)
          overflow hidden
          border-radius .36rem
          border-radius .14rem
          position relative
          .search-icon
            position absolute
            margin .18rem .3rem 0 .43rem
          .icon-delete
            position absolute
            right .2rem
            top .16rem
            z-index 2
          input
            width 100%
            background:rgba(247,239,239,0.2);
            font-size: .3rem
            line-height 1
            padding .17rem 0
            box-sizing content-box
            border-radius .36rem
            text-indent 1rem
            &::placeholder
              color #fff
        .top-right
          position relative
          input 
            opacity 0
            width .46rem
            height .46rem
            position absolute
            left 0
            top 0
            z-index 10
          .icon-date
            margin-right .24rem
    .manage-gray
      background #e8e8e8
      min-height 7rem
    .manage-tab    
      position absolute
      left 0
      width 100%
      top 1.1rem
      padding-bottom 1rem
      background #fff
      .van-pull-refresh__head
        color #333
      .manage-tab-top
        position fixed
        top 1.1rem
        left 0
        z-index 9
        width 100%
        background:#fff
        ul
          width 5.21rem
          height .65rem
          line-height .65rem
          font-size: .3rem
          background:#fff
          color #D45855
          margin 0 auto
          border 1px solid #F1EEEE
          border-radius .33rem
          margin-bottom .18rem
          margin-top .22rem
          li
            width 33.3%
            text-align center
            float left
          .active
            // transition: .5s
            color #fff
            background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
            border-radius .33rem
            border none
      // .manage-tab-mid
      //   width 100%
      //   height .4rem
      //   background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
      .manage-tab-bottom
        padding-top 1.06rem
        width 100%
        position relative
        .manage-tab-bg
          position absolute
          left 0 
          top 0rem
          z-index 1
          width 100%
          height 1.55rem
          background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
        .manage-item
          position relative
          left 0
          top 0
          width 100%
          // padding 0 .21rem
          z-index 2
          .van-list
            margin-top .1rem
            padding 0 .21rem
          .manage-nodata
            width 100%
            height 8.5rem
            display flex
            justify-content center
            align-items center
            flex-direction column
            background:rgba(254,254,254,1);
            // box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17)
            // border-radius .14rem
            img
              width 100%
            p
              font-size .28rem
              color #A6A0A0
              margin-top .6rem
          .manage-has-item
            margin-bottom .2rem
            display flex
            padding .36rem .44rem .24rem .43rem
            width 100%
            height 2.71rem
            background:rgba(254,254,254,1);
            box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17)
            border-radius .14rem
            .manage-has-img
              img
                width 1rem
                height 1rem
                border-radius 50%
                overflow hidden
                margin-right .37rem
            .manage-has-content
              max-width 4.8rem
              .manage-has-top
                display flex
                align-items center
                padding-bottom .08rem
                h4
                  font-size .43rem
                  color #4A4A4A
                  line-height .61rem
                  font-weight 400
                  margin-right .26rem
                .manage-has-type
                  width .87rem
                  height .45rem
                  line-height .45rem
                  text-align center
                  font-size: .2rem
                  border:1px solid
                  opacity 0.4648
                  border-radius .22rem
                .pass
                  color #417505
                  border-color #417505
                .arrived
                  color #D45855
                  border-color #D45855
                .expire
                  color #9B9B9B
                  border-color #9B9B9B
                .refused
                  color #D8D8D8
                  border-color #D8D8D8
              p
                font-size: .3rem
                color #9B9B9B
                line-height .42rem
                padding-bottom  .08rem
                span
                  color #D45855
          .manage-none-item
            margin-bottom .2rem
            display flex
            padding .36rem .44rem .24rem .43rem
            width 100%
            height 2.71rem
            background:rgba(254,254,254,1);
            box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17)
            border-radius .14rem
            .manage-none-img
              img
                width 1rem
                height 1rem
                border-radius 50%
                overflow hidden
                margin-right .37rem
            .manage-none-content
              max-width 4.8rem
              .manage-none-top
                display flex
                align-items center
                padding-bottom .08rem
                h4
                  font-size .43rem
                  color #4A4A4A
                  line-height .61rem
                  font-weight 400
                  margin-right .26rem
                .manage-none-type
                  width .87rem
                  height .45rem
                  line-height .45rem
                  text-align center
                  font-size: .2rem
                  border:1px solid
                  opacity 0.4648
                  border-radius .22rem
                .pass
                  color #417505
                  border-color #417505
                .arrived
                  color #D45855
                  border-color #D45855
                .expire
                  color #9B9B9B
                  border-color #9B9B9B
                .refused
                  color #D8D8D8
                  border-color #D8D8D8
              p
                font-size: .3rem
                color #9B9B9B
                line-height .42rem
                padding-bottom  .08rem
          .manage-month-item
            margin-bottom .2rem
            display flex
            padding .36rem .44rem .24rem .43rem
            width 100%
            height 2.71rem
            background:rgba(254,254,254,1);
            box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17)
            border-radius .14rem
            .manage-month-img
              img
                width 1rem
                height 1rem
                border-radius 50%
                overflow hidden
                margin-right .37rem
            .manage-month-content
              max-width 4.8rem
              .manage-month-top
                display flex
                align-items center
                padding-bottom .08rem
                h4
                  font-size .43rem
                  color #4A4A4A
                  line-height .61rem
                  font-weight 400
                  margin-right .26rem
                .manage-month-type
                  width .87rem
                  height .45rem
                  line-height .45rem
                  text-align center
                  font-size: .2rem
                  border:1px solid
                  opacity 0.4648
                  border-radius .22rem
                .pass
                  color #417505
                  border-color #417505
                .arrived
                  color #D45855
                  border-color #D45855
                .expire
                  color #9B9B9B
                  border-color #9B9B9B
                .refused
                  color #D8D8D8
                  border-color #D8D8D8
              p
                font-size: .3rem
                color #9B9B9B
                line-height .42rem
                padding-bottom  .08rem
  // .animate-enter-active,.animate-leave-active
  //   transition: all 1s;
  // .animate-enter,.animate-leave
  //   opacity: 0;
  //   transform: translateX(100%);
</style>