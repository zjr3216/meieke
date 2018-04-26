<template>
    <div>
      <div class="header_box">
        <svg class="icon3" style="position: absolute; left:80px; top: 30px;transform:rotate(45deg);" aria-hidden="true">
          <use xlink:href="#icon-huiyuan"></use>
        </svg>
        <div class="portrait">
          <img :src="userinfo.avatar" alt="">
        </div>
        <div class="username f18 flp2 tit1"> {{ userinfo.nickname }} </div>
        <div class="infotext f12 text1" > vip: <span style="color: #f74c31;">{{ vipdate + '天'}} </span> </div>
        <div class="infotext f12 text1" > 积分: 0 </div>
        <div class="infotext f12 text1">  服务宣言: {{ userinfo.motto }} </div>

        <div class="home_box"><i class="icon1 iconfont icon-shouye" @click="toPersonHome()"></i></div>
        <p class="home_text f12 " @click="toPersonHome()">个人主页</p>
      </div>

      <div class="verification" style="margin-top: 115px;">
        <div class="line_box" @click="toPhone()">
          <i class="icon2 iconfont icon-shouji1"></i>
          <p class="text1 f12">手机验证</p>
          <img src="./../../../static/ok.png" v-show="userinfo.phonestatus === 0 ? false : true" class="icon_img" alt="">
          <img src="./../../../static/no.png" v-show="userinfo.phonestatus === 1 ? false : true" class="icon_img" alt="">
          <p class="icon_text" v-show="userinfo.phonestatus === 0 ? false : true">已完善</p>
          <p class="icon_text" v-show="userinfo.phonestatus === 1 ? false : true">未完善</p>
        </div>
        <div class="line_box" style="margin-top: 10px;" @click="toInfo">
          <i class="icon2 iconfont icon-sheji"></i>
          <p class="text1 f12">完善个人主页信息</p>
          <!--<img src="./../../../static/ok.png" v-show="userinfo.phonestatus === 0 ? false : true" class="icon_img" alt="">-->
          <!--<img src="./../../../static/no.png" v-show="userinfo.phonestatus === 1 ? false : true" class="icon_img" alt="">-->
          <!--<p class="icon_text" v-show="userinfo.phonestatus === 0 ? false : true">已完善</p>-->
          <!--<p class="icon_text" v-show="userinfo.phonestatus === 1 ? false : true">未完善</p>-->
        </div>

      </div>

      <div class="active_box">
      <div class="line_box" @click="toMemberVIP()">
        <svg class="icon3" aria-hidden="true">
          <use xlink:href="#icon-huiyuan"></use>
        </svg>
        <p class="text1 f12">开通VIP会员</p>

        <i class="rightjt iconfont icon-mjiantou"></i>
        <p class="icon_text" style="margin-right:  20px;color: #f74c31;" v-show="isVip === 0 ? false : true">已开通</p>
        <p class="icon_text" style="margin-right:  20px;" v-show="isVip === 1 ? false : true">未开通</p>
      </div>
      <div class="line_box" @click="toActivlePage(url)">
        <svg class="icon3" aria-hidden="true">
          <use xlink:href="#icon-huodong"></use>
        </svg>
        <p class="text1 f12">获取你的推广二维码</p>
        <i class="rightjt iconfont icon-mjiantou"></i>
      </div>

        <div class="line_box" style="border:none" @click="toAboutMe()">
          <svg class="icon3" aria-hidden="true">
            <use xlink:href="#icon-guanyuwomen"></use>
          </svg>
          <p class="text1 f12">关于我们</p>
          <i class="rightjt iconfont icon-mjiantou"></i>
        </div>
    </div>

      <div class="goout_box" style="">
        <div class="line_box" @click="toLogin()">
          <svg class="icon3" aria-hidden="true">
            <use xlink:href="#icon-Group"></use>
          </svg>
          <p class="text1 f12">退出</p>
        </div>
      </div>


      <div style="position: relative; top: 60px;width: 100%;height: 120px;">

      </div>

        <x-dialog v-model="showHideOnBlur" class="dialog-demo">
          <p style="margin-top: 10px;">手机验证</p>
          <div class="phone_inputbox">
          <input class="phone_input" v-model="phone" type="text" placeholder="请输入手机号码">
          </div>

          <div class="phone_inputbox" style="border: 0px;">
            <div class="yz_inputbox">
              <input class="yz_input" v-model="yzcode" type="text" placeholder="验证码">
            </div>
            <button id="yz_btn" :class="button_style" @click="getTestCode()" >{{ btn_text }}</button>
          </div>

          <div style="clear:right;clear:left;width: 80%;margin: 20px auto;">
            <button class="binding_btn" @click="bindPhone()">绑定手机</button>
          </div>

          <div @click="showHideOnBlur=false">
            <span class="vux-close"></span>
          </div>
        </x-dialog>

      <qrcode id="23" style="position: relative;top:5px;left: 5px;display: none" :size=50 :value="person_home" type="img"></qrcode>

    </div>
