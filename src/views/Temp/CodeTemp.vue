<template>
    <div>
    </div>
</template>
<script type='text/ecmascript-6'>
  import t from './../../api/public'
  export default {
    components: {},
    data () {
      return {
      }
    },
    mounted () {
      document.title = '首页'
      t.myStorage.setLocal('address', document.location.href.split('?')[1].split('=')[1].split('&')[0])
      t.xhr.getPost({
        siteId: 1,
        act: 'getUser',
        data: {
          code: document.location.href.split('?')[1].split('=')[1].split('&')[0]
        }
      }, function (data) {
        if (data.code === '200') {
          t.myStorage.setLocal('token', data.token)
          document.location.href = 'http://test.juefei88.com/h5/#/home'
        }
      })
    },
    methods: {}
  }
</script>
<style>

</style>
