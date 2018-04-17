<template>
    <div>
      <div class="active_Header">平台活动</div>
      <div style="width: 100%;height: 10px;margin-top: 45px;"></div>

      <div class="active_item" v-for="item in activeData" @click="toActivePage(item.url)">
        <img :src="item.image" class="activeImg" alt="">
        <p class="activeName">{{ item.name }}</p>
        <p class="activeDis">{{ item.description.substring(0, 24) + '...' }}</p>
      </div>

      <divider>更多活动<br>敬请期待</divider>
    </div>
</template>
<script type='text/ecmascript-6'>
  import t from './../../api/public'
  import { Divider } from 'vux'

  export default {
    components: {
      Divider
    },
    data () {
      return {
        activeData: ''
      }
    },
    mounted () {
      let that = this
      t.xhr.getPost({
        siteId: 1,
        act: 'home/activity',
        data: {
        }
      }, function (data) {
        t.l(data)
        that.activeData = data.data
      })
    },
    methods: {
      toActivePage (url) {
        document.location.href = url
      }
    }
  }
</script>
<style>
  .active_Header {
    position: fixed;
    top: 0px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background-color: #ffffff;
    z-index: 999;
  }
  .active_item {
    width: 90%;
    height: 230px;
    margin: 0px auto;
    background-color: #ffffff;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  .activeImg {
    position: relative;
    top: 0px;
    width: 100%;
    height: 150px;
    overflow: hidden;
  }
  .activeName {
    position: relative;
    left: 15px;
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
  .activeDis {
    position: relative;
    left: 15px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #a1a1a1;
  }
  .vux-divider {
    font-size: 12px;
    color: #999999!important;
  }
</style>
