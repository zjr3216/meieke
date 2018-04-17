<template>
    <div>
      <img :src="tempData.face" class="prev_img" alt="">
      <div class="qr_box" style="display: none;"> <qrcode id="23" style="position: relative;top:5px;left: 5px;" :size=50 :value="person_home" type="img"></qrcode>
        <div id="output"></div>

        <p class="qr_text">扫我二维码</p>
      </div>
      <div class="prev_btn" @click="toTemplat()">立即使用</div>
      <canvas id="myCanvas" style="display: none" ></canvas>
      <qrcode-vue id='qrcodem' :value="value" size="100" class="qr_box" level="H" style="display: none;"></qrcode-vue>

    </div>
</template>
<script type='text/ecmascript-6'>
  import t from './../../api/public'
  import QrcodeVue from 'qrcode.vue'

  export default {
    components: {
      QrcodeVue
    },
    data () {
      return {
        tid: 0,
        tempData: [],
        current_image: '',
        person_home: '',
        value: ''
      }
    },
    mounted () {
      this.value = t.myStorage.getLocal('person_home')
      document.title = '海报预览'
      t.myStorage.setLocal('openid', 'osqwMwJKvlJbgt6tAf1sGDLF063o')
      let that = this
      this.tid = document.location.href.split('#')[1].split('/')[3]
      t.xhr.getPost({
        siteId: 1,
        act: 'home/poster/posterinfo',
        data: {
          id: this.tid
        }
      }, function (data) {
        t.l(data)
        that.tempData = data.data.temp[0]
        that.current_image = data.data.temp[0].image
      })
      this.person_home = t.myStorage.getLocal('person_home')
    },
    methods: {
      toTemplat () {
        if (this.tempData.mid === 17) {
          this.$router.push('/poster/templat1/' + this.tid + '/userid/' + t.myStorage.getLocal('openid'))
        }
        if (this.tempData.mid === 19) {
          this.$router.push('/poster/templat2/' + this.tid + '/userid/' + t.myStorage.getLocal('openid'))
        }
        if (this.tempData.mid === 39) {
          this.$router.push('/poster/templat3/' + this.tid + '/userid/' + t.myStorage.getLocal('openid'))
        }
        if (this.tempData.mid === 38) {
          this.$router.push('/poster/templat4/' + this.tid + '/userid/' + t.myStorage.getLocal('openid'))
        }
        if (this.tempData.mid === 36) {
          this.$router.push('/poster/templat3/' + this.tid + '/userid/' + t.myStorage.getLocal('openid'))
        }
        if (this.tempData.mid === null) {
          let that = this
          var mcanvas = document.getElementById('myCanvas')
          var qrcanvas = document.getElementById('qrcodem').children[0]
          t.myStorage.setLocal('c_img', this.current_image)
          var cxt = mcanvas.getContext('2d')
          mcanvas.width = 750
          mcanvas.height = 1110
          let img = new Image()
          img.src = this.current_image
          img.onload = function () {
            cxt.drawImage(img, 0, 0, 750, 1110)
            cxt.fillStyle = '#ffffff'
            cxt.fillRect(750 / 2 - 60, 1110 - 160, 120, 140)
            cxt.drawImage(qrcanvas, 750 / 2 - 55, 1110 - 150, 110, 110)
            cxt.fillStyle = '#000000'
            cxt.font = 'normal normal normal 16px Arial'
            cxt.fillText('扫我一下啊', 750 / 2 - 40, 1110 - 25)
          }
          setTimeout(function () {
            t.myStorage.setLocal('img3', document.getElementById('myCanvas').toDataURL())
            that.$router.push('/poster/mian/' + that.tid + '/userid/' + t.myStorage.getLocal('openid'))
          }, 1000)
        }
      }
    }
  }
</script>
<style>
  .prev_img {
    display: block;
    width: calc(100% - 20px);
    margin: 0px auto;
    margin-top: 10px;
  }

  .prev_btn {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background-color: #ffffff;
  }
  .qr_box {
    position: absolute;
    bottom: 60px;
  }
</style>
