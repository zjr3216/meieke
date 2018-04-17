<template>
  <div>
    <div class="topNav">
      <div class="nav_left">
        <div class="tj_btn2" @click="toPosterTj">推荐</div>
      </div>
      <div class="nav_right" @click="toPosterClass">
        <div class="fl_btn2">分类</div>
      </div>
    </div>

    <div class="tool_box">
      <div class="tool_itembox" @click="toPoster1()">
        <div class="colorbox">
          <i class="tools_icon iconfont icon-tupian"></i>
        </div>
        <p class="tool_text">问安</p>
        <p class="tool_text2">早晚安 | 日常</p>
      </div>
      <div class="tool_itembox2" @click="toPoster2()">
        <div class="colorbox tool_color1">
          <i class="tools_icon iconfont icon-tupian"></i>
        </div>
        <p class="tool_text">营销海报</p>
        <p class="tool_text2">节日 | 日常</p>
      </div>
      <div class="tool_itembox" @click="toPoster3()">
        <div class="colorbox tool_color2">
          <i class="tools_icon iconfont icon-tupian"></i>
        </div>
        <p class="tool_text">奋斗日常</p>
      </div>
      <div class="tool_itembox2" @click="toPoster4()">
        <div class="colorbox tool_color3">
          <i class="tools_icon iconfont icon-tupian"></i>
        </div>
        <p class="tool_text">通知海报</p>
      </div>
      <div class="tool_itembox" @click="toPoster5()">
        <div class="colorbox tool_color4">
          <i class="tools_icon iconfont icon-tupian"></i>
        </div>
        <p class="tool_text">节日热点</p>
      </div>
      <div class="tool_itembox2">
        <!--<div class="colorbox tool_color5">-->
          <!--&lt;!&ndash;<i class="tools_icon iconfont icon-tupian"></i>&ndash;&gt;-->
        <!--</div>-->
        <p class="tool_text" style="margin-top: 30px;">更多内容<br/>尽情期待</p>
      </div>

    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
  import Vue from 'vue'
  import VueScroller from 'vue-scroller'
  Vue.use(VueScroller)

  export default {
    components: {},
    data () {
      return {}
    },
    mounted () {
      document.title = '海报中心'
      document.body.style.background = '#f1f4f5'
    },
    methods: {
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
      toPosterTj () {
        this.$router.push('/postercenter/tj')
      },
      toPoster1 () {
        this.$router.push('/postercenter/class/15')
      },
      toPoster2 () {
        this.$router.push('/postercenter/class/18')
      },
      toPoster3 () {
        this.$router.push('/postercenter/class/19')
      },
      toPoster4 () {
        this.$router.push('/postercenter/class/20')
      },
      toPoster5 () {
        this.$router.push('/postercenter/class/26')
      }
    }
  }
</script>
<style>
  .topNav {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #ffffff;
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
  .tj_btn2 {
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
  .fl_btn2 {
    position: relative;
    top: 10px;
    width: 40px;
    height: 20px;
    line-height: 20px;
    margin: 0px auto;
    border-radius: 3px;
    background-color: #6ccac4;
    color: #ffffff;
    font-size: 12px;
    text-align: center;
  }
  .no-data-text, .active {
    font-size: 12px;
  }
  .arrow .text {
    font-size: 12px!important;
  }
  .tool_box {
    position: relative;
    top: 50px;
    width: calc(100% - 20px);
    height: 600px;
    margin: 0px auto;
    overflow: hidden;
  }
  .tool_itembox {
    width: 140px;
    height: 140px;
    background-color: #ffffff;
    float: left;
    margin-bottom: 10px;
    overflow: hidden!important;
  }
  .tool_itembox2 {
    width: 140px;
    height: 140px;
    background-color: #ffffff;
    float: right;
    margin-bottom: 10px;
    overflow: hidden!important;

  }
  .colorbox {
    position: relative;
    top: 30px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 0px auto;
    background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
    text-align: center;
    overflow: hidden!important;
  }
  .tool_text {
    position: relative;
    top: 35px;
    text-align: center;
    font-size: 14px;
    color: #666666;
  }
  .tool_text2 {
    position: relative;
    top: 40px;
    text-align: center;
    font-size: 12px;
    color: #666666;
    font-weight: 200;
  }
  .tool_color1 {
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);  }
  .tool_color2 {
    background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);  }
  .tool_color3 {
    background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
  }
  .tool_color4 {
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  }
  .tool_color5 {
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  }
  .tools_icon {
    position: relative;
    top: 20px;
    font-size: 24px;
    color: #ffffff;
  }
  .tool_itembox:active {
    background-color: #f4f4f4;
    color: #ffffff!important;
  }

  @media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){
    /*iphone 6*/
    .tool_itembox {
      width: 170px;
      height: 170px;
      background-color: #ffffff;
      float: left;
      margin-bottom: 10px;
    }
    .tool_itembox2 {
      width: 170px;
      height: 170px;
      background-color: #ffffff;
      float: right;
      margin-bottom: 10px;
    }
  }

  @media (min-device-width : 414px) and (max-device-width : 736px) and (-webkit-min-device-pixel-ratio : 3){
    /*iphone 6 plus*/
    .tool_itembox {
      width: 190px;
      height: 190px;
      background-color: #ffffff;
      float: left;
      margin-bottom: 10px;
    }
    .tool_itembox2 {
      width: 190px;
      height: 190px;
      background-color: #ffffff;
      float: right;
      margin-bottom: 10px;
    }
  }
</style>

