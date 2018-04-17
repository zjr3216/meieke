<template>
  <div>
    <tabbar style="position: fixed;bottom: 0px!important;border:none!important;">
      <tabbar-item @on-item-click="toHome()">
        <img slot="icon" v-show="!home"  src="../../static/sy.png" >
        <img slot="icon" v-show="home" src="../../static/sy1.png" >
        <span slot="label">首页</span>
      </tabbar-item>
      <!--<tabbar-item @on-item-click="toMarketing()">-->
        <!--<img slot="icon" v-show="!marketing" src="./../../static/yx.png" >-->
        <!--<img slot="icon" v-show="marketing" src="./../../static/yx1.png" >-->
        <!--<span slot="label">营销助手</span>-->
      <!--</tabbar-item>-->
      <!--<tabbar-item @on-item-click="toImage()">-->
      <!--<img slot="icon" src="./../../static/icon2.png" >-->
      <!--<span slot="label">分类</span>-->
      <!--</tabbar-item>-->
      <tabbar-item  @on-item-click="toPersonInfo()">
        <img slot="icon" v-show="!personal" src="./../../static/grzx.png">
        <img slot="icon" v-show="personal" src="./../../static/grzx1.png">
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
    <toast v-model="show" :time="1000" type="cancel">{{ '功能正在开发中...' }}</toast>
  </div>
</template>
<script type='text/ecmascript-6'>
  import {Tabbar, TabbarItem, Toast} from 'vux'
  //  import T from './../api/public'

  export default {
    components: {
      Tabbar,
      TabbarItem,
      Toast
    },
    data () {
      return {
        home: true,
        marketing: false,
        personal: false,
        show: false
      }
    },
    mounted () {
      document.body.style.background = '#ffffff'
      document.title = '个人中心'
    },
    methods: {
      toHome () {
        console.log('++')
        this.home = true
        this.marketing = false
        this.personal = false
        this.$router.push('/home')
      },
      toMarketing () {
        this.marketing = true
        this.personal = false
        this.home = false
        this.show = true
      },
      toPersonInfo () {
        this.personal = true
        this.marketing = false
        this.home = false
        document.location.href = 'http://dmyzs.test.juefei88.com/h5/#/person'
      }
    }
  }
</script>
<style scoped>
  .weui-tabbar__icon {
    width: 24px!important;
    height: 24px!important;
    position: relative;
    top: 5px;
  }
  .weui-tabbar__label {
    color: #666!important;
    font-size: 12px!important;
    font-weight: 200;
    position: relative;
    top: 8px;
  }
  .weui-tabbar {
    background: #ffffff!important;
    height: 60px;
    border: 0px!important;
    box-shadow: 10px 10px 5px #888888!important;
  }

  .weui-tabbar:before {
    border-top: 0px!important;
    box-shadow: 0px -2px 2px #f1f4f5!important;

  }
</style>
