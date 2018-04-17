<template>
    <div style="position: absolute;width: 100%;height: 100%;background-color: #ffffff;">
      <div class="header_box">
        <img src="./../../../static/header.png" alt="">
      </div>

      <div class="user_avatar">
        <img :src="userinfo.avatar" alt="">
      </div>

      <p class="nickname">
        {{ userinfo.nickname }}
      </p>
      <div class="userinfo1">
        <span>{{ userinfo.position }}</span>
        <i> | </i>
        <span> 从业{{ userinfo.work_age}}年</span>
      </div>
      <div class="userinfo2">
        服务宣言：{{ userinfo.motto}}
      </div>

      <div class="home_btnbox">
        <div class="home_btn" @click="getFabulous()">
          <svg class="home_icon" aria-hidden="true">
            <use xlink:href="#icon-heart-copy"></use>
          </svg>
          点赞 {{ userinfo.good }}</div>

        <a style="color:#333333;" :href="'tel:' + userinfo.phone" class="call"><div class="home_btn" style="float: right">
          <svg class="home_icon" aria-hidden="true">
            <use xlink:href="#icon-lianxi"></use>
          </svg>
          请联系我</div></a>
      </div>

      <div class="clubInfo">会所信息</div>
      <div style="width: 100%;height: 1200px;background-color: #ffffff;margin-top: 60px;">

        <div class="clubheaderImg">
          <img :src="clubinfo.headimg" alt="">
        </div>

        <div class="clubjs">
          <p>会所介绍：{{ clubinfo.description }}</p>
        </div>
        <div class="clubname">
          <p>会所名称：{{ clubinfo.name }}</p>
        </div>
        <div class="clubaddress">
          <p>会所地址：{{ clubinfo.address }}</p>
        </div>
        <div class="clubtime">
          <p>会所时间：{{ clubinfo.time }}</p>
        </div>

        <div class="clubimglist">
          <div class="img_item" v-for="item in 6" @click="lookimg = item"><img :src="clubImg[item - 1]" alt="" @click="showDialogStyle = true"></div>
        </div>
        <!--<img src="" alt="">-->

        <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': '#000'}">
          <img :src="clubImg[lookimg -1]" alt="" style="position:relative; width: 100%;top: -0px;" @click="showDialogStyle = false">
        </x-dialog>


        <div class="teamBox">
          <p style="text-align: center">会所团队</p>

          <div class="teamImglist">
            <div class="img_item" v-for="item in 6" @click="lookimg2 = item"><img :src="groupimg[item - 1]" alt="" @click="showGroupStyle = true"></div>
          </div>
        </div>

        <x-dialog v-model="showGroupStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': '#000'}">
          <img :src="groupimg[lookimg2 -1]" alt="" style="position:relative; width: 100%;top: -0px;" @click="showGroupStyle = false">
        </x-dialog>

        <div class="clubInfo">会所项目</div>

        <div style="width: 80%;margin: 0px auto;position: relative; top: 60px;font-size: 12px; font-weight: 200">
          <div class="" v-for="item in clubserver">{{ item }}</div>
        </div>

        <div class="clubInfo" style="margin-top: 50px;">会所活动</div>
        <div style="margin: 0px auto; width: 80%; margin-top: 50px;font-weight: 200;font-size: 12px;">
          {{clubinfo.act}}
        </div>

      </div>

      <div class="biaoshi">大美业小助手技术支持</div>
      <toast v-model="goodStatus" type="text" width="20">{{ '今日点赞已达上限' }}</toast>
    </div>
</template>
<script type='text/ecmascript-6'>
  import t from './../../api/public'
  import wx from 'weixin-js-sdk'
  import { XDialog, Toast, TransferDomDirective as TransferDom } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Toast,
      XDialog
    },
    data () {
      return {
        userinfo: {},
        clubinfo: {},
        i: 0,
        time: '',
        goodStatus: false,
        clubImg: [],
        groupimg: [],
        showDialogStyle: false,
        showGroupStyle: false,
        lookimg: 0,
        lookimg2: 0,
        clubserver: []
      }
    },
    mounted () {
      let that = this
      document.title = '个人主页'
      document.body.style.background = '#ffffff'
      t.xhr.getPost({
        siteId: 1,
        act: 'personal/homepage',
        data: {
          openid: document.location.href.split('#')[1].split('/')[3]
        }
      }, function (data) {
        t.l(data, 88)
        that.userinfo = data.data.user[0]
        that.clubinfo = data.data.club[0]
        that.clubImg = data.data.club[0].clubimg.split('||')
        that.groupimg = data.data.club[0].groupimg.split('||')
        that.clubserver = data.data.club[0].serve.split(',')
        t.l(data.data.user[0], 99)
      })
      t.myStorage.setLocal('goodnum', 0)

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

            title: that.clubinfo.name, // 分享标题

            link: 'http://dmyzs.test.juefei88.com/h5/#/person/personhome/osqwMwJKvlJbgt6tAf1sGDLF063o', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

            imgUrl: that.clubinfo.headimg, // 分享图标

            success: function () {
              // 用户确认分享后执行的回调函数
            },

            cancel: function () {

              // 用户取消分享后执行的回调函数

            }

          })

          wx.onMenuShareAppMessage({

            title: that.clubinfo.name, // 分享标题

            desc: that.clubinfo.description.substring(0, 30) + '...', // 分享描述

            link: 'http://dmyzs.test.juefei88.com/h5/#/person/personhome/osqwMwJKvlJbgt6tAf1sGDLF063o', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

            imgUrl: that.clubinfo.headimg, // 分享图标

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
      getFabulous () {
        let that = this
//        let YesDay = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate()
        if (t.myStorage.getLocal('goodnum') < 10) {
          t.xhr.getPost({
            siteId: 1,
            act: 'personal/homepage/good',
            data: {
              openid: document.location.href.split('#')[1].split('/')[3],
              token: t.myStorage.getLocal('token')
            }
          }, function (data) {
            t.l(data, 999)
            if (data.code === '200') {
              that.getUserInfo()
              t.myStorage.setLocal('goodnum', that.i++)
              t.myStorage.setLocal('date', new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate())
            }
          })
        } else {
          this.goodStatus = true
        }
      },
      getUserInfo () {
        let that = this
        t.xhr.getPost({
          siteId: 1,
          act: 'personal/homepage',
          data: {
            openid: document.location.href.split('#')[1].split('/')[3]
          }
        }, function (data) {
          t.l(data)
          that.userinfo = data.data.user[0]
        })
      }
    }
  }
