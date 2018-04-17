<template>
  <keep-alive>
  <div style="z-index: 99">
    <div v-show="smallnav" class="smallnav">
      <div class="small_btn nav_color1" @click="openImg1">营销知识</div>
      <div class="small_btn nav_color2" @click="openImg2">营销海报</div>
      <!--<div class="small_btn nav_color3" @click="openImg3">视频教学</div>-->
      <div class="small_btn nav_color4" @click="openImg4">我的主页</div>
    </div>
    <mySwiper></mySwiper>
    <div class="kfbox" @click="show=true"><span><img style="width: 100%;" src="./../../../static/kf2.png"  alt=""></span>
    </div>

    <div class="kfbox2" v-show="bugshow"></div>

    <div class="home_nav">
      <div class="nav_box">
        <div class="nav_item1" @click="goArticle()">
          <div class="item_btn nav_color1">
            <i class="nav_icon1 iconfont icon-dapaijie" style="left:2px;"></i>
          </div>
          <p class="nav_text">营销知识</p>
        </div>

        <div class="nav_item1" @click="goPoster()">
          <div class="item_btn nav_color2">
            <i class="nav_icon1 iconfont icon-tupian" ></i>
          </div>
          <p class="nav_text">营销海报</p>
        </div>

        <div class="nav_item1" @click="goPersonHome()">
          <div class="item_btn nav_color4">
            <i class="nav_icon1 iconfont icon-zhuye"></i>
          </div>
          <p class="nav_text">我的主页</p>
        </div>
      </div>
<!--广告图片-->
      <img class="gg_box" src="./../../../static/ss.png" alt="">
    </div>

<!-- VIP推荐 -->
    <div class="vip_box">
      <div class="box_title"><span class="f14" style="position: relative;left:10px;color: #333333">VIP 推荐</span></div>

      <scroller lock-y :scrollbar-x=false>
        <div class="box1">
          <div class="box1-item" v-for="item in 7" @click="toPosterView(vipDta[item].id)">
            <img class="vip_img" :src="vipDta[item].face !== undefined ? vipDta[item].face : '' " alt="">
            <div class="img_style1"><span>热</span></div>
          <div class="img_title">{{ vipDta[item].name }}</div>
          <div class="sj_name">设计师：{{ vipDta[item].designer }}</div>
        </div>

        </div>
      </scroller>
    </div>

    <div style="width: 100%;height: 20px;"></div>

      <div class="poster_item" v-for="item in posterData">
        <div class="cIcon">
          <img :src="item.c_icon" alt="">
        </div>
        <div class="c_name">
          {{ item.cname }}小助手
        </div>

        <div class="poster_text">
          <!--{{ item.text.length > 30 ? item.text.substring(0, 30) + '...' : item.text }}-->
          {{ item.text }}
        </div>

        <div class="posterImg">
          <img :src="item.face === undefined ? '' : item.face" alt="" @click="toPosterView(item.id)">
        </div>

        <div class="poster_vip1" v-show="item.vip === 0">
          免费
        </div>
        <div class="poster_vip2" v-show="item.vip === 1">
          VIP
        </div>

        <div class="poster_time"> {{ new Date(parseInt(item.update_at) * 1000).toLocaleString().split(' ')[0] }}</div>

        <div class="poster_btn" @click="toPosterView(item.id)">去使用</div>
      </div>

    <div>
      <x-dialog v-model="show" class="dialog-demo" style="padding: 10px;" hide-on-blur>
        <div class="img-box">
          <p style="position: relative; top: 10px; width: 90%;margin: 0px auto;font-size: 12px; text-align: left;color: #aaaaaa;">长按识别微信二维码，添加客服好友，为你解答疑问和及时获取最新消息！</p>
          <!--<img src="./../../../static/kf.gif" style="width: 100%">-->
          <img src="./../../../static/kf.jpeg" style="position:relative;top:10px; width: 50%;margin: 0px auto;" alt="">
        </div>
        <div @click="show=false">
          <span style="position:relative; top: -5px;text-align: center;">我知道了</span>
        </div>
      </x-dialog>
    </div>

    <confirm v-model="infoshow"
             title="提示信息"
             @on-cancel="onCancel"
             @on-confirm="onConfirm"
             @on-show="onShow"
             @on-hide="onHide">
      <p style="text-align:center;">{{ '请先完成个人信息' }}</p>
    </confirm>

    <confirm v-model="vipshow"
             title="提示信息"
             confirm-text="开通VIP"
             @on-cancel="onCancel2"
             @on-confirm="onConfirm2"
             @on-show="onShow2"
             @on-hide="onHide2">
      <p style="text-align:center;">{{ '开通VIP才能使用' }}</p>
    </confirm>

    <!--120px;-->
    <div style="position: relative; top: 60px;width: 100%;height: 300px;"></div>
  </div>
  </keep-alive>
