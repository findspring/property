<template>
	<div class="visitors">	
    <div class="visitors-top">
      <div class="visitors-header">
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
    <div class="visitors-gray"></div>
    <div class="visitors-tab">
      <div class="visitors-tab-top">
        <ul>
          <li 
          v-for="(item,index) in tabs" 
          :class="{active:index == num}"
           @click="tab(index)">{{item}}
         </li>
        </ul>
      </div>
      <!-- <div class="visitors-tab-mid"></div> -->
      <div class="visitors-tab-bottom">
        <!-- <div class="visitors-tab-bg"></div> -->
        <div class="visitors-item visitors-has" v-if="num == 0">
          <div v-if="hasArr.length">
            <van-pull-refresh class="refresh" v-model="isLoading" @refresh="onRefresh(1)"> 
              <van-list
                v-model="loading"
                :offset="50"
                :finished="finished"
                @load="onLoad(1)"
              >
                <div class="visitors-has-item" v-if="hasArr &&hasArr.length" v-for="(val,y) in hasArr" :key="y">
                  <div class="visitors-has-img">
                    <img :src="val.avatarUrl" alt="">
                  </div>              
                  <div class="visitors-has-content">
                    <div class="visitors-has-top">
                      <h4>{{val.appointmentName}}</h4>
                      <i class="visitors-has-type pass" v-if="val.appointmentStatus == 1">已通过</i>
                      <i class="visitors-has-type arrived" v-else-if="val.appointmentStatus == 2">已到访</i>
                      <i class="visitors-has-type expire" v-else-if="val.appointmentStatus == 3">已过期</i>
                      <i class="visitors-has-type refused" v-else-if="val.appointmentStatus == 4">已拒绝</i>
                    </div>
                    <p>预约电话：{{val.phone}}</p>
                    <p>预约时间：{{val.appointmentTime}}</p>
                    <p>拜访事由：{{val.reasons}}</p>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
          <div class="visitors-nodata" v-else>
            <img src="./../../../assets/images/none.png" alt="">
            <p>没内容真可怕</p>
          </div>
        </div>
        <div class="visitors-item visitors-none" v-else-if="num == 1">
          <div v-if="noneArr.length">
            <van-pull-refresh class="refresh" v-model="isLoading1" @refresh="onRefresh(2)"> 
              <van-list
                v-model="loading1"
                :offset="50"
                :finished="finished1"
                @load="onLoad(2)"
              >
                <!-- <transition-group name="animate" tag="p"> -->
                  <div class="visitors-none-item" v-for="(item,index) in noneArr" :key="index" @click="goInfo(item.id)">
                    <div class="visitors-none-img">
                      <img :src="item.avatarUrl" alt="">
                    </div>              
                    <div class="visitors-none-content">
                      <div class="visitors-none-top">
                        <h4>{{item.appointmentName}}</h4>
                      </div>
                      <p>预约电话：{{item.phone}}</p>
                      <p>预约时间：{{item.appointmentTime}}</p>
                      <p>拜访事由：{{item.reasons}}</p>
                      <div class="visitors-none-btns">
                        <div class="visitors-none-refused visitors-btn" @click.stop="auditVisitor(2,item.id)">
                          拒绝
                        </div>
                        <div class="visitors-none-pass visitors-btn" @click.stop="auditVisitor(1,item.id)">
                          通过
                        </div>
                      </div>
                    </div>
                  </div> 
                <!-- </transition-group> -->
              </van-list>
            </van-pull-refresh>       
          </div>
          <div class="visitors-nodata" v-if="!noneArr.length">
            <img src="./../../../assets/images/none.png" alt="">
            <p>没内容真可怕</p>
          </div>          
        </div>     
      </div>
    </div>
    <nav-bar :page="2"></nav-bar>
	</div>
</template>

