<template>
    <div>
      <div class="line_box" @click="toBaseInfo()">
        <i class="icon2 iconfont icon-geren"></i>
        <p class="text1 f12">个人信息验证</p>
        <img src="./../../../static/ok.png" v-show="userinfo.personstatus === 0 ? false : true" class="icon_img" alt="">
        <img src="./../../../static/no.png" v-show="userinfo.personstatus === 1 ? false : true" class="icon_img" alt="">
        <p class="icon_text" v-show="userinfo.personstatus === 0 ? false : true">已完善</p>
        <p class="icon_text" v-show="userinfo.personstatus === 1 ? false : true">未完善</p>
      </div>
      <div class="line_box" @click="toUploadQr()">
        <i class="icon2 iconfont icon-erweima"></i>
        <p class="text1 f12">上传我的二维码</p>
        <img src="./../../../static/ok.png" v-show="userinfo.qrstatus === 0 ? false : true" class="icon_img" alt="">
        <img src="./../../../static/no.png" v-show="userinfo.qrstatus === 1 ? false : true" class="icon_img" alt="">
        <p class="icon_text" v-show="userinfo.qrstatus === 0 ? false : true">已完善</p>
        <p class="icon_text" v-show="userinfo.qrstatus === 1 ? false : true">未完善</p>
      </div>
      <div class="line_box" @click="toClubInfo()">
        <i class="icon2 iconfont icon-dianpu"></i>
        <p class="text1 f12">上传我的会所信息</p>
        <img src="./../../../static/ok.png" v-show="clubinfo.status === 0 ? false : true" class="icon_img" alt="">
        <img src="./../../../static/no.png" v-show="clubinfo.status === 1 ? false : true" class="icon_img" alt="">
        <p class="icon_text" v-show="clubinfo.status === 0 ? false : true">已完善</p>
        <p class="icon_text" v-show="clubinfo.status === 1 ? false : true">未完善</p>
      </div>
      <div class="line_box" @click="toClubT()">
        <i class="icon2 iconfont icon-fuwu"></i>
        <p class="text1 f12">添加服务信息</p>
        <img src="./../../../static/ok.png" v-show="clubinfo.servestatus === 0 ? false : true" class="icon_img" alt="">
        <img src="./../../../static/no.png" v-show="clubinfo.servestatus === 1 ? false : true" class="icon_img" alt="">
        <p class="icon_text" v-show="clubinfo.servestatus === 0 ? false : true">已完善</p>
        <p class="icon_text" v-show="clubinfo.servestatus === 1 ? false : true">未完善</p>
      </div>
      <div class="line_box" style="border:none" @click="toClubA()">
        <i class="icon2 iconfont icon-huodong1"></i>
        <p class="text1 f12">添加会所活动信息</p>
        <img src="./../../../static/ok.png" v-show="clubinfo.actstatus === 0 ? false : true" class="icon_img" alt="">
        <img src="./../../../static/no.png" v-show="clubinfo.actstatus === 1 ? false : true" class="icon_img" alt="">
        <p class="icon_text" v-show="clubinfo.actstatus === 0 ? false : true">已完善</p>
        <p class="icon_text" v-show="clubinfo.actstatus === 1 ? false : true">未完善</p>
      </div>

      <div class="fhome" @click="goHome"><img src="./../../../static/fsy.png" alt=""></div>

    </div>
</template>
<script type='text/ecmascript-6'>
  import t from './../../api/public'
  import $ from 'jquery'
  export default {
    components: {},
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
        }
      }
    },
    mounted () {
      document.title = '完善个人主页资料'
      document.body.style.background = '#f1f4f5'
      let that = this
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
        that.person_home = 'http://dmyzs.test.juefei88.com/h5/#/person/personhome/' + data.data.user[0].openid
        t.myStorage.setLocal('person_home', 'http://dmyzs.test.juefei88.com/h5/#/person/personhome/' + data.data.user[0].openid)
      })
      this.$nextTick(function () {
        setTimeout(function () {
          t.myStorage.setLocal('img_base64', $('#23 img')[0].currentSrc)
        }, 1000)
      })
    },
    methods: {
      goHome () {
        this.$router.push('/home')
      },
      toBaseInfo () {
        this.$router.push('/person/baseinfo')
      },
      toUploadQr () {
        this.$router.push('/person/uploadQrCode/1')
      },
      toClubInfo () {
        this.$router.push('/person/clubinfo')
      },
      toClubT () {
        this.$router.push('/person/clubT')
      },
      toClubA () {
        this.$router.push('/person/clubA')
      }
    }
  }
</script>
<style>
  @import "../../styles/PersonCenter.less";
  .fhome {
    position: fixed;
    bottom: 40px;
    right: 10px;
    width: 40px;
    height: 40px;
    overflow: hidden;
  }
  .fhome img {
    width: 100%;
  }
</style>
