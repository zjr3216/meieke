<template>
  <div>
      <p class="login_title"> 大美业 小助手</p>
      <div class="phone_box">
        <input class="phone_input" v-model="phone" type="text" placeholder="请输入你的手机">
      </div>
      <div class="pw">
        <div class="pw_box">
          <input class="code_input" v-model="vcode" type="text" placeholder="验证码">
        </div>
        <button :class="button_style" @click="getTestCode()" >{{ btn_text }}</button>
      </div>
    <x-button class="phoneLogin_btn" type="primary" @click.native="phoneLogin()">手机登陆</x-button>

    <divider class="line_sty1">微信登陆</divider>

    <x-button class="wxLogin_btn" type="primary" @click.native="wxLogin()"> 微信登陆</x-button>

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
      document.title = '登陆'
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
        if (data.code === '200') {
          that.$router.push('/home')
        }
      })
//      if (t.myStorage.getLocal('token')) {
//        this.$router.push('/home')
//      }
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
    position: relative;
    top: 190px;
  }
  .wxLogin_btn {
    position: relative;
    top: 200px;
    width: 90%;
    height: 45px;
    border-radius: 22px!important;
    background: #ffffff;
    border:0px;
    color: #333333;
    font-size: 14px;
    font-weight: 200;
  }
  .vux-divider{
    font-size: 12px;
  }
  .weui-btn_primary:active {
    background: #cccccc!important;
    color: #ffffff!important;
  }
</style>
