<template>
    <div>
      <div class="tx_box">
        <div class="tx_title tit1">头像</div>
        <div class="tx_text1">用于主页和海报生成</div>
        <img class="tx_img" :src="userinfo.avatar" alt="">
        <file-base64  style="display:block;position:absolute; top: 10px; right: 20px;width: 80px;height: 80px;margin: 0px auto;opacity:0;z-index: 999;"
                      v-bind:multiple="true"
                      v-bind:done="getUserA">
        </file-base64>

      </div>

      <div class="baseinfo_submit">
        <div class="line_box2">
          <div class="linebox_title tit1">昵称</div>
          <div class="linebox_text1">用于制作主页的海报生成</div>
          <div class="linebox_input">
            <input type="text" v-model="name"/>
          </div>
        </div>

        <div class="line_box2">
          <datetime
            format="YYYY"
            v-model="value1"
            :min-year=minYear
            @on-change="change"
            title="入行时间"
            @on-cancel="log('cancel')"
            @on-confirm="log('confirm')"
            @on-hide="log('hide', $event)"></datetime>
        </div>
        <div class="line_box2">
          <popup-picker title="职位"
                        :data="list1"
                        v-model="value2"
                        @on-show="onShow2"
                        @on-hide="onHide2"
                        @on-change="onChange"
                        placeholder="请选择"></popup-picker>
          <!--<div class="linebox_title tit1">职称</div>-->
          <!--<div class="linebox_text1">用于制作主页的海报生成</div>-->
          <!--<i class="rightjt iconfont icon-mjiantou"></i>-->
        </div>


        <div class="line_box2" style="height: 120px;">
          <div class="linebox_title tit1" style="top: 15px;">服务宣言</div>
          <div class="linebox_textInput">
            <textarea rows="5" cols="40" style="color: #888888;" placeholder="请输入您的服务宣言" v-model="motto">
            </textarea>
          </div>
        </div>
      </div>

      <confirm v-model="isHeader"
               title="提示信息"
               confirm-text="替换"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
               @on-show="onShow"
               @on-hide="onHide">
        <p style="text-align:center;">{{ '是否更换头像' }}</p>
      </confirm>

      <x-button class="saveInfo_btn" type="warn" @click.native="saveBaseinfo()">保存 </x-button>

      <div v-transfer-dom>
        <confirm v-model="isBase"
                 title="提示"
                 @on-cancel="onBaseCancel"
                 @on-confirm="onBaseConfirm"
                 @on-show="onBaseShow"
                 @on-hide="onBaseHide">
          <p style="text-align:center;">{{ '基本信息以完善' }}</p>
        </confirm>
      </div>

    </div>
</template>
<script type='text/ecmascript-6'>
  import t from './../../api/public'
  import { Datetime, Picker, DatetimePlugin, PopupPicker, XButton, Confirm, TransferDomDirective as TransferDom } from 'vux'
  import fileBase64 from 'vue-file-base64'
  import Vue from 'vue'
  Vue.use(DatetimePlugin)

  export default {
    directives: {
      TransferDom
    },
    components: {
      Datetime,
      Picker,
      DatetimePlugin,
      PopupPicker,
      XButton,
      fileBase64,
      Confirm
    },
    data () {
      return {
        userinfo: {
          avatar: ''
        },
        value1: '请选择',
        value2: ['美容师'],
        list1: [['美容师', '顾问', '店长', '经理', '创始人', '大区经理', '市场总监', '技术总监', '教育总监', '总经理', '其他']],
        motto: '',
        name: '',
        dialogImageUrl: '',
        dialogVisible: false,
        isHeader: false,
        changA: false,
        headerImg: '',
        minYear: 1980,
        isBase: false,
        baseInfo: false
      }
    },
    mounted () {
      let that = this
      document.title = '完善个人基本信息'
      document.body.style.backgroundColor = '#f1f4f5'
      t.xhr.getPost({
        siteId: 1,
        act: 'personal/getuserinfo',
        data: {
          token: t.myStorage.getLocal('token')
        }
      }, function (data) {
        that.userinfo = data.data.user[0]
        that.name = data.data.user[0].nickname
        that.value1 = (new Date().getFullYear() - data.data.user[0].work_age + 1).toString()
        that.value2 = [data.data.user[0].position]
        that.motto = data.data.user[0].motto
      })
    },
    methods: {
      change (value) {
        t.l(value)
        this.value = value
      },
      log (str1, str2 = '') {
        console.log(str1, str2)
      },
      showPlugin () {
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY',
          value: '2017',
          onConfirm (val) {
            console.log('plugin confirm', val)
          },
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          }
        })
      },
      imageUploded (res) {
        t.l(res)
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
//      demo () {
// //        var formData = new FormData(document.getElementById('dd'))
// //        formData.append('file', $('#file')[0].files[0])
// //        console.log(formData, 2323)
//        console.log($('#file')[0].files[0], 343)
//        $.ajax({
//          url: 'http://dmyzs.test.juefei88.com/form/personal/avatar',
//          type: 'POST',
//          contentType: 'multipart/form-data',
//          data: {
//            file: $('#file').val()
//          },
//          async: true,
//          cache: false,
//          processData: false,
//          success: function (e) {
//            console.log(e)
//          }
//        })
//      },
      saveBaseinfo () {
        this.isBase = true

        if (this.baseInfo === true) {
          this.onBaseConfirm()
        }
      },
      getUserA (files) {
        this.isHeader = true
        this.headerImg = files[0].base64
        t.l(files, 11)
        if (this.changA === true) {
          this.onConfirm()
        }
      },
      onCancel () {},
      onConfirm () {
        let that = this
        this.changA = true
        if (this.changA === true) {
          t.xhr.getPost({
            siteId: 1,
            act: '/personal/avatar',
            data: {
              openid: t.myStorage.getLocal('openid'),
              avatar: this.headerImg
            }
          }, function (data) {
            t.l(data, 100)
            that.changA = false
            that.userinfo.avatar = data.data
          })
        }
      },
      onShow () {},
      onHide () {},
      onBaseCancel () {},
      onBaseConfirm () {
        let that = this
        this.baseInfo = true
        if (this.baseInfo === true) {
          t.xhr.getPost({
            siteId: 1,
            act: 'personal/perfected',
            data: {
              token: t.myStorage.getLocal('token'),
              parm: 'person',
              name: this.name,
              work_age: this.value,
              position: this.value2[0],
              motto: this.motto
            }
          }, function (data) {
            that.baseInfo = false
            if (data.code === '200' || data.code === '403') {
              that.$router.push('/person/wsinfo')
            }
            t.l(data, 89)
          })
        }
      },
      onBaseShow () {},
      onBaseHide () {},
      onChange () {},
      onShow2 () {},
      onHide2 () {}
    }
  }
</script>
<style lang="less" >
@import "../../styles/BaseInfo";
</style>
