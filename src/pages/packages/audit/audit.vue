<template>
  <div class="audit">  
    <div class="audit-top">
      <div class="audit-header">
        <i class="common-icon icon-back01" @click="goback"></i>
        <div class="search-info">
          <div ref="searchIcon" class="search-icon common-icon icon-search fl" @click="keySearch"></div>
          <form  @submit.prevent="formSubmit" action="javascript:return true"> 
            <input ref="input" class="search-input" type="search" name="" v-model="searchVal" placeholder="search" v-on:focus="searchFocus" @blur="searchBlur" @keyup.13="keySearch">
            <i class="common-icon icon-delete" v-show="clearStatus" @click="clearAll"></i>
          </form>
        </div>
        <div class="top-right">
          <i class="common-icon icon-date"></i>
          <input type="text" id="test2" v-model="date" onfocus="this.blur()">
        </div>
      </div>
      <div class="audit-tab">
        <div class="audit-tab-top">
          <ul>
            <li 
            v-for="(item,index) in tabs" 
            :class="{active:index == num}"
             @click="tab(index)">{{item}}
           </li>
          </ul>
        </div>
        <!-- <div class="audit-tab-mid"></div> -->
        <div class="audit-tab-bottom clearfix">
          <!-- <div class="audit-tab-bg"></div> -->
          <div class="audit-item audit-has" v-if="num == 0">
            <div v-if="auditHasArr.length">
              <van-pull-refresh class="refresh" v-model="isLoading" @refresh="onRefresh(1)"> 
                <van-list
                  v-model="loading"
                  :offset="50"
                  :finished="finished"
                  @load="onLoad(1)"
                >
                  <div class="audit-has-item" v-if="auditHasArr&&auditHasArr.length" v-for="(val,y) in auditHasArr" :key="y">
                    <div class="audit-has-img">
                      <img :src="val.avatarUrl" alt="">
                    </div>              
                    <div class="audit-has-content">
                      <div class="audit-has-top">
                        <h4>{{val.owerName}}</h4>
                        <i class="audit-has-type pass" v-if="val.auditStatus == 1">已审核</i>
                        <i class="audit-has-type refused" v-else-if="val.auditStatus == 2">已拒绝</i>
                        <i class="audit-has-type expire" v-else-if="val.auditStatus == 3">已过期</i>
                      </div>
                      <ul>
                        <li>
                          <small>业主电话</small>
                          <b>{{val.phone}}</b>
                        </li>
                        <li>
                          <small>门牌号</small>
                          <b>{{val.owerNum}}</b>
                        </li>
                      </ul>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
            <div class="audit-nodata" v-if="!auditHasArr.length">
              <img src="./../../../assets/images/none.png" alt="">
              <p>没内容真可怕</p>
            </div> 
          </div>
          <div class="audit-item audit-none" v-else-if="num == 1">
            <div v-if="auditNoneArr.length">
              <van-pull-refresh class="refresh" v-model="isLoading1" @refresh="onRefresh(2)"> 
                <van-list
                  v-model="loading1"
                  :offset="50"
                  :finished="finished1"
                  @load="onLoad(2)"
                >
                  <div class="audit-none-item" v-for="(item,index) in auditNoneArr" :key="index"  @click="goInfo(item.id)">
                    <div class="audit-none-img">
                      <img :src="item.avatarUrl" alt="">
                    </div>              
                    <div class="audit-none-content">
                      <div class="audit-none-top">
                        <h4>{{item.owerName}}</h4>
                      </div>
                      <ul class="clearfix">
                        <li>
                          <small>业主电话</small>
                          <b>{{item.phone}}</b>
                        </li>
                        <li>
                          <small>门牌号</small>
                          <b>{{item.owerNum}}</b>
                        </li>
                      </ul>
                      <div class="audit-none-btns">
                        <div class="audit-none-refused audit-btn" @click.stop="proprietorAudit(2,item.id,'single')">
                          拒绝
                        </div>
                        <div class="audit-none-pass audit-btn" @click.stop="proprietorAudit(1,item.id,'single')">
                          通过
                        </div>
                      </div>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
            <div class="audit-nodata" v-if="!auditNoneArr.length">
              <img src="./../../../assets/images/none.png" alt="">
              <p>没内容真可怕</p>
            </div>
          </div> 
          <div class="audit-item audit-check" v-else-if="num == 2">
            <div v-if="auditCheckArr.length" class="audit-check-item" v-for="(value,k) in auditCheckArr" :key="value.id">
              <div class="audit-check-box">
                <van-checkbox v-model="checkedObj[value.id]" checked-color="#D45855"></van-checkbox>
              </div>
              <div class="audit-check-click" @click="goInfo(value.id)">
                <div class="audit-check-img">
                  <img :src="value.avatarUrl" alt="">
                </div>              
                <div class="audit-check-content">
                  <div class="audit-check-top">
                    <h4>{{value.owerName}}</h4>
                  </div>
                  <ul class="clearfix">
                    <li>
                      <small>业主电话</small>
                      <b>{{value.phone}}</b>
                    </li>
                    <li>
                      <small>门牌号</small>
                      <b>{{value.owerNum}}</b>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="audit-nodata" v-if="!auditCheckArr.length">
              <img src="./../../../assets/images/none.png" alt="">
              <p>没内容真可怕</p>
            </div>
            <!-- all -->
            <div class="audit-check-all" v-if="auditCheckArr.length">
              <div class="audit-check-box" @click="isCheckedAll">
                <van-checkbox v-model="checkedAll" checked-color="#D45855"></van-checkbox>
                <p>全选</p>
              </div>
              <div class="audit-check-btns">
                <div class="audit-check-refused audit-btn" @click="proprietorAudit(2,checkedPram,'more')">
                  拒绝
                </div>
                <div class="audit-check-pass audit-btn" @click="proprietorAudit(1,checkedPram,'more')">
                  通过
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
    <nav-bar :page="2"></nav-bar>
  </div>
