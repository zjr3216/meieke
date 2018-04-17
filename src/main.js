// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'
import uploader from 'vue-easy-uploader'
import {AlertPlugin, ToastPlugin, DatetimePlugin} from 'vux'
Vue.use(DatetimePlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(Vuex)
// require('videojs-contrib-hls/dist/videojs-contrib-hls')

Vue.config.productionTip = false

const FastClick = require('fastclick')
FastClick.attach(document.body)

router.afterEach(route => {
  document.body.scrollTop = 0
  document.body.scrollTop = 1
  document.body.scrollTop = 0
  document.body.style.background = '#f1f4f5'
})
const store = new Vuex.Store({}) // 这里你可能已经有其他 module
Vue.use(uploader, store)

store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

document.body.style.background = '#f1f4f5'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
