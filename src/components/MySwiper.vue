<template>
    <div>
      <swiper :list="demo03_list" auto style="" height="120px" dots-class="custom-bottom" dots-position="center" :show-desc-mask="false"></swiper>
    </div>
  <!--<img src="./../../static/banner1.png" alt="">-->
</template>
<script type='text/ecmascript-6'>
  import { Swiper } from 'vux'

  const imgList = [
    {
      url: '#',
      img: 'http://dmyzs.test.juefei88.com/h5/static/banner4.jpg',
      text: ''
    },
    {
      url: '#',
      img: 'http://dmyzs.test.juefei88.com/h5/static/banner4.jpg',
      text: ''
    },
    {
      url: '#',
      img: 'http://dmyzs.test.juefei88.com/h5/static/banner4.jpg',
      text: ''
    }
  ]
  export default {
    components: {
      Swiper
    },
    data () {
      return {
        demo03_list: imgList
      }
    },
    mounted () {
      document.title = '首页'
    },
    methods: {}
  }
</script>
<style>
  .vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
    background: #999!important;
  }

  .vux-slider > .vux-indicator > a > .vux-icon-dot, .vux-slider .vux-indicator-right > a > .vux-icon-dot {
    position: relative;
    top: 10px;
    display: inline-block;
    width: 20px!important;
    height: 4px !important;
    border-radius: 0px!important;
    background: #fafafa;
  }
</style>