</template>

<script>
  import navBar from "components/navBar/navBar";
  export default {
    name: 'audit',
    data () {
      return {
        isLoading: false,
        loading: false,
        finished: false,
        isLoading1: false,
        loading1: false,
        finished1: false,
        checkedObj:{},
        checkedAll: false,
        checkedArr:[],
        checkedPram:'',
        tabs: ["已审核", "未操作", "批量审核"],
        num: 0,
        date:'',
        auditHasArr:[],
        auditNoneArr:[],
        auditCheckArr:[],
        pageNum:1,
        pageNum1:1,
        clearStatus: false,
        searchVal:'',
        removeArr:[]
      }
    },
    components:{
      navBar
    },
    watch:{
      'checkedObj':{
        handler(newVal,oldVal){
          let arr = [];
          let hasCheckedArr = [];
          Object.keys(newVal).forEach((item,index) => {
            arr.push(newVal[item])
            if(newVal[item] == true){
              hasCheckedArr.push(item);
            }
            return arr
          })
          this.removeArr = hasCheckedArr
          this.checkedPram = hasCheckedArr.join();
          console.log(this.removeArr);
          this.checkedAll = arr.every((val) => {
            return (val == true)
          }) 
        },
        immediate:true,
        deep:true
      }
    },
    mounted(){
      laydate.render({
        elem: '#test2',
        range: true,
        done: (value) => {
          this.date = value
        }
      });
      // let back = this.$route.query.back;
      // if(back == 1){
      //   this.tab(2);
      // }
      this.getProprietorList(1,1);
      // this.getProprietorList(2,1);
      // this.getProprietorList(3,1);
    },
    methods:{
      isCheckedAll(){ //判断是否全选
        if(this.checkedAll == false){
          Object.keys(this.checkedObj).forEach((item,index) => {
            this.$set(this.checkedObj,item,false)
          })
        }else{
          Object.keys(this.checkedObj).forEach((item,index) => {
            this.$set(this.checkedObj,item,true)
          })
        }  
      },
      clearAll(){  //清空搜索条件
        this.clearStatus = false;
        this.searchVal = '';
        this.date = '';
      },
      keySearch(){ //搜索
        // console.log(this.checkedArr)
        this.getProprietorList((this.num+1),1,this.searchVal,this.date);
      },
      searchFocus(){
        this.clearStatus = true;
      },
      searchBlur(){
        this.clearStatus = false;
      },
      onLoad(type){ 
        if(type == 1){ //已操作 
          // 异步更新数据
          setTimeout(() => {
            this.getProprietorList(1,this.pageNum);
            // 加载状态结束
            this.loading = false;
          }, 1000);
        }else if(type == 2){ //未操作
          setTimeout(() => {
            this.getProprietorList(2,this.pageNum1);
            // 加载状态结束
            this.loading1 = false;
          }, 1000);
        }             
      },
      onRefresh(type) {
        if(type == 1){ //已操作
          setTimeout(() => { 
            this.pageNum = 1;
            // this.auditHasArr = [];
            this.getProprietorList(1,this.pageNum);
            this.loading = false;
            this.finished = false;
            this.$toast({message:'刷新成功',duration:600});
            this.isLoading = false;
          }, 500);
        }else if(type == 2){ //未操作
          setTimeout(() => { 
            this.pageNum1 = 1;
            // this.auditNoneArr = [];
            this.getProprietorList(2,this.pageNum1);
            this.loading1 = false;
            this.finished1 = false;
            this.$toast({message:'刷新成功',duration:600});
            this.isLoading1 = false;
          }, 500);
        }
      },
      /**
       * [getProprietorList 获取审核数据]
       * @param  {[number]} operateStatus [操作类型]
       * @param  {[number]} pageNum       [页数]
       * @param  {[string]} val           [搜索条件]
       * @param  {[string]} time          [日期范围]
       */
      getProprietorList(operateStatus,pageNum,val,time){
        let _this = this;
        let pageSize = 10;
        let startDate,endDate;
        if(time){
          startDate = _this.date.substring(0,10);
          endDate = _this.date.substring(_this.date.length - 10);
        }else{
          startDate = '';
          endDate = ''
        }
        _this.$http({
          method: "post",
          url: "/wechat/officialAccount/community/proprietorList",
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
              _this.auditHasArr = list;
              _this.pageNum++
            }else{
              if(_this.pageNum > pages){ 
                _this.finished = true
              }else{
                if(0 < list.length <= pageSize){
                  _this.auditHasArr = _this.auditHasArr.concat(list);
                  _this.pageNum++
                }   
              } 
            }              
          }else if(operateStatus == 2){
            let list = result.list;
            let pages = result.pages;
            if(_this.pageNum1 == 1){
              _this.auditNoneArr = list;
              _this.pageNum1++
            }else{
              if(_this.pageNum1 > pages){ 
                _this.finished1 = true
              }else{
                if(0 < list.length <= pageSize){
                  _this.auditNoneArr = _this.auditNoneArr.concat(list);
                  _this.pageNum1++
                }   
              }   
            }                                           
          }else if(operateStatus == 3){
            let list = result.list;
            // let pages = result.pages;
            _this.auditCheckArr = list;
            _this.auditCheckArr.forEach((item,index) => {
              _this.$set(_this.checkedObj,item.id,false)
              // _this.checkedArr[index] = false;
            })
          }
        }).catch((err) => {
        }); 
      },
      /**
       * [proprietorAudit 审核]
       * @param  {[number]} auditSatus   [审核状态]
       * @param  {[string]} personnelIds [选中项]
       * @param  {[string]} type         [单选还是多选]
       */
      proprietorAudit(auditSatus,personnelIds,type){
        if(!personnelIds){
          this.$dialog.alert({
            message:'请选择要审核的选项！'
          })
          return
        }
        this.$http({
          method: "post",
          url: "/wechat/officialAccount/community/proprietorAudit",
          data: this.$qs.stringify({
            // 'authToken':localStorage.getItem('authToken'),
            'auditSatus':auditSatus,
            'personnelIds':personnelIds
          })
        }).then((res) => {
          //审核状态
          if(auditSatus == 1){
            this.$toast({message:'审核通过！',duration:600});
          }else if(auditSatus == 2){
            this.$toast({message:'审核拒绝！',duration:600});
          }
          if(type == 'single'){  //单个审核
            this.auditNoneArr.forEach((item,index) => {
              if(item.id == personnelIds){
                this.auditNoneArr.splice(index,1);
              }
            })
          }else if(type == 'more'){  //遍历移除审核项
            this.removeArr.forEach((item,index) => {
              this.auditCheckArr.forEach((val,k) => {
                if(item == val.id){
                  this.auditCheckArr.splice(k,1);
                }
              })
            })
            // 重置checkedObj
            this.checkedObj = {};
            this.auditCheckArr.forEach((item,index) => {
              this.$set(
                this.checkedObj,item.id,false)
            })
          }
          
        }).catch((err) => {
        });
      },
      tab(index) {
        this.num = index;
        this.pageNum = 1;
        this.pageNum1 = 1;
        this.finished = false;
        this.finished1 = false;
        this.getProprietorList(this.num+1,1);
      },
      goInfo(id){
        this.$router.push({path:'/auditInfo',query:{personnelId:id}})
      },
      goback(){
        let back = this.$route.query.back;
        if(back == 1){
          return
        }else{
          this.$router.go(-1);
        }        
      }
    }
  }
