<template>
  <div class="audit">  
    <div class="audit-top">
      <div class="audit-header">
        <i class="common-icon icon-back"></i>
        <div class="search-info">
          <div ref="searchIcon" class="search-icon common-icon icon-search fl"></div>
          <form  @submit.prevent="formSubmit" action="javascript:return true"> 
            <!-- <input ref="input" class="search-input" type="search" name="" value="" placeholder="search" @click="search" @blur="searchBlur" @keyup.13="keySearch"> -->
            <input ref="input" class="search-input" type="search" name="" value="" placeholder="search">
          </form>
        </div>
        <i class="common-icon icon-date"></i>
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
        <div class="audit-tab-bottom clearfix">
          <div class="audit-item audit-has" v-if="num == 0">
            <div class="audit-has-item">
              <div class="audit-has-img">
                <img src="./../../../assets/images/headimg01.png" alt="">
              </div>              
              <div class="audit-has-content">
                <div class="audit-has-top">
                  <h4>傅小小</h4>
                  <i class="audit-has-type pass">已审核</i>
                </div>
                <ul>
                  <li>
                    <small>业主电话</small>
                    <b>19329157564</b>
                  </li>
                  <li>
                    <small>门牌号</small>
                    <b>392786A</b>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="audit-item audit-none" v-else-if="num == 1">
            <div class="audit-none-item">
              <div class="audit-none-img">
                <img src="./../../../assets/images/headimg03.png" alt="">
              </div>              
              <div class="audit-none-content">
                <div class="audit-none-top">
                  <h4>傅小小</h4>
                </div>
                <ul class="clearfix">
                  <li>
                    <small>业主电话</small>
                    <b>19329157564</b>
                  </li>
                  <li>
                    <small>门牌号</small>
                    <b>392786A</b>
                  </li>
                </ul>
                <div class="audit-none-btns">
                  <div class="audit-none-refused audit-btn">
                    拒绝
                  </div>
                  <div class="audit-none-pass audit-btn">
                    通过
                  </div>
                </div>
              </div>
            </div>
          </div> 
          <div class="audit-item audit-check" v-else-if="num == 2">
            <div class="audit-check-item">
              <div class="audit-check-box">
                <van-checkbox v-model="checked" checked-color="#D45855"></van-checkbox>
              </div>
              <div class="audit-check-click">
                <div class="audit-check-img">
                  <img src="./../../../assets/images/headimg05.png" alt="">
                </div>              
                <div class="audit-check-content">
                  <div class="audit-check-top">
                    <h4>傅小小</h4>
                  </div>
                  <ul class="clearfix">
                    <li>
                      <small>业主电话</small>
                      <b>19329157564</b>
                    </li>
                    <li>
                      <small>门牌号</small>
                      <b>392786A</b>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- all -->
            <div class="audit-check-all">
              <div class="audit-check-box">
                <van-checkbox v-model="checked" checked-color="#D45855"></van-checkbox>
                <p>全选</p>
              </div>
              <div class="audit-check-btns">
                <div class="audit-check-refused audit-btn">
                  拒绝
                </div>
                <div class="audit-check-pass audit-btn">
                  通过
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'audit',
    data () {
      return {
        checked: false,
        tabs: ["已审核", "未操作", "批量审核"],
        num: 0
      }
    },
    methods:{
       tab(index) {
        this.num = index;
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .audit
    background #e8e8e8
    min-height 12rem
    .audit-top
      padding-top .18rem
      width 100%
      height 3.9rem
      background:linear-gradient(142deg,rgba(221,114,83,1) 0%,rgba(216,60,56,1) 100%)
      .audit-header
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
        .icon-date
          margin-right .24rem
      .audit-tab        
        margin-top .48rem
        .audit-tab-top
          ul
            width 5.23rem
            height .65rem
            line-height .65rem
            font-size: .3rem
            color #FFFFFF
            margin 0 auto
            border 1px solid #F1EEEE
            border-radius .33rem
            li
              width 33.3%
              text-align center
              float left
            .active
              // transition: .5s
              color #D45855
              background #fff
              border-radius .33rem
              border none
        .audit-tab-bottom
          width 100%
          position relative
          .audit-item
            position absolute
            left 0
            top .4rem
            width 100%
            padding 0 .21rem
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
                min-width 5rem
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
                  li
                    float left
                    width 50%
                    color #9B9B9B
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
                min-width 5rem
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
                    width 50%
                    color #9B9B9B
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
                  min-width 5rem
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
                      width 50%
                      color #9B9B9B
                      small
                        display: block
                        font-size: .2rem
                        line-height .28rem
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
              bottom 1rem
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
      
</style>