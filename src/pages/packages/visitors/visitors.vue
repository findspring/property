<template>
	<div class="visitors">	
    <div class="visitors-top">
      <div class="visitors-header">
        <i class="common-icon icon-back" @click="goback"></i>
        <div class="search-info">
          <div ref="searchIcon" class="search-icon common-icon icon-search fl"></div>
          <form  @submit.prevent="formSubmit" action="javascript:return true"> 
            <!-- <input ref="input" class="search-input" type="search" name="" value="" placeholder="search" @click="search" @blur="searchBlur" @keyup.13="keySearch"> -->
            <input ref="input" class="search-input" type="search" name="" value="" placeholder="search">
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
      <div class="visitors-tab-mid"></div>
      <div class="visitors-tab-bottom">
        <div class="visitors-tab-bg"></div>
        <div class="visitors-item visitors-has" v-if="num == 0">
          <div class="visitors-has-item" v-if="visitorsStatus">
            <div class="visitors-has-img">
              <img src="./../../../assets/images/headimg01.png" alt="">
            </div>              
            <div class="visitors-has-content">
              <div class="visitors-has-top">
                <h4>傅小小</h4>
                <i class="visitors-has-type pass">已通过</i>
              </div>
              <p>预约电话：19766203418</p>
              <p>预约时间：2018/08/08</p>
              <p>拜访事由：探访</p>
            </div>
          </div>
          <div class="visitors-nodata" v-if="!visitorsStatus">
            <img src="./../../../assets/images/none.png" alt="">
            <p>没内容真可怕</p>
          </div>
        </div>
        <div class="visitors-item visitors-none" v-else-if="num == 1">
          <div class="visitors-none-item">
            <div class="visitors-none-img">
              <img src="./../../../assets/images/headimg03.png" alt="">
            </div>              
            <div class="visitors-none-content">
              <div class="visitors-none-top">
                <h4>傅小小</h4>
              </div>
              <p>预约电话：19766203418</p>
              <p>预约时间：2018/08/08</p>
              <p>拜访事由：探访</p>
              <div class="visitors-none-btns">
                <div class="visitors-none-refused visitors-btn">
                  拒绝
                </div>
                <div class="visitors-none-pass visitors-btn" @click="goPass">
                  通过
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="visitors-none-item">
            <div class="visitors-none-img">
              <img src="./../../../assets/images/headimg03.png" alt="">
            </div>              
            <div class="visitors-none-content">
              <div class="visitors-none-top">
                <h4>傅小小</h4>
              </div>
              <p>预约电话：19766203418</p>
              <p>预约时间：2018/08/08</p>
              <p>拜访事由：探访</p>
              <div class="visitors-none-btns">
                <div class="visitors-none-refused visitors-btn">
                  拒绝
                </div>
                <div class="visitors-none-pass visitors-btn">
                  通过
                </div>
              </div>
            </div>
          </div>
          <div class="visitors-none-item">
            <div class="visitors-none-img">
              <img src="./../../../assets/images/headimg03.png" alt="">
            </div>              
            <div class="visitors-none-content">
              <div class="visitors-none-top">
                <h4>傅小小</h4>
              </div>
              <p>预约电话：19766203418</p>
              <p>预约时间：2018/08/08</p>
              <p>拜访事由：探访</p>
              <div class="visitors-none-btns">
                <div class="visitors-none-refused visitors-btn">
                  拒绝
                </div>
                <div class="visitors-none-pass visitors-btn">
                  通过
                </div>
              </div>
            </div>
          </div> -->
        </div> 
      </div>
    </div>
    <nav-bar :page="2"></nav-bar>
	</div>
</template>

<script>
  import navBar from "components/navBar/navBar";
  export default {
    name: 'visitors',
    data () {
      return {
        date:'',
        tabs: ["已操作", "未操作"],
        num: 0,
        visitorsStatus:false
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
          }
      });
    },
    methods:{
      goPass(){
        this.visitorsStatus = !this.visitorsStatus;
        this.tab(0);
      },
    	tab(index) {
        this.num = index;
      },
      goback(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .visitors
    background #e8e8e8
    position relative
    // min-height 12rem
    .visitors-top
      padding-top .18rem
      width 100%
      height 3.9rem
      background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
      .visitors-header
        display flex
        justify-content: space-around
        align-items center
        .icon-back
          margin-left .24rem
        .search-info
          width 5.87rem
          height .72rem
          background:rgba(247,239,239,0.8)
          border-radius .14rem
          .search-icon
            margin .18rem .3rem 0 .43rem
          input
            background none
            font-size: .34rem
            line-height 1
            padding .14rem 0
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
      top 1.3rem
      padding-bottom 1rem
      background #e8e8e8
      .visitors-tab-top
        background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
        ul
          width 4.05rem
          height .65rem
          line-height .65rem
          font-size: .3rem
          color #FFFFFF
          margin 0 auto
          border 1px solid #F1EEEE
          border-radius .33rem
          li
            width 50%
            text-align center
            float left
          .active
            // transition: .5s
            color #D45855
            background #fff
            border-radius .33rem
            border none
      .visitors-tab-mid
        width 100%
        height .4rem
        background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
      .visitors-tab-bottom
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
          padding 0 .21rem
          z-index 2
          .visitors-nodata
            width 100%
            height 8.5rem
            display flex
            justify-content center
            align-items center
            flex-direction column
            background:rgba(254,254,254,1);
            box-shadow:0 .02rem .17rem 0 rgba(0,0,0,0.17)
            border-radius .14rem
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
                  
          
          
              
        
      
</style>