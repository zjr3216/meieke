<template>
    <div>
      <div class="topNav" >
        <div class="nav_left">
          <div class="tj_btn">推荐</div>
        </div>
        <div class="nav_right" @click="toPosterClass">
          <div class="fl_btn">分类</div>

        </div>
      </div>
        <div class="poster_box" style="margin-top: 50px;">
          <div style="width: 50%;float: left; margin-bottom: 10px" v-for="item in posterdata"><div class="poster_item" @click="toPreview(item.id)">
            <img :src="item.face" class='posterimg' onerror="this.src='http://hawkeye.1c100.cn/Public/public/img/header.png'" alt="">
            <div v-show="item.vip === 0" class="free_label">免费</div>
            <div v-show="item.vip === 1" class="vip_label">VIP</div>
            <div class="temp_label1">热</div>
            <div class="temp_name">{{ item.name }}</div>
            <div class="temp_des"> 设计师：{{ item.designer }}</div>
            <div class="temp_btn">预览</div>
          </div></div>
        </div>

        <div style="width: 100%;height: 60px;line-height: 40px;"></div>

      <confirm v-model="show"
               title="提示信息"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
               @on-show="onShow"
               @on-hide="onHide">
        <p style="text-align:center;">{{ '请先完成个人信息' }}</p>
      </confirm>

      <confirm v-model="show2"
               title="提示信息"
               @on-cancel="onCancel2"
               @on-confirm="onConfirm2"
               @on-show="onShow2"
               @on-hide="onHide2">
        <p style="text-align:center;">{{ 'VIP项目，请开通' }}</p>
      </confirm>

      <div class="fhome" @click="goHome"><img src="./../../../static/fsy.png" alt=""></div>

    </div>
