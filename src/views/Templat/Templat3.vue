<template>
    <div>
      <img id="backimg" :src="current_image" class="temp_img" alt="">
      <div class="current_btn1" @click="changeImage()">
        <div class="current_btn_box">
          <i class="btn_icon iconfont icon-tupian"></i>
          <p class="btn_text">换图</p>
        </div>
      </div>

      <div class="current_btn2" @click="changeText()">
        <div class="current_btn_box">
          <i class="btn_icon iconfont icon-sheji1"></i>
          <p class="btn_text">换字</p>
        </div>
      </div>

      <div class="qr_box"> <qrcode id="23" style="position: relative;top:5px;left: 10px;" :size=70 :value="person_home" type="img"></qrcode>
        <p class="qr_text">扫我二维码</p>
      </div>
      <p class="text1" style="">{{ current_text }}</p>
      <canvas id="myCanvas" style="display: none" ></canvas>

      <p class="date_text2">{{current_date[0]}}/{{current_date[1]}}/{{current_date[2]}}</p>
      <p class="date_text3">by {{ personData.nickname }}</p>
      <div class="poster2img_btn" @click="canvas2img()">一键生成海报</div>
    </div>
</template>
<script type='text/ecmascript-6'>
  import t from './../../api/public'
  import $ from 'jquery'
  import { Qrcode } from 'vux'

  window.onload = function () {
    t.myStorage.setLocal('img_base64', $('#23 img')[0].currentSrc)
  }

  export default {
    components: {
      Qrcode
    },
    data () {
      return {
        tid: 0,
        tempData: [],
        text1Data: [],
        imageData: [],
        current_image: '',
        current_img_num: 0,
        current_text: '',
        current_text_num: 0,
        personData: '',
        current_date: [],
        person_home: ''
      }
    },
    mounted () {
      document.body.title = '海报编辑'
      this.person_home = t.myStorage.getLocal('person_home')
      this.createTime()
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
        that.text1Data = data.data.text1
        that.imageData = data.data.image
        that.current_image = that.tempData.image
        that.current_text = that.text1Data[0].text
        //
      })

      t.xhr.getPost({
        siteId: 1,
        act: 'personal/homepage',
        data: {
          openid: t.myStorage.getLocal('openid')
        }
      }, function (data) {
        t.l(data)
        that.personData = data.data.user[0]
      })
    },
    /***
     * todo ssdsds
     */
    methods: {
      createTime () {
        let myDate = new Date()
        this.current_date[0] = myDate.getFullYear()
        this.current_date[2] = myDate.getDate()
        switch (myDate.getDay()) {
          case 0:
            this.current_date[3] = 'Sun'
            break
          case 1:
            this.current_date[3] = 'Mon'
            break
          case 2:
            this.current_date[3] = 'Tur'
            break
          case 3:
            this.current_date[3] = 'Wes'
            break
          case 4:
            this.current_date[3] = 'Thur'
            break
          case 5:
            this.current_date[3] = 'Fri'
            break
          case 6:
            this.current_date[3] = 'Satur'
            break
        }
        switch (myDate.getMonth() + 1) {
          case 1:
            this.current_date[1] = '01'
            break
          case 2:
            this.current_date[1] = '02'
            break
          case 3:
            this.current_date[1] = '03'
            break
          case 4:
            this.current_date[1] = '04'
            break
          case 5:
            this.current_date[1] = '05'
            break
          case 6:
            this.current_date[1] = '06'
            break
          case 7:
            this.current_date[1] = '07'
            break
          case 8:
            this.current_date[1] = '08'
            break
          case 9:
            this.current_date[1] = '09'
            break
          case 10:
            this.current_date[1] = '10'
            break
          case 11:
            this.current_date[1] = '11'
            break
          case 12:
            this.current_date[1] = '12'
            break
        }
        t.l(this.current_date, 99)
      },
      changeImage () {
        let count = this.imageData.length
        if (this.current_img_num > (count - 1)) {
          this.current_img_num = 0
        } else {
          this.current_img_num++
          this.current_image = this.imageData[this.current_img_num].image
        }
        t.myStorage.setLocal('img_base64', $('#23 img')[0].currentSrc)
        this.pseron_home = t.myStorage.getLocal('person_home')
      },
      changeText () {
        let count = this.text1Data.length
        if (this.current_text_num > (count - 1)) {
          this.current_text_num = 0
        } else {
          this.current_text_num++
          this.current_text = this.text1Data[this.current_text_num].text
        }
        t.myStorage.setLocal('img_base64', $('#23 img')[0].currentSrc)
        this.pseron_home = t.myStorage.getLocal('person_home')
      },
      canvas2img () {
        let that = this
        var mcanvas = document.getElementById('myCanvas')
        t.myStorage.setLocal('c_img', this.current_image)
        var cxt = mcanvas.getContext('2d')
        mcanvas.width = 750
        mcanvas.height = 1110
        let img = new Image()
        let qr = new Image()
        img.src = this.current_image
        qr.src = t.myStorage.getLocal('img_base64')
        qr.onload = function () {
          cxt.drawImage(img, 0, 0, 750, 1110)
          cxt.fillStyle = '#ffffff'
          cxt.fillRect(750 - 140, 1110 - 160, 120, 140)
          cxt.font = '200 28px impact'
          cxt.fillStyle = '#333333'
          cxt.fillText(that.current_text.slice(0, 25), 50, 1110 * 0.58)
          cxt.fillText(that.current_text.substring(25), 50, 1110 * 0.62)
          cxt.drawImage(qr, 750 - 130, 1110 - 150, 100, 100)
          cxt.fillStyle = '#000000'
          cxt.font = '20px impact'
          cxt.fillText('扫我一下啊', 750 - 130, 1110 - 25)
          cxt.fillStyle = '#666666'
          cxt.font = 'normal normal normal 28px Arial'
          cxt.fillText(that.current_date[0] + '/' + that.current_date[1] + '/' + that.current_date[2], 70, 1110 - 75)
          cxt.font = 'normal normal normal 24px Arial'
          cxt.fillText('by: ' + that.personData.nickname, 70, 1110 - 25)
        }
        setTimeout(function () {
          t.myStorage.setLocal('img2', document.getElementById('myCanvas').toDataURL())
          that.$router.push('/poster/mian/' + that.tid + '/userid/' + t.myStorage.getLocal('openid'))
        }, 800)
      }
    }
  }
