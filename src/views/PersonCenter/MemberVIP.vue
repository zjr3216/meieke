<template>
    <div class="vippage">
      <div class="vipbox">
      </div>

      <div class="price_box">
        <p class="price_title">会员套餐类型</p>
        <div class="price_line">
          <div class="price_left">VIP年卡(365天)</div>
          <div class="price_right">¥299</div>
        </div>
      </div>

      <div class="vipAdvBox" >
        <svg class="vipicon" aria-hidden="true">
          <use xlink:href="#icon-tuiguanghaibao"></use>
        </svg>
        <div class="adv_title">
          数以万计的高质量海报
        </div>
        <div class="adv_con">
          1、所有的海报免费使用，包括VIP专享
        </div>
        <div class="adv_con">
          2、数以万计的VIP专享海报、模版每日更新，不断增加。
        </div>
      </div>

      <div class="vipAdvBox">
        <svg class="vipicon" aria-hidden="true">
          <use xlink:href="#icon-gift-active"></use>
        </svg>
        <div class="adv_title">
          数以万计的高质量海报
        </div>
        <div class="adv_con">
          1、所有的海报免费使用，包括VIP专享
        </div>
        <div class="adv_con">
          2、数以万计的VIP专享海报、模版每日更新，不断增加。
        </div>
      </div>

      <div class="vipAdvBox">
        <svg class="vipicon" aria-hidden="true">
          <use xlink:href="#icon-touxiang"></use>
        </svg>
        <div class="adv_title">
          数以万计的高质量海报
        </div>
        <div class="adv_con">
          1、所有的海报免费使用，包括VIP专享
        </div>
        <div class="adv_con">
          2、数以万计的VIP专享海报、模版每日更新，不断增加。
        </div>
      </div>

      <div class="vipAdvBox">
        <svg class="vipicon" aria-hidden="true">
          <use xlink:href="#icon-shipin2"></use>
        </svg>
        <div class="adv_title">
          数以万计的高质量海报
        </div>
        <div class="adv_con">
          1、所有的海报免费使用，包括VIP专享
        </div>
        <div class="adv_con">
          2、数以万计的VIP专享海报、模版每日更新，不断增加。
        </div>
      </div>

      <div class="vip_text2">更多活动优惠、更多玩法尽情期待！</div>
      <div style="height: 200px;"></div>

      <div class="open_btn">
        <x-button class="openvip_btn" type="primary" @click.native="show=true"> 点击开通VIP </x-button>
        <p class="vip_text">特别说明：会员一旦开通，不可退款 </p>
      </div>

      <div v-transfer-dom>
        <popup v-model="show" @on-hide="log('hide')" @on-show="log('show')">
          <div class="popup0">
            <x-button class="openvip_btn" id="pay1" v-show="btn_status === 0? true:false" type="primary" style="position: relative; top: 35px;" @click.native="payVip()">支付¥299开通年费VIP</x-button>
            <x-button class="openvip_btn" id="pay2" v-show="btn_status === 1? true:false" type="primary" style="position: relative; top: 35px;" @click.native="payVip2()">188¥续1年年费</x-button>
          </div>
        </popup>
      </div>

    </div>
