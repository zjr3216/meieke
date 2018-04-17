<template>
    <div id="posterView">
      <img :src="imgSrc" alt="" class="imgbox" @click="showDialogStyle = true">

      <p class="tj_title">推荐文案</p>

      <div class="text2_box">
        <div style="margin: 10px" class="auth_text2">{{ current_text2 }}</div>
        <div class="text2_toolbox">
          <div class="tools1_btn" v-show="mod_class === 1" @click="changeText2">换一换</div>
          <div class="tools1_btn" v-show="mod_class === 0" >换一换</div>
          <div class="copy_text_button" @click="copyText()" >复制</div>
        </div>
      </div>


      <div v-transfer-dom>
        <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}">
            <img :src="imgSrc" alt="" class="imgbox2" @click="showDialogStyle = false">
        </x-dialog>
      </div>

      <div class="main_btn">长按保存图片</div>
      <toast v-model="show8" type="text" text="文字复制成功" position="middle"></toast>
      <toast v-model="show9" type="text" text="文字复制不成功，请长按文字保存" position="middle"></toast>
    </div>
</template>
<script type='text/ecmascript-6'>
  import t from './../../api/public'
  import Clipboard from 'clipboard'
  import { XDialog, Toast, TransferDomDirective as TransferDom } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      XDialog,
      Toast,
      Clipboard
    },
    data () {
      return {
        imgSrc: '',
        showDialogStyle: false,
        tid: 0,
        text2Data: [],
        current_text2: '',
        current_text_num: 0,
        show8: false,
        show9: false,
        pagenum: 0,
        mod_class: 0
      }
    },
    mounted () {
      let that = this
      this.tid = document.location.href.split('#')[1].split('/')[3]
      document.title = '海报下载'
      t.xhr.getPost({
        siteId: 1,
        act: 'home/poster/posterinfo',
        data: {
          id: this.tid
        }
      }, function (data) {
        t.l(data)
        that.tempData = data.data.temp[0]
        if (data.data.temp[0].mid) {
          that.imgSrc = t.myStorage.getLocal('img2')
          that.text2Data = data.data.text2
          that.current_text2 = data.data.text2[0].text
          that.mod_class = 1
        } else {
          that.imgSrc = t.myStorage.getLocal('img3')
          that.current_text2 = data.data.temp[0].text
          that.mod_class = 0
        }
        //
      })
    },
    methods: {
      changeText2 () {
        let count = this.text2Data.length
        if (this.current_text_num === (count - 1)) {
          this.current_text_num = 0
        } else {
          this.current_text2 = this.text2Data[this.current_text_num].text
          this.current_text_num++
        }
      },
      copyText () {
        let that = this
        // 所有功能必须包含在 WeixinApi.ready 中进行
        let clip = new Clipboard('.copy_text_button', {
          target: function () {
            return document.querySelector('.auth_text2')
          }
        })
        clip.on('success', function (e) {
          that.$data.show8 = true
          console.log(e)
        })

        clip.on('error', function (e) {
          console.log(e, 123)
          that.$data.show9 = true
        })

        if (this.pagenum === 0) {
          this.pagenum++
          let clip = new Clipboard('.copy_text_button', {
            target: function () {
              return document.querySelector('.auth_text2')
            }
          })
          clip.on('success', function (e) {
            that.$data.show8 = true
            console.log(e)
          })

          clip.on('error', function (e) {
            console.log(e, 123)
            that.$data.show9 = true
          })
        }
      }
    }
  }
</script>
<style lang="less">
  @import '~vux/src/styles/close';

  .imgbox {
  display: block;
  position: relative;
  top:10px;
  width: 50%;
  margin: 0px auto;
}
  .imgbox2 {
    display: block;
    position: relative;
    top:10px;
    width: 100%;
    margin: 0px auto;
  }
  .main_btn {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #ffffff;
    text-align: center;
  }
  .tj_title {
    position: relative;
    text-align: center;
    top: 20px;
    font-size: 14px;
    font-weight: 200;
    color: #888888;
  }
  #posterView .weui-mask {
    background-color: rgba(0,0,0,1)!important;
  }
  .text2_box {
    position: relative;
    top: 40px;
    width: calc(100% - 20px) !important;
    height: 120px;
    background-color: #ffffff;
    margin: 0px auto;
    color: #999999;
    font-size: 14px;
    overflow: hidden;
  }
  .text2_toolbox {
    position: absolute;
    bottom: 0px;
    border-top: 1px solid #f1f2f1;
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
  .copy_text_button {
    width: 50%;
    text-align: center;
    float: left;
  }
  .tools1_btn {
    width: 50%;
    text-align: center;
    float: left;
  }
  .tools1_btn:active {
    background-color: #f1f1f1;
  }
</style>
