<template>
    <div>
      <div class="artivle_header">
        <div class="article_title"> {{ articleData.name }}</div>
        <div class="article_date" style="margin-left: 20px;">文章时间：{{ newDate }}</div>
        <div class="article_date" style="margin-left: 20px;">文章作者：{{ userinfo.nickname }}</div>
      </div>
    <div id="art" style="background-color: #ffffff;">
      <div class="art_content" style="padding-top: 20px;">

      </div>
    </div>

      <div class="artivle_footer">
        <div style="position: relative;width: 90%;height: 180px;margin: 0px auto;border: 1px solid #e1e1e1;">
          <qrcode style="position: absolute;top: 20px;left: 10px;" :value="personHome" :size=120 type="img"></qrcode>
          <p style="position: absolute; top: 20px; left: 140px;font-size: 12px;"> 会所名称：{{ clubinfo.name }}</p>
          <p style="position: absolute; top: 60px; left: 140px;font-size: 12px;"> 会所地址：{{ clubinfo.address }}</p>
          <p style="position: absolute; top: 150px; left: 30px;font-size: 12px;"> 扫我看更多！！！</p>
        </div>
      </div>
    </div>
</template>
<script type='text/ecmascript-6'>
  import t from './../../api/public'
  import { Qrcode } from 'vux'
  import $ from 'jquery'
  import wx from 'weixin-js-sdk'

  export default {
    components: {
      $,
      Qrcode
    },
    data () {
      return {
        articleData: [],
        newDate: '',
        userinfo: '',
        clubinfo: '',
        personHome: 'http://dmyzs.test.juefei88.com/h5/#/person/personhome/' + document.location.href.split('#')[1].split('/')[4]
      }
    },
    mounted () {
      let that = this
      document.body.style.background = '#ffffff'
      this.newDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
      t.xhr.getPost({
        siteId: 1,
        act: 'home/article',
        data: {
          id: document.location.href.split('#')[1].split('/')[2]
        }
      }, function (data) {
        t.l(data, 188)
        document.getElementsByClassName('art_content')[0].innerHTML = data.data[0].content
        that.articleData = data.data[0]
        document.title = data.data[0].name
      })
      t.xhr.getPost({
        siteId: 1,
        act: 'personal/homepage',
        data: {
          openid: document.location.href.split('#')[1].split('/')[4]
        }
      }, function (data) {
        t.l(data, 88)
        that.userinfo = data.data.user[0]
        that.clubinfo = data.data.club[0]
      })
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

            title: that.articleData.name, // 分享标题

            link: document.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

            imgUrl: that.articleData.face, // 分享图标

            success: function () {
              // 用户确认分享后执行的回调函数
            },

            cancel: function () {

              // 用户取消分享后执行的回调函数

            }

          })

          wx.onMenuShareAppMessage({

            title: that.articleData.name, // 分享标题

            desc: that.articleData.name, // 分享描述

            link: document.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

            imgUrl: that.articleData.face, // 分享图标

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
    }
  }
</script>

<style>
  #art {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .art_content {
    position: relative;
    width: 90%;
    margin: 0px auto;
  }
  .artivle_header {
    background-color: #ffffff;
  }
  .article_title {
    font-size: 24px;
    line-height: 60px;
    text-align: center;
  }
  .article_date {
    font-size: 12px;
    color: #888888;
    float: left;
  }
  .artivle_footer {
    width: 100%;
    height: 200px;
    background-color: #ffffff;
  }
</style>
