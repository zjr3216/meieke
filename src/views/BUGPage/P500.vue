<template>
  <div>
    <img style=" position:relative; top: 100px;width: 100%; height: auto;" src="./../../../static/500.png" alt="">
    <p style="position: absolute; bottom: 180px; text-align: center;width: 100%;font-weight: 200;color: #666;">程序500错误</p>

    <div class="goHome" @click="goHome">返回首页</div>
    <div class="goback" @click="goBack">返回上一页</div>
  </div>
</template>
<script type='text/ecmascript-6'>
  export default {
    components: {},
    data () {
      return {}
    },
    mounted () {
      document.title = '程序出错了！！！'
    },
    methods: {
      goHome () {
        this.$router.push('/home')
      },
      goBack () {
        window.history.back()
      }
    }
  }
</script>
<style>
  .goHome {
    position: absolute;
    bottom: 50px;
    left: calc(50% - 75px);
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    color: #ffffff;
    font-size: 14px;
    border-radius: 3px;
    box-shadow: 0px 2px 2px #eee;

  }
  .goback
  {
    position: absolute;
    bottom: 100px;
    left: calc(50% - 75px);
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    color: #ffffff;
    font-size: 14px;
    border-radius: 3px;
    box-shadow: 0px 2px 2px #eee;
  }

</style>