</script>
<style lang="stylus" type="text/stylus">
  .audit
    background #fff
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    .audit-top
      // padding-top .18rem
      // width 100%
      // height 1.1rem      
      .audit-header
        // padding-top .18rem
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
          // background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%);
          border 1px solid rgba(247,239,239,0.2)
          overflow hidden
          border-radius .36rem
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
      .audit-tab        
        position absolute
        left 0
        width 100%
        top 1.1rem
        padding-bottom 1rem
        background #fff
        .van-pull-refresh__head
          color #333
        .audit-tab-top
          position fixed
          top 1.1rem
          left 0
          z-index 9
          width 100%
          background:#fff
          // background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
          ul
            width 5.23rem
            height .65rem
            line-height .65rem
            font-size: .3rem
            background:#fff
            color #D45855
            margin 0 auto
            border 1px solid #D45855
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
        .audit-tab-mid
          width 100%
          height .4rem
          background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
        .audit-tab-bottom
          padding-top 1.06rem
          width 100%
          position relative
          .audit-tab-bg
            position absolute
            left 0 
            top 0rem
            z-index 1
            width 100%
            height 1.55rem
            background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
          .audit-item
            // min-height 9rem
            position relative
            left 0
            top 0
            width 100%
            // padding 0 .21rem
            z-index 2
            .van-list
              margin-top .1rem
              padding 0 .21rem
            .audit-nodata
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
            .audit-has-item
              margin-bottom .2rem
              display flex
              padding .36rem .44rem .24rem .43rem
              width 100%
              height 1.97rem
              background:rgba(254,254,254,1);
              box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17)
              border-radius .14rem
              .audit-has-img
                img
                  width 1.41rem
                  height 1.41rem
                  border-radius 50%
                  overflow hidden
                  margin-right .37rem
              .audit-has-content
                min-width 4.3rem
                .audit-has-top
                  display flex
                  align-items center
                  padding-bottom .08rem
                  h4
                    font-size .43rem
                    color #4A4A4A
                    line-height .61rem
                    font-weight 400
                    margin-right .26rem
                  .audit-has-type
                    width .87rem
                    height .4rem
                    line-height .4rem
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
                ul
                  width 100%
                  overflow hidden
                  li
                    float left
                    width 60%
                    color #9B9B9B
                    &:last-child
                      width 40%
                    small
                      display: block
                      font-size: .2rem
                      line-height .28rem
                    b
                      font-size: .3rem
                      line-height .42rem
            .audit-none-item
              margin-bottom .2rem
              display flex
              padding .36rem .44rem .24rem .43rem
              width 100%
              height 2.82rem
              background:rgba(254,254,254,1);
              box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17)
              border-radius .14rem
              .audit-none-img
                img
                  width 1.41rem
                  height 1.41
                  border-radius 50%
                  overflow hidden
                  margin-right .37rem
              .audit-none-content
                min-width 4.3rem
                .audit-none-top
                  display flex
                  align-items center
                  padding-bottom .08rem
                  h4
                    font-size .43rem
                    color #4A4A4A
                    line-height .61rem
                    font-weight 400
                    margin-right .26rem
                ul
                  overflow hidden
                  width 100%
                  li
                    float left
                    width 60%
                    color #9B9B9B
                    &:last-child
                      width 40%
                    small
                      display: block
                      font-size: .2rem
                      line-height .28rem
                    b
                      font-size: .3rem
                      line-height .42rem                  
                .audit-none-btns
                  display flex
                  align-items center
                  margin-top .1rem
                  .audit-btn
                    width 1.65rem
                    height .66rem
                    line-height .66rem
                    text-align center
                    border-radius .33rem
                    font-size .3rem
                  .audit-none-refused
                    background #F7EFEF
                    color #9B9B9B
                    margin-right .45rem
                  .audit-none-pass
                    background #D45855
                    color #fff
            .audit-check-item
              margin-bottom .2rem
              display flex
              align-items center
              // padding .36rem .44rem .24rem .43rem
              width 100%
              height 2.01rem
              background:rgba(254,254,254,1);
              box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17)
              border-radius .14rem
              .audit-check-box
                margin-left .21rem
                margin-right .24rem
                .van-checkbox__icon, .van-checkbox__label
                  height .59rem
                  width .59rem
                  line-height .59rem
                  .van-icon
                    height .59rem
                    width .59rem
                    line-height .59rem
              .audit-check-click
                display flex
                align-items center
                .audit-check-img
                  img
                    width 1.41rem
                    height 1.41
                    border-radius 50%
                    overflow hidden
                    margin-right .37rem
                .audit-check-content
                  min-width 4.3rem
                  .audit-check-top
                    display flex
                    align-items center
                    padding-bottom .08rem
                    h4
                      font-size .43rem
                      color #4A4A4A
                      line-height .61rem
                      font-weight 400
                      margin-right .26rem
                  ul
                    overflow hidden
                    width 100%
                    li
                      float left
                      width 60%
                      color #9B9B9B
                      &:last-child
                        width 40%
                      small
                        display: block
                        font-size: .2rem
                        line-height .28rem
                        margin .04rem 0 .02rem 0
                      b
                        font-size: .3rem
                        line-height .42rem     
            .audit-check-all
              width 100%
              height 1.2rem
              box-shadow 0 .02rem .17rem 0 rgba(0,0,0,0.17)
              background #fff
              position fixed
              left 0
              bottom .97rem
              display flex
              align-items center
              .audit-check-box
                text-align center
                margin-left .43rem
                margin-right .83rem
                p
                  font-size .26rem
                  color #999999
                  padding-top .08rem
                  line-height 1
                .van-checkbox__icon, .van-checkbox__label
                  height .59rem
                  width .59rem
                  line-height .59rem
                  .van-icon
                    height .59rem
                    width .59rem
                    line-height .59rem
              .audit-check-btns
                display flex
                align-items center
                .audit-btn
                  width 2.57rem
                  height .88rem
                  line-height .88rem
                  text-align center
                  border-radius .44rem
                  font-size .3rem
                .audit-check-refused
                  background #F7EFEF
                  color #9B9B9B
                  margin-right .19rem
                .audit-check-pass
                  background #D45855
                  color #fff
          .audit-check
            margin-top .1rem
            padding 0 .21rem 1.2rem .21rem
      
</style>