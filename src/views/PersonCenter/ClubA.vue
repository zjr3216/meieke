<template>
  <div>
    <div class="line_box_t">
      <div class="line_lab"> 项目名称： </div>
      <div class="line_input"><input type="text" placeholder="请填项目名称" v-model="name"> </div>
    </div>

    <div class="line_box_t" style="margin-top: 10px;">
      <div class="line_lab"> 项目图片： </div>
      <file-base64 id="pro" style="display:block;position:relative; top: 10px; left: 120px; width: 120px;height: 40px;opacity:1;z-index: 9999;"
                   v-bind:multiple="false"
                   v-bind:done="getProImg">
      </file-base64>
    </div>


    <div class="line_box_c2" style="margin-top: 10px;">
      <div class="line_lab" style="position: relative;top: 10px;"> 项目介绍： </div>
      <div style="clear: left; position: relative; top:20px; left: 10px;"><textarea rows="5" cols="40" v-model="des"> </textarea></div>
    </div>

    <div style="margin-top: 10px;margin-bottom: 30px;">
      <div class="push_btn" @click="pushXm()">添加</div>
      <div class="add_btn" @click="submitXm()">提交</div>
    </div>

    <div style="margin-top: 80px;"></div>
    <div class="xmlist" v-for="(item, index) in xmList">
      <div style="position:absolute; top:10px; left: 10px; width: 150px; height: 100px;background-color: #f1f1f1; overflow: hidden;">
        <img style="width: 100%; height: 100%;" :src="item.split('*%')[2]" alt="">
      </div>

      <p style="position: absolute; left: 180px; color: #333333">{{ item.split('*%')[0] }}</p>
      <p style="     position: absolute; left: 180px; top: 30px; color: #888888;font-size: 12px;">{{ item.split('*%')[1].substring(0, 25) + '...' }}</p>
      <!--<x-switch :value="true" :title="title" style="position: absolute; left: 180px; top: 70px;overflow: hidden;border: 0px;"></x-switch>-->
      <div style="position: absolute; bottom: 10px;right: 10px; background-color: #f74c31;width: 10px;height: 10px;border-radius: 5px;" @click="removeXm(index)">
        <!--<i class="gb iconfont icon-guanbi" ></i>-->
      </div>

    </div>

  </div>
</template>
<script type='text/ecmascript-6'>
  import t from './../../api/public'
  import fileBase64 from 'vue-file-base64'
  import { XSwitch } from 'vux'

  export default {
    components: {
      fileBase64,
      XSwitch
    },
    data () {
      return {
        xmList: [],
        name: '',
        des: '',
        img: '',
        title: ''
      }
    },
    mounted () {
      let that = this
      document.title = '添加服务信息'
      t.xhr.getPost({
        siteId: 1,
        act: '/personal/homepage',
        data: {
          openid: t.myStorage.getLocal('openid')
        }
      }, function (data) {
        that.xmList = data.data.club[0].act.split(',')
      })
    },
    methods: {
      pushXm () {
        let xmitem = ''
        xmitem = this.name + '*%' + this.des + '*%' + this.img
        t.l(xmitem, 99)
        this.xmList.push(xmitem)
        this.name = ''
        this.des = ''
        this.img = ''
        document.getElementById('pro').value = ''
      },
      getProImg (files) {
        let that = this
        t.xhr.getPost({
          siteId: 1,
          act: 'personal/actimg',
          data: {
            openid: t.myStorage.getLocal('openid'),
            image: files.base64
          }
        }, function (data) {
          that.img = data.data
        })
      },
      removeXm (id) {
        this.xmList = this.deleteArrById(this.xmList, id)
      },
      deleteArrById (arr, index) {
        let a = arr.slice(0, index)
        let b = arr.slice(index + 1)
        return a.concat(b)
      },
      submitXm () {
        let that = this
        t.xhr.getPost({
          siteId: 1,
          act: 'personal/clubact',
          data: {
            token: t.myStorage.getLocal('token'),
            act: this.xmList.toString()
          }
        }, function (data) {
          t.l(data, 111)
          if (data.code === '200') {
            that.$router.push('/person/wsinfo')
          }
        })
      }
    }
  }
</script>
<style>
  .line_box_t {
    position: relative;
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #ffffff;
    border-bottom: 1px solid #e4e5e5;
    overflow: hidden;
  }
  .line_lab {
    position: relative;
    width: 100px;
    float: left;
    font-size: 14px;
    color: #333333;
    margin-left: 10px;
  }
  .line_text {
    font-size: 14px;
    color: #666666;
  }
  .line_box_c2 {
    position: relative;
    width: 100%;
    height: 120px;
    background-color: #ffffff;
    border-bottom: 1px solid #e4e5e5;
    overflow: hidden;
  }
  .input:focus{outline:none;}
  textarea:focus{outline:none;}
  .push_btn {
    position: relative;
    left: 20px;
    width: 120px;
    height: 45px;
    line-height: 45px;
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    border-radius: 5px;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
    float: left;
  }
  .add_btn {
    position: relative;
    right: 20px;
    width: 120px;
    height: 45px;
    line-height: 45px;
    background-image: linear-gradient(52deg,#a6c0fe 9%,#8ec5fc 93%);
    border-radius: 5px;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
    float: right;
  }
  .xmlist {
    position: relative;
    width: 90%;
    height: 120px;
    line-height: 45px;
    margin: 0px auto;
    border-radius: 5px;
    color: #ffffff;
    margin-bottom: 10px;
    background-color: #ffffff;
  }
  .gb {
    position: absolute;
    top: -10px;
    left: 13px;
  }
</style>