</template>
<script type='text/ecmascript-6'>
  import Vue from 'vue'
  import VueScroller from 'vue-scroller'
  import { Confirm } from 'vux'

  import t from './../../api/public'

  Vue.use(VueScroller)

  export default {
    components: {
      Confirm
    },
    data () {
      return {
        posterdata: '',
        n: 1,
        show: false,
        show2: false
      }
    },
    mounted () {
      document.title = '推荐'
      document.body.style.background = '#f1f4f5'
      this.$nextTick(function () {
        window.addEventListener('scroll', this.onScroll)
      })
      let that = this
      t.xhr.getPost({
        siteId: 1,
        act: 'home/poster/groom',
        data: {
          size: 10
        }
      }, function (data) {
        t.l(data, 77)
        that.posterdata = data.data
      })
    },
    methods: {
      goHome () {
        this.$router.push('/home')
      },
      infinite (done) {
        console.log('11')
        setTimeout(() => {
          this.$refs.myscroller.finishInfinite(1)
        })
        done()
      },
      refresh (done) {
        console.log('summer')
        done()
      },
      toPosterClass () {
        this.$router.push('/postercenter/class')
      },
      toPreview (tid) {
        let that = this
        t.xhr.getPost({
          siteId: 1,
          act: 'home/poster/posterinfo',
          data: {
            id: tid
          }
        }, function (data) {
          if (t.myStorage.getLocal('is_perfect') === '1') {
            if (data.data.temp[0].vip === 1) {
              if (t.myStorage.getLocal('vipstatus') === '0') {
                that.show2 = true
              } else {
                that.$router.push('/postercenter/preview/' + tid)
              }
            } else {
              that.$router.push('/postercenter/preview/' + tid)
            }
          } else {
            that.show = true
          }
        })
      },
      onScroll () {
        let that = this
        var tt = document.documentElement.scrollTop || document.body.scrollTop

        if (tt >= (990 + (this.n - 1) * 900)) {
          this.n++
          setTimeout(function () {
            t.xhr.getPost({
              siteId: 1,
              act: 'home/poster/groom',
              data: {
                size: 10,
                page: that.n
              }
            }, function (data) {
              if (data.data.length < 10) {
              }
              that.posterdata = that.posterdata.concat(data.data)
            })
          }, 200)
        }
      },
      onCancel () {
        console.log('on cancel')
      },
      onConfirm (msg) {
        console.log('on confirm')
        this.$router.push('/person')
        if (msg) {
          alert(msg)
        }
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      onCancel2 () {
        console.log('on cancel')
      },
      onConfirm2 (msg) {
        console.log('on confirm')
        this.$router.push('/membervip')
        if (msg) {
          alert(msg)
        }
      },
      onHide2 () {
        console.log('on hide')
      },
      onShow2 () {
        console.log('on show')
      }
    }
  }
</script>
<style scoped>
  .topNav {
    position: fixed;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #ffffff;
    z-index: 999;
  }
  .nav_left {
    width: 50%;
    height: 40px;
    float: left;
  }
  .nav_right {
    width: 50%;
    height: 40px;
    float: left;
  }
  .tj_btn {
    position: relative;
    top: 10px;
    width: 40px;
    height: 20px;
    line-height: 20px;
    background-color: #6ccac4;
    margin: 0px auto;
    border-radius: 3px;
    color: #ffffff;
    font-size: 12px;
    text-align: center;
  }
  .fl_btn {
    position: relative;
    top: 10px;
    width: 40px;
    height: 20px;
    line-height: 20px;
    margin: 0px auto;
    border-radius: 3px;
    color: #333333;
    font-size: 12px;
    text-align: center;
  }
  .no-data-text, .active {
    font-size: 12px;
  }
  .arrow .text {
    font-size: 12px!important;
  }


  .poster_box {
    width: calc(100%);
    margin: 0px auto;
    overflow: hidden;
    margin-top: 20px;
  }
  .poster_item {
    position: relative;
    width: 150px;
    height: 280px;
    background-color: #ffffff;
    margin: 0px auto;
  }
  .posterimg {
    width: 150px;
    height: 220px;
    border:0px;
    overflow: hidden;
  }
  .free_label {
    position: absolute; top: 10px;
    width: 50px;
    height: 20px;
    line-height: 20px;
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    color: #ffffff;
    font-size: 12px;
    border-radius: 0px 12px 12px 0px;
    text-align: center;
    overflow: hidden;
  }
  .vip_label {
    position: absolute; top: 10px;
    width: 50px;
    height: 20px;
    line-height: 20px;
    background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
    color: #ffffff;
    font-size: 12px;
    border-radius: 0px 12px 12px 0px;
    text-align: center;
    overflow: hidden;
  }
  .temp_label1 {
    position: relative;
    top: 5px;
    left: 10px;
    width: 15px;
    height: 15px;
    line-height: 15px;
    font-size: 10px;
    background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
    color: #ffffff;
    border-radius: 2px;
    float: left;
    text-align: center;

  }
  .temp_label2 {
    position: relative;
    top: 5px;
    left: 10px;
    width: 15px;
    height: 15px;
    line-height: 15px;
    font-size: 10px;
    background-image: linear-gradient(45deg, #96fbc4 0%, #f9f586 100%);
    color: #ffffff;
    border-radius: 2px;
    float: left;
    text-align: center;

  }
  .temp_name {
    position: relative;
    top: 3px;
    left: 15px;
    width: 120px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    float: left;
    color: #333333;
  }
  .temp_des {
    clear: left;
    position: relative;
    left: 10px;
    top: 5px;
    width: 120px;
    height: 20px;
    line-height: 20px;
    font-size: 10px;
    float: left;
    color: #888888;
  }
  .temp_btn {
    position: absolute;
    right: 10px;
    bottom: 13px;
    width: 40px;
    height: 25px;
    line-height: 25px;
    background-color: #6ccac4;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    border-radius: 2px;
  }

  @media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){
    /*iphone 6*/
    .poster_item {
      position: relative;
      width: 170px;
      height: 300px;
      background-color: #ffffff;
      margin: 0px auto;
    }
    .posterimg {
      width: 170px;
      height: 240px;
      border:0px;
      overflow: hidden;
    }
  }

  @media (min-device-width : 414px) and (max-device-width : 736px) and (-webkit-min-device-pixel-ratio : 3){
    /*iphone 6 plus*/
    .poster_item {
      position: relative;
      width: 190px;
      height: 300px;
      background-color: #ffffff;
      margin: 0px auto;
    }
    .posterimg {
      width: 190px;
      height: 240px;
      border:0px;
      overflow: hidden;
    }
  }

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

