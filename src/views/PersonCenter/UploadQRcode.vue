<template>
  <div>
    <div class="Qrbox">
      <div class="headerImg_box">
        <img :src="userinfo.avatar" alt="">\
      </div>
      <p class="username1">{{ userinfo.nickname }}</p>
      <p class="dis_text">{{ userinfo.position }}</p>
      <p class="url-box" id="urlBox"></p>


      <qrcode @click.native="openCode()" style="position: relative;top: 50px;text-align: center;" :value="qr_address" type="img"></qrcode>

    </div>

    <x-button type="default" @click.native="openCode()" class="reUpload_btn">上传</x-button>
    <x-button type="default" @click.native="uploadQr()" class="reUpload_btn">保存二维码</x-button>

    <div v-transfer-dom>
      <confirm v-model="isQrcode"
               title="提示"
               @on-cancel="onQrCancel"
               @on-confirm="onQrConfirm"
               @on-show="onQrShow"
               @on-hide="onQrHide">
        <p style="text-align:center;">{{ '新二维码以上传' }}</p>
      </confirm>
    </div>

  </div>
</template>
<script type='text/ecmascript-6'>
  import { XButton, Qrcode, Confirm, TransferDomDirective as TransferDom } from 'vux'
  import t from './../../api/public'
  export default {
    directives: {
      TransferDom
    },
    components: {
      XButton,
      Qrcode,
      Confirm
    },
    data () {
      return {
        qr_address: 'http://www.baidu.com',
        userinfo: {
          avatar: ''
        },
        isQrcode: false,
        qr: false
      }
    },
    mounted () {
      let that = this
      document.title = '上传我的二维码'
      document.body.style.background = '#f1f4f5'
//      this.qr_address = t.myStorage.getLocal('qrcode_address')
      t.xhr.getPost({
        siteId: 1,
        act: 'personal/getuserinfo',
        data: {
          token: t.myStorage.getLocal('token')
        }
      }, function (data) {
        t.l(data)
        that.userinfo = data.data.user[0]
        that.qr_address = data.data.user[0].qrcode
      })
    },
    methods: {
      openCode () {
        document.location.href = 'http://dmyzs.test.juefei88.com/h5/qrcode.html'
      },
      uploadQr () {
        this.isQrcode = true
        if (this.qr === true) {
          this.onQrConfirm()
        }
      },
      onQrCancel () {},
      onQrConfirm () {
        let that = this
        this.qr = true
        if (this.qr === true) {
          t.xhr.getPost({
            siteId: 1,
            act: 'personal/perfected',
            data: {
              token: t.myStorage.getLocal('token'),
              parm: 'qrcode',
              qrcode: t.myStorage.getLocal('qrcode_address')
            }
          }, function (data) {
            that.qr = false
            that.$router.push('/person/wsinfo')
          })
        }
      },
      onQrShow () {},
      onQrHide () {}
    }
  }
</script>
<style>
  .Qrbox {
    position: relative;
    top: 80px;
    width: calc(100% - 20px);
    height: 350px;
    background-color: #ffffff;
    margin: 0px auto;
    border-radius: 3px;
  }
  .reUpload_btn {
    position: relative;
    top: 100px;
    width: 160px!important;
    height: 36px!important;
    line-height: 36px!important;
    background-image: linear-gradient(52deg,#a6c0fe 9%,#8ec5fc 93%)!important;
    color: #ffffff!important;
    font-size: 14px!important;
    font-weight: 200!important;
  }
  .weui-btn:after {
    border: none!important;
  }

  .headerImg_box {
    position: relative;
    top: 20px;
    width: 60px;
    height: 60px;
    margin: 0px auto;
    border-radius: 50%;
    overflow: hidden;
  }
  .headerImg_box img {
    width: 100%;
  }
  .username1 {
    position: relative;
    top: 24px;
    text-align: center;
    font-size: 14px;
  }
  .dis_text {
    position: relative;
    top: 24px;
    text-align: center;
    font-size: 12px;
    color: #999999;
    font-weight: 200;
  }

</style>
