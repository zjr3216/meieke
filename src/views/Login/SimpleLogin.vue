<!--
  SimpleLogin：简单登录，跳转到temp页，这个页面在storage中记录登录方式：wx
-->
<template>
  <div style="position: absolute;width: 100%;height: 100%;background-color: #ffffff">
    <!--<p class="login_title"> 大美业 小助手</p>-->
    <!--<p style="width: 100%;text-align: center">-->
      <!--&lt;!&ndash;<svg class="micon2" aria-hidden="true">&ndash;&gt;-->
        <!--&lt;!&ndash;<use xlink:href="#icon-nv"></use>&ndash;&gt;-->
      <!--&lt;!&ndash;</svg>&ndash;&gt;-->
    <!--</p>-->
    <img style="position:relative; top: 100px;width: 100%" src="./../../../static/1621201.gif" alt="">

    <x-button class="wxLogin_btn" type="primary" @click.native="wxLogin()"> 微信登录</x-button>
    <p class="read_p">登录即表示同意 《<a href="" style="color: #999999;">美E图用户协议</a>》</p>
    <divider class="line_sty1">其他登录</divider>
    <p class="phone_login" @click="toLogin()">
      <svg class="micon1" aria-hidden="true">
        <use xlink:href="#icon-shouji1"></use>
      </svg>
      使用手机登录 </p>
  </div>
</template>
<script type='text/ecmascript-6'>
  import { XButton, Divider } from 'vux'
  import t from './../../api/public'
  import wx from 'weixin-js-sdk'

  export default {
    components: {
      XButton,
      Divider,
      wx
    },
    data () {
      return {
        phone: '',
        vcode: '',
        button_style: 'code_btn',
        btn_status: true,
        btn_text: '点击获取验证码',
        vTime: 60
      }
    },
    mounted () {
      let that = this
      document.title = '登录'
      document.body.style.background = '#ffffff'
      t.xhr.getPost({
        siteId: 1,
        act: 'getJssdk',
        data: {
          url: document.location.href
        }
      }, function (data) {
        t.l(data)
      })
      t.xhr.getPost({
        siteId: 1,
        act: 'val',
        data: {
          token: t.myStorage.getLocal('token')
        }
      }, function (data) {
        t.l(data, 88)
        if (data.code === '200') {
          that.$router.push('/home')
        }
      })
    },
    methods: {
      wxLogin () {
        t.xhr.getPost({
          siteId: 1,
          act: 'wechatLogin',
          data: {
          }
        }, function (data) {
          document.location.href = data.data
          t.myStorage.setLocal('login_method', 'wx')
        })
      },
      phoneLogin () {
        let that = this
        t.xhr.getPost({
          siteId: 1,
          act: 'login',
          data: {
            mode: 'phone',
            phone: this.phone,
            code: this.vcode
          }
        }, function (data) {
          t.l(data)
          if (data.code === '200') {
            t.myStorage.setLocal('token', data.token)
            that.$router.push('/temp')
          }
        })
      },
      toLogin () {
        this.$router.push('/login')
      },
      getTestCode () {
        let that = this
        if (this.btn_status === true) {
          this.button_style = 'code_btn2'
        }
        if (this.btn_status === true) {
          if (this.phone) {
            t.xhr.getPost({
              siteId: 1,
              act: 'getyzm',
              data: {
                phone: this.phone
              }
            }, function (data) {
              console.log(data)
              t.myCookie.setCookie('testCode', data.data)
              that.btn_status = false
              that.button_style = 'code_btn2'
              that.vTime = 60
            })
          }
        }

        if (this.vTime === 0 || this.vTime < 0) {
          this.btn_text = '重新发送验证码'
          this.vTime = 60
          this.btn_status = true
          this.button_style = 'code_btn'
        } else {
          this.btn_text = this.vTime + 's'
          this.vTime--
          setTimeout(function () {
            that.getTestCode()
          }, 1000)
        }
      }
    }
  }
</script>
<style scoped>
  .login_title {
    position: relative;
    top: 100px;
    text-align: center;
    font-size: 24px;
    font-weight: 200;
    color: #333333;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #cccccc; opacity:1;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #cccccc;opacity:1;
  }

  input:-ms-input-placeholder{
    color: #cccccc;opacity:1;
  }

  input::-webkit-input-placeholder{
    color: #cccccc;opacity:1;
  }
  .phone_box {
    position: relative;
    top: 140px;
    width: 90%;
    height: 45px;
    border-radius: 3px;
    background: #ffffff;
    margin: 0px auto;
    overflow: hidden;
  }

  .phone_input {
    position: relative;
    left: 10px;
    width: 200px;
    height: 40px;
    font-size: 14px;
    letter-spacing: 2px;
    color: #666666;
    border:0px!important;
  }

  input:focus{outline:none;}
  .pw {
    position: relative;
    top: 150px;
    width: 90%;
    height: 45px;
    border-radius: 3px;
    margin: 0px auto;
    overflow: hidden;
  }
  .pw_box {
    position: relative;
    width: 50%;
    height: 45px;
    border-radius: 5px;
    background: #ffffff;
    float: left;
  }
  .code_input {
    position: relative;
    left: 10px;
    width: 100px;
    height: 40px;
    font-size: 14px;
    letter-spacing: 2px;
    color: #666666;
    border:0px!important;
  }
  .code_btn {
    position: relative;
    margin-left: 10px;
    width: 45%;
    height: 45px;
    line-height: 45px;
    float: right;
    /*background-image: linear-gradient(45deg, #84fab0 0%, #8fd3f4 100%);*/
    background-image: linear-gradient(45deg, #5ee7df 0%, #b490ca 100%);
    text-align: center;
    font-size: 12px;
    color: #ffffff;
    border-radius: 3px;
    border:0px;
    font-weight: 200;
  }
  .code_btn2 {
    position: relative;
    margin-left: 10px;
    width: 45%;
    height: 45px;
    line-height: 45px;
    float: right;
    /*background-image: linear-gradient(45deg, #84fab0 0%, #8fd3f4 100%);*/
    background-color: #cccccc;
    text-align: center;
    font-size: 12px;
    color: #ffffff;
    border-radius: 3px;
    border:0px;
    font-weight: 200;
  }
  .phoneLogin_btn {
    position: relative;
    top: 170px;
    width: 90%;
    height: 45px;
    border-radius: 22px!important;
    background: #ffffff;
    border:0px;
    color: #333333;
    font-size: 14px;
    font-weight: 200;
  }
  .weui-btn:after {
    border: 0px!important;
  }
  .line_sty1 {
    position: absolute;
    bottom: 60px;
  }
  .wxLogin_btn {
    position: absolute;
    bottom: 160px;
    left: calc(50% - 60px);
    width: 120px;
    height: 45px;
    border-radius: 22px!important;
    background: #ffffff;
    border:0px;
    color: #333333;
    font-size: 14px;
    font-weight: 200;
    border: 2px solid #f74c31;
  }
  .vux-divider{
    font-size: 12px;
  }
  .weui-btn_primary:active {
    background: #cccccc!important;
    color: #ffffff!important;
  }
  .read_p {
    position: absolute;
    bottom: 110px;
    width: 100%;
    margin: 0px auto;
    text-align: center;
    font-size: 12px;
  }
  .phone_login {
    position: absolute;
    bottom: 30px;
    width: 100%;
    text-align: center;
    font-size: 12px;
  }
  .micon1 {
    width:14px;
    height: 14px;
  }
  .micon2 {
    position: relative;
    top: 120px;
    width:100px;
    height: 100px;
  }
</style>