</template>
<script type='text/ecmascript-6'>
  import { TransferDom, Popup, Group, Cell, XButton, XSwitch } from 'vux'
  import t from './../../api/public'
  import wx from 'weixin-js-sdk'

  export default {
    directives: {
      TransferDom
    },
    components: {
      XButton,
      Popup,
      Group,
      Cell,
      XSwitch,
      wx
    },
    data () {
      return {
        show: false,
        btn_status: 0
      }
    },
    mounted () {
      t.myCookie.setCookie('total_fee', 1)
      let that = this
      t.xhr.getPost({
        siteId: 1,
        act: 'personal/getuserinfo',
        data: {
          token: t.myStorage.getLocal('token')
        }
      }, function (data) {
        if (data.data.user[0].is_vip === 1) {
          that.btn_status = 1
        }
      })
      t.xhr.getPost({
        siteId: 1,
        act: 'getJssdk',
        data: {
          url: document.location.href.split('#')[0]
        }
      }, function (data) {
        t.l(data)

        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.data.appId, // 必填，公众号的唯一标识
          timestamp: data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
          signature: data.data.signature, // 必填，签名，见附录1
          jsApiList: [
            'chooseWXPay',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
//        document.getElementById('pay1').addEventListener('click', function () {
//          alert('ok')
//          t.xhr.getPost({
//            siteId: 1,
//            act: 'order',
//            data: {
//              total_fee: 100,
//              desc: 'test',
//              token: t.myStorage.getLocal('token')
//            }
//          }, function (data) {
//            wx.chooseWXPay({
//              timeStamp: data.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
//              nonceStr: data.data.nonce_str, // 支付签名随机串，不长于 32 位
//              package: 'prepay_id=' + data.data.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
//              signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
//              paySign: data.data.signB, // 支付签名
//              success: function (res) {
//                console.log(res)
// // 支付成功后的回调函数
//              }
//            })
//          })
//        })
      })
    },
    methods: {
      log (str) {
        console.log(str)
      },
      payVip () {
        document.location.href = 'http://dmyzs.test.juefei88.com/Wxpay/example/jsapi.php?total_fee=1'
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~vux/src/styles/close.less';

  .popup0 {
    padding-bottom:15px;
    height:100px;
    background-color: #ffffff;
  }

  .vip_text2 {
    position: relative;
    top: 20px;
    font-weight: 200;
    font-size: 12px;
    text-align: center;
  }
  .adv_con {
    clear: left;
    position: relative;
    width: 90%;
    top: 15px;
    left: 15px;
    color: #888888;
    font-size: 12px;
    font-weight: 200;

  }
  .vipicon {
    position: relative;
    top: 10px;
    left: 10px;
    width: 30px;
    height: 30px;
    float: left;
  }
  .adv_title {
    position: relative;
    top: 15px;
    left: 40px;
    color: #333333;
    font-size: 14px;
    font-weight: 400;
  }
  .price_box {
    position: relative;
    margin: 0px auto;
    margin-top: 70px;
    box-shadow: 0px 5px 8px #cccccc;
    width: 80%;
    height: 150px;
    background-color: #ffffff;
    overflow: hidden;
  }
  .price_title {
    position: relative;
    top: 5px;
    color: #333333;
    font-weight: 400;
    font-size: 16px;
    text-align: center;
  }
  .price_left {
    position: relative;
    float: left;
  }
  .price_right {
    position: relative;
    float: right;
  }
.vippage {
  position: absolute;
  width: 100%;
  height: auto;
  background-image: url("./../../assets/vip_bg.png");
  background-repeat: repeat-y!important;
  background-size: 100%;

}
  .vipbox {
    position: relative;
    top:50px;
    width: 300px;
    height: 300px;
    background-image: url("./../../assets/vip1.png");
    background-size: 100%;
    margin: 0px auto;
    overflow: hidden;
  }
  .open_btn {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 80px;
    background-color: #ffffff;
    box-shadow: 0px -3px 5px #cccccc;
  }
.openvip_btn {
  position: relative;
  top: 10px;
  width: 90%!important;
  height: 45px;
  border-radius: 22px!important;
  background: #ADD1FC!important;
  border:0px!important;
  color: #ffffff!important;
  font-size: 14px!important;
  font-weight: 200;
}
  .openvip_btn::after {
    border:0px!important;
  }
  .vip_text {
    position: relative;
    top: 12px;
    text-align: center;
    font-size:12px;
    color: #999999;
    font-weight: 200;
  }
  .price_line {
    position: relative;
    top: 10px;
    width: 90%;
    height: 35px;
    line-height: 35px;
    margin: 0px auto;
    font-size: 14px;
    font-weight: 200;
  }
  .vipAdvBox {
    position: relative;
    margin: 0px auto;
    margin-top: 20px;
    box-shadow: 0px 5px 8px #aaaaaa;
    border-radius: 5px;
    width: 80%;
    height: 110px;
    background-color: #ffffff;
    overflow: hidden;
  }
</style>