<script>
  import init from 'utils/index'
  import navBar from "components/navBar/navBar";
  export default {
    name: 'visitors',
    data () {
      return {
        isLoading: false,
        loading: false,
        finished: false,
        isLoading1: false,
        loading1: false,
        finished1: false,
        date:'',
        tabs: ["已操作", "未操作"],
        num: 0,
        hasArr:[],
        noneArr:[],
        pageNum:1,
        pageNum1:1,
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
            this.date = value
            this.keySearch()
          }
      });
      this.getVistorsList(1,1);
      // this.getVistorsList(2,1);  
    },
    methods:{
      formSubmit() {
        return false
      },
      clearAll(){
        // console.log(this.date.substring(0,10))
        // console.log(this.date.substring(this.date.length - 10))
        this.clearStatus = false;
        this.searchVal = '';
        this.date = '';
      },
      keySearch(){
        console.log(1)
        this.getVistorsList((this.num+1),1,this.searchVal,this.date);
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
            this.getVistorsList(1,this.pageNum);
            // 加载状态结束
            this.loading = false;
          }, 1000);
        }else if(type == 2){
          setTimeout(() => {
            this.getVistorsList(2,this.pageNum1);
            // 加载状态结束
            this.loading1 = false;
          }, 1000);
        }             
      },
      onRefresh(type) {
        if(type == 1){
          setTimeout(() => { 
            this.pageNum = 1;
            this.getVistorsList(1,this.pageNum);
            this.loading = false;
            this.finished = false;
            this.$toast({message:'刷新成功',duration:600});
            // this.getVistorsList(2);
            this.isLoading = false;
          }, 500);
        }else if(type == 2){
          setTimeout(() => { 
            this.pageNum1 = 1;
            this.getVistorsList(2,this.pageNum1);
            this.loading1 = false;
            this.finished1 = false;
            this.$toast({message:'刷新成功',duration:600});
            // this.getVistorsList(2);
            this.isLoading1 = false;
          }, 500);
        }
      },
      //获取访客审核数据
      getVistorsList(operateStatus,pageNum,val,time){
        let _this = this;
        let pageSize = 5;
        let startDate,endDate;
        if(time){
          startDate = this.dateFormat(_this.date.substring(0,10));
          endDate = this.dateFormat(_this.date.substring(_this.date.length - 10));
        }else{
          startDate = '';
          endDate = ''
        }
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
            'searchTxt':val
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
          }
        }).catch((err) => {
        }); 
      },
      //审核
      auditVisitor(auditSatus,index){
        this.$http({
          method: "post",
          url: "/wechat/officialAccount/appointment/appointmentAudit",
          data: this.$qs.stringify({
            // 'authToken':localStorage.getItem('authToken'),
            'auditSatus':auditSatus,
          })
        }).then((res) => {
          this.noneArr.forEach((item,k) => {
            if(item.id == index){
              this.noneArr.splice(k,1)
            }
          })
          if(auditSatus == 1){
            this.$toast({message:'审核通过！',duration:600});
          }else if(auditSatus == 2){
            this.$toast({message:'审核拒绝！',duration:600});
          }
        }).catch((err) => {
        });
      },
      dateFormat(date) {
        return init.dateFormat(new Date(date.replace(/-/g,'/')),"yyyyMMdd");
      },
    	tab(index) {
        this.num = index;
        this.pageNum = 1;
        this.pageNum1 = 1;
        this.finished = false;
        this.finished1 = false;
        this.getVistorsList(this.num+1,1);
      },
      goInfo(id){
        this.$router.push({path:'/visitorsInfo',query:{personnelId:id}})
      },
      goback(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .visitors
    background #fff
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    // min-height 13rem
    .visitors-top
      // padding-top .18rem
      // width 100%
      // height 3.9rem
      // background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
      .visitors-header
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
    .visitors-gray
      background #e8e8e8
      min-height 7rem
    .visitors-tab    
      position absolute
      left 0
      width 100%
      top 1.1rem
      padding-bottom 1rem
      background #fff
      .van-pull-refresh__head
        color #333
      .visitors-tab-top
        position fixed
        top 1.1rem
        left 0
        z-index 9
        width 100%
        background:#fff
        ul
          width 4.05rem
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
            width 50%
            text-align center
            float left
          .active
            // transition: .5s
            color #fff
            background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
            border-radius .33rem
            border none
      // .visitors-tab-mid
      //   width 100%
      //   height .4rem
      //   background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
      .visitors-tab-bottom
        padding-top 1.06rem
        width 100%
        position relative
        .visitors-tab-bg
          position absolute
          left 0 
          top 0rem
          z-index 1
          width 100%
          height 1.55rem
          background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
        .visitors-item
          position relative
          left 0
          top 0
          width 100%
          // padding 0 .21rem
          z-index 2
          .van-list
            margin-top .1rem
            padding 0 .21rem
          .visitors-nodata
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
          .visitors-has-item
            margin-bottom .2rem
            display flex
            padding .36rem .44rem .24rem .43rem
            width 100%
            height 2.71rem
            background:rgba(254,254,254,1);
            box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17)
            border-radius .14rem
            .visitors-has-img
              img
                width 1rem
                height 1rem
                border-radius 50%
                overflow hidden
                margin-right .37rem
            .visitors-has-content
              max-width 4.8rem
              .visitors-has-top
                display flex
                align-items center
                padding-bottom .08rem
                h4
                  font-size .43rem
                  color #4A4A4A
                  line-height .61rem
                  font-weight 400
                  margin-right .26rem
                .visitors-has-type
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
          .visitors-none-item
            margin-bottom .2rem
            display flex
            padding .36rem .44rem .24rem .43rem
            width 100%
            height 3.71rem
            background:rgba(254,254,254,1);
            box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17)
            border-radius .14rem
            .visitors-none-img
              img
                width 1rem
                height 1rem
                border-radius 50%
                overflow hidden
                margin-right .37rem
            .visitors-none-content
              max-width 4.8rem
              .visitors-none-top
                display flex
                align-items center
                padding-bottom .08rem
                h4
                  font-size .43rem
                  color #4A4A4A
                  line-height .61rem
                  font-weight 400
                  margin-right .26rem
                .visitors-none-type
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
              .visitors-none-btns
                display flex
                align-items center
                margin-top .3rem
                .visitors-btn
                  width 1.65rem
                  height .66rem
                  line-height .66rem
                  text-align center
                  border-radius .33rem
                  font-size .3rem
                .visitors-none-refused
                  background #F7EFEF
                  color #9B9B9B
                  margin-right .45rem
                .visitors-none-pass
                  background #D45855
                  color #fff
  // .animate-enter-active,.animate-leave-active
  //   transition: all 1s;
  // .animate-enter,.animate-leave
  //   opacity: 0;
  //   transform: translateX(100%);
  
                 
          
          
              
        
      
</style>