<template>
  <div style="background: #f1f1f1;">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <TabBar></TabBar>
  </div>
</template>
<script type='text/ecmascript-6'>
  import TabBar from './../components/TabBar.vue'
  export default {
    components: {
      TabBar
    },
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    mounted () {
    },
    methods: {
    },
    watch: {
      '$route' (to, from) {
        if (to.path === '/home') {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
      }
    }
  }
</script>
<style>
  .child-view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all .8s cubic-bezier(.55,0,.1,1);
    z-index: 10!important;
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
</style>