</template>
<script type='text/ecmascript-6'>
  import mySwiper from './../../components/MySwiper.vue'
  import t from './../../api/public'
  import wx from 'weixin-js-sdk'
  import { Scroller, XDialog, Confirm, Spinner } from 'vux'

  export default {
    components: {
      mySwiper,
      Scroller,
      XDialog,
      t,
      Spinner,
      Confirm
    },
    data () {
      return {
        posterData: [],
        smallnav: false,
        show: false,
        status: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
        vipDta: {},
        n: 1,
        infoshow: false,
        vipshow: false,
        showDialogStyle: false,
        isVip: 0,
        bugshow: true
      }
    },
    mounted () {
      let that = this
      document.title = '首页'
      document.body.style.background = '#f1f4f5'
      this.$nextTick(function () {
        window.addEventListener('scroll', this.onScroll)
      })
      t.xhr.getPost({
        siteId: 1,
        act: 'home/getIndex',
        data: {
          size: 10
        }
      }, function (data) {
        t.l(data, 101)
        that.posterData = data.data.temp
      })
      t.xhr.getPost({
        siteId: 1,
        act: 'home/index',
        data: {
        }
      }, function (data) {
        t.l(data, 1222)
        that.vipDta = data.data.vip
      })
      t.xhr.getPost({
        siteId: 1,
        act: 'personal/getuserinfo',
        data: {
          token: t.myStorage.getLocal('token')
        }
      }, function (data) {
        t.l(data, 998)
        that.userinfo = data.data.user[0]
        if (data.data.user[0].is_vip === 1) {
          t.myStorage.setLocal('vipstatus', '1')
        } else {
          t.myStorage.setLocal('vipstatus', '0')
        }
        if (data.data.user[0].personstatus === 1 && data.data.user[0].phonestatus === 1) {
          t.myStorage.setLocal('is_perfect', 1)
        } else {
          t.myStorage.setLocal('is_perfect', 0)
        }
        t.myStorage.setLocal('openid', data.data.user[0].openid)
      })
      if (t.myStorage.getLocal('vipstatus') === '1') {
        this.isVip = 1
      } else {
        this.isVip = 0
      }
      t.xhr.getPost({
        siteId: 1,
        act: 'getJssdk',
        data: {
          url: document.location.href.split('#')[0]
        }
      }, function (data) {
        wx.config({

          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。

          appId: data.data.appId, // 必填，公众号的唯一标识

          timestamp: data.data.timestamp, // 必填，生成签名的时间戳

          nonceStr: data.data.nonceStr, // 必填，生成签名的随机串

          signature: data.data.signature, // 必填，签名，见附录1

          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wx.ready(function () {
          wx.onMenuShareTimeline({

            title: '大美业小助手', // 分享标题

            link: document.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

            imgUrl: 'http://dmy.juefei88.com/logo2.png', // 分享图标

            success: function () {
              // 用户确认分享后执行的回调函数
            },

            cancel: function () {

              // 用户取消分享后执行的回调函数

            }

          })

          wx.onMenuShareAppMessage({

            title: '大美业小助手', // 分享标题

            desc: '数千张海报让你的营销更加顺利，大美业小助手打造你的完美朋友圈。', // 分享描述

            link: document.location.href.toString(), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

            imgUrl: 'http://dmy.juefei88.com/logo2.png', // 分享图标

            type: 'link', // 分享类型,music、video或link，不填默认为link

            dataUrl: 'link', // 如果type是music或video，则要提供数据链接，默认为空

            success: function () {
              // 用户确认分享后执行的回调函数
            },

            cancel: function () {

              // 用户取消分享后执行的回调函数

            }

          })
        })
      })
    },
    methods: {
      goPoster () {
        this.$router.push('/postercenter/tj')
      },
      goPersonHome () {
        if (t.myStorage.getLocal('is_perfect') === '1') {
          document.location.href = 'http://dmyzs.test.juefei88.com/h5/ph/#/' + t.myStorage.getLocal('openid')
        } else {
          this.infoshow = true
        }
      },
      toPosterView (id) {
        let that = this
        t.xhr.getPost({
          siteId: 1,
          act: 'home/poster/posterinfo',
          data: {
            id: id
          }
        }, function (data) {
          console.log(data, 77)
          if (data.data.temp[0].vip === 1) {
            if (t.myStorage.getLocal('is_perfect') === '0') {
              that.infoshow = true
            } else if (that.isVip === 0) {
              that.vipshow = true
            } else {
              that.$router.push('/postercenter/preview/' + id)
            }
          } else {
            if (t.myStorage.getLocal('is_perfect') === '0') {
              that.infoshow = true
            } else {
              that.$router.push('/postercenter/preview/' + id)
            }
          }
        })
      },
      toViedo () {
        this.$router.push('/viedo')
      },
      goArticle () {
        this.$router.push('/article')
      },
      openImg1 () {
        this.$router.push('/article')
      },
      openImg2 () {
        this.$router.push('/postercenter/class')
      },
      openImg3 () {
        this.$router.push('/viedo')
      },
      openImg4 () {
        document.location.href = 'http://dmyzs.test.juefei88.com/h5/ph/#/' + t.myStorage.getLocal('openid')
      },
      onScroll () {
        let that = this
        var tt = document.documentElement.scrollTop || document.body.scrollTop
        if (tt >= 1000) {
          this.smallnav = true
        } else {
          this.smallnav = false
        }
        if (tt < 200) {
          this.bugshow = true
        } else {
          this.bugshow = false
        }
        t.l(tt)
        if (tt >= (3000 + (this.n - 1) * 3000)) {
          this.n++
          setTimeout(function () {
            t.xhr.getPost({
              siteId: 1,
              act: 'home/getIndex',
              data: {
                size: 10,
                page: that.n
              }
            }, function (data) {
              if (data.data.temp.length < 10) {
                alert('没有更多数据')
              }
              that.posterData = that.posterData.concat(data.data.temp)
            })
          }, 200)
        }
      },
      onCancel () {
        console.log('on cancel')
      },
      onConfirm (msg) {
        console.log('on confirm')
        this.$router.push('/person')
        if (msg) {
          alert(msg)
        }
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      onCancel2 () {
        console.log('on cancel')
      },
      onConfirm2 (msg) {
        console.log('on confirm')
        this.$router.push('/membervip')
      },
      onHide2 () {
        console.log('on hide')
      },
      onShow2 () {
        console.log('on show')
      }
    }
  }
</script>
<style scoped>
  .kfbox {
    position: fixed;
    right: 10px;
    bottom: 70px;
    width: 60px;
    height: 60px;
    line-height: 30px;
    z-index: 999;
  }
  .kfbox2 {
    position: fixed;
    right: 80px;
    bottom: 110px;
    width: 50%;
    height: 120px;
    line-height: 30px;
    z-index: 900;
  }
  .home_nav {
    position: relative;
    width: 100%;
    height: 175px;
    background: #ffffff;
  }
  .nav_box {
    width: 100%;
    height: 100px;
  }
  .nav_item1 {
    width: 33%;
    float: left;
    text-align: center;
  }
  .item_btn {
    position: relative;
    top: 10px;
    width: 50px;
    height: 50px;
    background: #999999;
    border-radius: 50%;
    margin: 0px auto;
    text-align: center;
  }
  .nav_color1 {
    background-image: linear-gradient(-56deg, #84FAB0 0%, #8FD3F4 93%)!important;
  }
  .nav_color2 {
    background-image: linear-gradient(52deg, #A6C0FE 9%, #8EC5FC 93%)!important;
  }
  .nav_color3 {
    background-image: linear-gradient(52deg, #FA709A 0%, #FEE140 100%)!important;
  }
  .nav_color4 {
    background-image: linear-gradient(52deg, #A8EDEA 0%, #FED6E3 100%)!important;
  }
  .nav_text {
    font-size: 12px;
    font-weight: 200;
    position: relative;
    top: 15px;
    color: #666666;
  }
  .nav_icon1 {
    position: relative;
    top:5px;
    color: #ffffff;
    font-size: 24px;
  }
  .gg_box {
    display: block;
    position: relative;
    width: calc(100% - 20px);
    height: 60px;
    margin: 0px auto;
  }
  .vip_box {
    position: relative;
    top: 10px;
    width: 100%;
    height: 265px;
    background: #ffffff;
    overflow: hidden;
  }
  .box_title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-left: 4px solid #f74c31;
    margin-bottom: 10px;
  }
  .box1 {
    height: 100px;
    position: relative;
    width: 1000px;
  }
  .box1-item {
    width: 110px;
    height: 210px;
    display:inline-block;
    margin-left: 15px;
    float: left;
    text-align: center;
    overflow: hidden;
  }
  .vip_img {
    width: 110px;
    height: 160px;
    overflow: hidden;
  }

  .img_style1 {
       display: inline-block;
       position: relative;
       top: -3px;
       float: left;
       width: 14px;
       height: 14px;
       background-image: linear-gradient(-136deg, #FA709A 0%, #FEE140 100%);
       border-radius: 3px;
       text-align: center;
       font-size: 10px!important;
       color: #ffffff;
    overflow: hidden;
     }
  .img_style2 {
    display: inline-block;
    position: relative;
    top: -3px;
    float: left;
    width: 14px;
    height: 14px;
    background-image: linear-gradient(-135deg, #D4FC79 0%, #96E6A1 100%);
    border-radius: 3px;
    text-align: center;
    font-size: 10px!important;
    color: #ffffff;
  }
  .img_title {
    position: relative;
    left: -10px;
    top: -4px;
    font-size: 12px;
    overflow: hidden;
  }
  .sj_name {
    clear: left;
    position: relative;
    top: 0px;
    left: -8px;
    height: 20px;
    line-height: 20px;
    font-size: 10px;
    width: 100px;
    color: #999999;
    font-weight: 200;
  }
  .poster_item {
    position: relative;
    width:100%;
    height: 300px;
    box-shadow: 0px -2px 4px #f1f1f1!important;
    margin-bottom: 10px;
    background-color: #ffffff;
  }
  .cIcon {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 45px;
    height: 45px;
    overflow: hidden;
  }
  .cIcon img {
    width: 100%;
  }
  .c_name {
    position: absolute;
    left: 75px;
    top: 15px;
    color: #385c5a;
    font-size: 14px;
    font-weight: 400;
  }
  .poster_text {
    position: absolute;
    left: 75px;
    top: 40px;
    width: 240px;
    color: #454545;
    letter-spacing: 2px;
    font-size: 12px;
  }
  .posterImg {
    position: relative;
    width: 110px;
    left: 75px;
    top: 90px;
  }
  .posterImg img {
    width: 100%;
  }
  .poster_vip1 {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 35px;
    height: 18px;
    line-height: 18px;
    color: #8ec5fc;
    border-radius: 3px;
    font-size: 12px;
    border: 1px solid #8ec5fc;
    text-align: center;
  }
  .poster_vip2 {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 35px;
    height: 18px;
    line-height: 18px;
    color: #FF0844;
    border-radius: 3px;
    font-size: 12px;
    border: 0.5px solid #ff8bbf;
    text-align: center;
  }
  .poster_btn {
    position: absolute;
    bottom: 10px;
    right: 15px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    background-image: linear-gradient(52deg, #A6C0FE 9%, #8EC5FC 93%)!important;
    color: #ffffff;
    text-align: center;
    font-size: 12px;
    border-radius: 3px;
  }
  .smallnav {
    position: fixed;
    width: 100%;
    height: 50px;
    background: #ffffff;
    z-index: 9999;
    box-shadow: 0px 2px 2px #f1f4f5;
  }
  .small_btn {
    position: relative;
    top: 8px;
    left:8.5%;
    width: 70px;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    background:-webkit-linear-gradient(left, #84fab0, #8fd3f4);
    text-align: center;
    color: #ffffff;
    font-size: 12px;
    float: left;
    margin-right: 10%!important;;
  }
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 200px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .rotate {
    display: inline-block;
    transform: rotate(-180deg);
  }
  .pullup-arrow {
    transition: all linear 0.2s;
    color: #666;
    font-size: 25px;
  }
  .poster_time {
    position: absolute;
    bottom: 10px;
    left: 75px;
    color: #e4e4e4;
    font-size:12px;
    letter-spacing: 3px;
  }
  .weui-mask {
    z-index: 99!important;
  }

  @media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){
    /*iphone 6*/
    .small_btn {
      position: relative;
      top: 8px;
      left:8.5%;
      width: 70px;
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
      background:-webkit-linear-gradient(left, #84fab0, #8fd3f4);
      text-align: center;
      color: #ffffff;
      font-size: 12px;
      float: left;
      margin-right: 14%!important;
    }
    .poster_text {
      position: absolute;
      left: 75px;
      top: 40px;
      width: 270px;
      color: #454545;
      letter-spacing: 2px;
      font-size: 12px;
    }
  }

  @media (min-device-width : 414px) and (max-device-width : 736px) and (-webkit-min-device-pixel-ratio : 3){
    /*iphone 6 plus*/
    .small_btn {
      position: relative;
      top: 8px;
      left:8.5%;
      width: 70px;
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
      background:-webkit-linear-gradient(left, #84fab0, #8fd3f4);
      text-align: center;
      color: #ffffff;
      font-size: 12px;
      float: left;
      margin-right: 16%!important;
    }
    .poster_text {
      position: absolute;
      left: 75px;
      top: 40px;
      width: 300px;
      color: #454545;
      letter-spacing: 2px;
      font-size: 12px;
    }
  }
</style>