</script>
<style scoped>
.temp_img {
  width: 100%;
}
  .current_btn1 {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 70px;
    height: 70px;
    background-color: rgba(255, 255, 255, .6);
    border-radius: 50%;
    z-index: 99;
  }
  .current_btn_box {
    position: relative;
    top: 5px;
    left: 5px;
    width: 60px;
    height: 60px;
    background-color: #6ccac4;
    border-radius: 50%;
    text-align: center;
  }
  .btn_text {
    position: relative;
    top: 10px;
    font-size: 12px;
    color: #ffffff;
  }
  .current_btn2 {
    position: absolute;
    top: 90px;
    right: 10px;
    width: 70px;
    height: 70px;
    background-color: rgba(255, 255, 255, .6);
    border-radius: 50%;
    z-index: 99;
  }
  .btn_icon {
    position: relative;
    font-size: 18px;
    color: #ffffff;
    top: 8px;
  }
  .text1 {
    position: absolute;
    top: 305px;
    left: 30px;
    width: 280px;
    font-size: 14px;
    color: #333333;
  }
  .qr_box {
    position: absolute;
    top: 74%;
    right: 10px;
    width: 90px;
    height: 100px;
    background-color: #ffffff;
  }
  .qr_text {
    text-align: center;
    font-size: 10px;
  }
  .poster2img_btn {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background-color: #ffffff;
  }
  .bytext {
    position: absolute;
    bottom: 80px;
    left: calc(50% - 50px);
    color: #333333;
    font-size: 50px;
  }
  .date_text1 {
    position: absolute;
    top: 70%;
    left: calc(50% - 35px);
    color: #333333;
    font-size: 70px;
  }
  .date_text2 {
    position: absolute;
    bottom: 80px;
    left: 35px;
    color: #333333;
    font-size: 12px;
  }
  .date_text3 {
    position: absolute;
    bottom: 60px;
    left: 35px;
    color: #333333;
    font-size: 12px;
    font-weight: 200;
  }
</style>
