<template>
    <div>
      <div style="width: 100px;height: 30px;background-color: #333333" @click="demo()"></div>
      <canvas id="myCanvas" style="border: 1px solid #000000" ></canvas>

    </div>
</template>
<script type='text/ecmascript-6'>
  import t from './../../api/public'

  export default {
    components: {},
    data () {
      return {}
    },
    mounted () {
      var mcanvas = document.getElementById('myCanvas')
      var cxt = mcanvas.getContext('2d')
      mcanvas.width = 200
      mcanvas.height = 200
      let img = new Image()
      img.setAttribute('crossOrigin', 'Anonymous')
      img.src = 'http://dmy.juefei88.com/logo.png'
      img.onload = function () {
        cxt.drawImage(img, 0, 0, 200, 200)
        cxt.drawImage(img, 0, 0, 50, 50)
      }
      t.l(cxt)
    },
    methods: {
      demo () {
        console.log(document.getElementById('myCanvas').toDataURL())
      }
    }
  }
</script>
<style>

</style>