</script>
<style>
  .header_box {
    position: relative;
    width: 100%;
    height: 190px;
  }
  .header_box img {
    width: 100%;
  }
  .user_avatar {
    position: relative;
    top: 60px;
    width: 80px;
    height: 80px;
    margin: 0px auto;
    border-radius: 50%;
    overflow: hidden;
  }
  .user_avatar img {width: 100%;}
  .nickname {
    position: relative;
    top: 60px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .userinfo1 {
    position: relative;

    width: 60%;
    height: 25px;
    line-height: 25px;
    /*border:1px solid #333333;*/
    margin: 0px auto;
    margin-top: 60px;
    text-align: center;
    font-size: 12px;
    color: #666666;
    font-weight: 200;
  }
  .userinfo2 {
    position: relative;

    width: 60%;
    height: 25px;
    line-height: 25px;
    /*border:1px solid #333333;*/
    margin: 0px auto;
    text-align: center;
    font-size: 12px;
    color: #666666;
    font-weight: 200;
  }
  .home_btnbox {
    position: relative;
    top: 20px;
    width: 80%;
    height: 60px;
    line-height: 60px;
    margin: 0px auto;
    /*border: 1px solid #666666;*/
  }
  .home_btn {
    position: relative;
    top:10px;
    width: 45%;
    height: 40px;
    line-height: 40px;
    background-color: #e4ebf5;
    border-radius: 50px;
    text-align: center;
    float: left;
    font-weight: 200;
    font-size: 14px;
  }
  .home_btn:active {
    background-color: #aaaaaa;
  }
  .home_icon {
    position: relative;
    top: 5px;
    width: 24px;
    height: 24px;
  }
  .biaoshi {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 20px;
    background-color: #333333;
    color: #ffffff;
    font-size: 12px;
    text-align: center;
  }
  .clubInfo {
    position: relative;
    top: 40px;
    width: 200px;
    height: 45px;
    line-height: 45px;
    border:5px solid #e4ebf5;
    margin: 0px auto;
    background-color: #add1fc;
    color: #ffffff;
    text-align: center;
  }
  .clubheaderImg {
    position: relative;
    width: 80%;
    height: 140px;
    margin: 0px auto;
    overflow: hidden;
  }
  .clubheaderImg img {
    width: 100%;
  }
  .clubjs {
    position: relative;
    top: 10px;
    width: 80%;
    margin: 0px auto;
    color: #888888;
    font-size: 12px;
  }
  .clubname {
    position: relative;
    top: 20px;
    width: 80%;
    margin: 0px auto;
    color: #888888;
    font-size: 12px;
  }
  .clubaddress {
    position: relative;
    top: 20px;
    width: 80%;
    margin: 0px auto;
    color: #888888;
    font-size: 12px;
  }
  .clubtime {
    position: relative;
    top: 20px;
    width: 80%;
    margin: 0px auto;
    color: #888888;
    font-size: 12px;
  }
  .clubimglist {
    position: relative;
    top: 40px;
    width: 90%;
    height: 200px;
    margin: 0px auto;
    color: #888888;
    font-size: 12px;
  }
  .img_item {
    width: 80px;
    height:80px;
    float: left;
    overflow: hidden;
    margin: 10px;
    background-color: #e1e5e6;
  }
  .img_item img {
    width: 100%;
  }
  .teamBox {
    position: relative;
    top: 50px;
    width: 90%;
    height: 300px;
    margin: 0px auto;
    /*background-color: #888888;*/
    color: #333333;
  }
  .teamImglist {
    position: relative;
    top: 10px;
    height: 200px;
    margin: 0px auto;
    color: #888888;
  }
</style>