</template>
<script type='text/ecmascript-6'>
  import t from './../../api/public'
  import { XDialog, Qrcode, XButton, TransferDomDirective as TransferDom } from 'vux'
  import $ from 'jquery'

  export default {
    directives: {
      TransferDom
    },
    components: {
      TransferDom,
      XDialog,
      XButton,
      Qrcode
    },
    data () {
      return {
        userinfo: {
          phonestatus: 0,
          personstatus: 0,
          qrstatus: 0
        },
        clubinfo: {
          status: 0,
          servestatus: 0,
          actstatus: 0
        },
        showHideOnBlur: false,
        btn_status: true,
        button_style: 'code_btn',
        btn_text: '点击发送验证码',
        phone: '',
        yzcode: '',
        vTime: 60,
        person_home: '',
        isVip: 0,
        vipdate: 0,
        url: ''
      }
    },
    /***
     * 1、设置微信导航栏标题和页面背景色底色
     * 2、获取用户信息和club 信息
     * 3、使用$nextTick设置 3个Storage对象 （20180201）
     *    openid
     *    person_home
     *    img_base64
     *    is_perfect  设置是否完善个人基本信息
     *    vipstatus   设置VIP状态
     *
     * @type {string}
     */
    mounted () {
      document.title = '个人中心'
      document.body.style.background = '#f1f4f5'
      let that = this
      t.xhr.getPost({
        siteId: 1,
        act: 'home/surl',
        data: {
          url: 'http://dmyzs.test.juefei88.com/h5/ph/#/' + t.myStorage.getLocal('openid')
        }
      }, function (data) {
        t.l(data, 111)
        t.myStorage.setLocal('person_home', data.data.url)
      })
//      $.post('http://suo.im/api.php', {url: 'http://dmyzs.test.juefei88.com/h5/ph/' + t.myStorage.getLocal('openid')},
//          function (data) {
//            console.log(data, 55)
//          }
//        )
      // 获取用户VIP状态
      t.xhr.getPost({
        siteId: 1,
        act: 'personal/getuserinfo',
        data: {
          token: t.myStorage.getLocal('token')
        }
      }, function (data) {
        t.l(data, 998)
        that.userinfo = data.data.user[0]
        that.clubinfo = data.data.club[0]
        that.vipdate = parseInt((data.data.user[0].vip - Date.parse(new Date()) / 1000) / (3600 * 24))
        if (data.data.user[0].is_vip === 1) {
          t.myStorage.setLocal('vipstatus', '1')
        } else {
          t.myStorage.setLocal('vipstatus', '0')
        }
        if (that.userinfo.phonestatus === 0) {
          that.showHideOnBlur = true
        }
        t.l(data.data.user[0], 888)
        if (data.data.user[0].personstatus === 1 && data.data.user[0].phonestatus === 1) {
          t.myStorage.setLocal('is_perfect', 1)
        } else {
          t.myStorage.setLocal('is_perfect', 0)
        }
        t.myStorage.setLocal('openid', data.data.user[0].openid)
        that.person_home = 'http://dmyzs.test.juefei88.com/h5/ph/#/' + data.data.user[0].openid
      })
      t.xhr.getPost({
        siteId: 1,
        act: 'wx/qrcodeurl',
        data: {
          openid: t.myStorage.getLocal('openid')
        }
      }, function (data) {
        t.l(data, 111)
        that.url = data.data
      })
      this.$nextTick(function () {
        setTimeout(function () {
          t.myStorage.setLocal('img_base64', $('#23 img')[0].currentSrc)
        }, 1000)
      })
      if (t.myStorage.getLocal('vipstatus') === '1') {
        this.isVip = 1
      } else {
        this.isVip = 0
      }
    },
    methods: {
      toInfo () {
        this.$router.push('/person/wsinfo')
      },
      toBaseInfo () {
        this.$router.push('/person/info')
      },
      toUploadQr () {
        this.$router.push('/person/uploadQrCode/1')
      },
      toLogin () {
        t.myStorage.remLocal('token')
        t.myStorage.remLocal('openid')
        this.$router.push('/simplelogin')
      },
      toMemberVIP () {
        this.$router.push('/membervip')
      },
      toPersonHome () {
        document.location.href = 'http://dmyzs.test.juefei88.com/h5/ph/#/' + t.myStorage.getLocal('openid')
      },
      toPhone () {
        let that = this
        that.showHideOnBlur = true
      },
      /***
       *  获取验证码
       */
      getTestCode () {
        let that = this
        if (this.btn_status === true) {
          this.button_style = 'code_btn2'
          document.getElementById('yz_btn').setAttribute('disabled', true)
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
          document.getElementById('yz_btn').removeAttribute('disabled')
          this.button_style = 'code_btn'
        } else {
          this.btn_text = this.vTime + 's'
          this.vTime--
          setTimeout(function () {
            that.getTestCode()
          }, 1000)
        }
      },
      // 绑定手机方法
      bindPhone () {
        let that = this
        if (this.yzcode === t.myCookie.getCookie('testCode')) {
          t.xhr.getPost({
            siteId: 1,
            act: 'personal/perfected',
            data: {
              token: t.myStorage.getLocal('token'),
              parm: 'phone',
              phone: this.phone
            }
          }, function (data) {
            if (data.code === '200') {
              that.showHideOnBlur = false
              document.location.reload()
            }
          })
        }
      },
      toActivlePage (url) {
        document.location.href = url
      },
      toClubInfo () {
        this.$router.push('/person/clubinfo')
      },
      toClubT () {
        this.$router.push('/person/clubT')
      },
      toClubA () {
        this.$router.push('/person/clubA')
      },
      toAboutMe () {
        this.$router.push('/person/about')
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~vux/src/styles/close';
  @import "../../styles/PersonCenter";

</style>
