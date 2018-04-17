<template>
    <div>
      <div class="articleHeader">美业文章专栏</div>

      <scroller lock-y :scrollbar-x=false style="position: fixed; z-index: 999">
        <div class="top_nav">
          <div class="nav_item" >
            <div class="item_btn item_btn_active" :id="firstClassData.id" @click="toArtPage(firstClassData.id)"> {{ firstClassData.name }}</div>
          </div>
          <div class="nav_item" v-for="(item, index) in classdata"  >
            <div class="item_btn " :id="item.id" @click="toArtPage(item.id)"> {{ item.name }}</div>
          </div>
        </div>
      </scroller>

      <div style="width: 100%;height: 10px;margin-top: 45px;"></div>
      <div class="articleItem" v-for="item in articleData" @click="toArticlePage(item.id)">
        <img class="articleImg" :src="item.preview" alt="">
        <p class="articleTitle">{{ item.name }}</p>
        <div class="articleZz">文案：{{ 'summercode' }} </div>
        <div class="articleNum">阅读量：{{ item.good }} </div>
        <!--<div class="articleDate">发布时间：{{ new Date(parseInt(item.update_at) * 1000).toLocaleString() }} </div>-->
        <div class="articleDate">发布时间：{{ new Date(parseInt(item.update_at) * 1000).toLocaleString().split(' ')[0] }} </div>
        <div class="triangle-bottomright" v-show="item.is_vip === 0 ? true : false"><span style="position:absolute; top:20px; right:5px; color: #fff; font-size: 10px;">免</span></div>
        <div class="triangle-bottomright2" v-show="item.is_vip === 1 ? true : false"><span style="position:absolute; top:20px; right:0px; color: #fff; font-size: 12px;">VIP</span></div>
      </div>
      <p style="width: 100%;height: 50px;line-height: 50px;text-align: center;">没有更多的数据...</p>
      <div style="width: 100%;height: 200px;"></div>

      <div class="fhome" @click="goHome"><img src="./../../../static/fsy.png" alt=""></div>
    </div>
</template>
<script type='text/ecmascript-6'>
  import { Scroller } from 'vux'
  import t from './../../api/public'
  import $ from 'jquery'

  export default {
    components: {
      Scroller
    },
    data () {
      return {
        articleData: [],
        n: 1,
        firstClass: 0,
        classdata: null,
        firstClassData: '',
        current_id: 43
      }
    },
    mounted () {
      document.title = '美业文章'
      let that = this
      this.$nextTick(function () {
        window.addEventListener('scroll', this.onScroll)
      })
      t.xhr.getPost({
        siteId: 1,
        act: 'home/article',
        data: {
          cid: 43,
          size: 5,
          page: 1
        }
      }, function (data) {
        t.l(data, 122)
        that.articleData = data.data
      })
      t.xhr.getPost({
        siteId: 1,
        act: 'home/poster/getCategory',
        data: {
          id: 42
        }
      }, function (data) {
        t.l(data, 77)
        that.firstClass = data.data[0].cid
        that.firstClassData = data.data[0]
        t.l(that.firstClass, 88)
        that.classdata = data.data
        that.classdata = that.classdata.slice(1)
      })
    },
    methods: {
      toArticlePage (id) {
        document.location.href = 'http://dmyzs.test.juefei88.com/h5/art/#' + '/article/' + id + '/userid/' + t.myStorage.getLocal('openid')
      },
      toArtPage (event) {
        let that = this
        this.current_id = event
        $('.item_btn').each(function () {
          $(this).removeClass('item_btn_active')
        })
        $('#' + event).addClass('item_btn_active')

        t.xhr.getPost({
          siteId: 1,
          act: 'home/article',
          data: {
            cid: event
          }
        }, function (data) {
          t.l(data, 122)
          that.articleData = data.data
        })

//        t.xhr.getPost({
//          siteId: 1,
//          act: 'home/poster/posterlist',
//          data: {
//            id: event
//          }
//        }, function (data) {
//          t.l(data)
//          that.posterdata = data.data.all
//        })
//        if (event === 'tj') {
//          t.xhr.getPost({
//            siteId: 1,
//            act: 'home/poster/groom',
//            data: {
//              id: 17
//            }
//          }, function (data) {
//            t.l(data, 33)
//            that.posterdata = data.data.all
//          })
//        }
      },
      onScroll () {
        let that = this
        var tt = document.documentElement.scrollTop || document.body.scrollTop
        t.l(tt, 234)
        if (tt >= (300 + (this.n - 1) * 300)) {
          this.n++
          setTimeout(function () {
            t.xhr.getPost({
              siteId: 1,
              act: 'home/article',
              data: {
                cid: this.current_id,
                size: 5,
                page: that.n
              }
            }, function (data) {
              if (data.data.length < 10) {
              }
              that.articleData = that.articleData.concat(data.data)
            })
          }, 200)
        }
      },
      goHome () {
        this.$router.push('/home')
      }
    }
  }
</script>
<style scoped>
  .articleHeader {
    position: fixed;
    top: 0px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background-color: #ffffff;
    z-index: 999;
  }
  .articleItem {
    position: relative;
    width: 100%;
    height: 140px;
    background-color: #ffffff;
    margin-bottom: 10px;
  }
  .articleImg {
    position: relative;
    left: 10px;
    top: 20px;
    width: 100px;
    height: 100px;
  }
  .articleTitle {
    position: absolute;
    top: 20px;
    left: 120px;
    width: 200px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #444444;
  }
  .articleZz {
    position: absolute;
    left: 120px;
    top: 70px;
    width: 50%;
    height: 40px;
    float: left;
    color: #888888;
    font-size: 12px;
  }
  .articleNum {
    position: absolute;
    left: 120px;
    top: 88px;
    width: 33%;
    height: 40px;
    float: left;
    color: #888888;
    font-size: 12px;
  }
  .articleDate {
    position: absolute;
    left: 120px;
    top: 105px;
    width: 50%;
    height: 40px;
    float: left;
    color: #888888;
    font-size: 12px;
  }
  .top_nav {
    position: relative;
    width: 1000px;
    height: 40px;
    background-color: #ffffff;
  }
  .nav_item {
    width: 80px;
    height: 40px;
    text-align: center;
    float: left;
  }
  .item_btn {
    position: relative;
    top: 10px;
    width: 40px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    margin: 0px auto;
    border-radius: 3px;
  }
  .item_btn_active {
    background-color: #6ccac4;
    color: #ffffff;
  }
  .poster_box {
    width: calc(100%);
    margin: 0px auto;
    overflow: hidden;
    margin-top: 20px;
  }

  .triangle-bottomright {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 0px;
    height: 0px;
    border-bottom: 40px solid #c2e9fb;
    border-left: 40px solid transparent;
  }
  .triangle-bottomright2 {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 0px;
    height: 0px;
    border-bottom: 40px solid #f74c31;
    border-left: 40px solid transparent;
  }

  @media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){
    /*iphone 6*/
    .articleTitle {
      position: absolute;
      top: 20px;
      left: 120px;
      width: 240px;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #444444;
    }
  }

  @media (min-device-width : 414px) and (max-device-width : 736px) and (-webkit-min-device-pixel-ratio : 3){
    /*iphone 6 plus*/
    .articleTitle {
      position: absolute;
      top: 20px;
      left: 120px;
      width: 280px;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #444444;
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
