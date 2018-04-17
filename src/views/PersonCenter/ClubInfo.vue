<template>
    <div>
      <div class="line_box_c" style="margin-top: 10px;">
        <div class="line_lab"> 会所名称： </div>
        <div class="line_input"><input type="text" placeholder="请填写会所名称" style="color: #666666;letter-spacing: 2px;" v-model="clubname"> </div>
      </div>

      <div class="line_box_c" >
        <div class="line_lab"> 会所地址： </div>
        <div class="line_input" style="width: 260px;"><input type="text" placeholder="请填写会所地址" style="position:relative; width:150px;color: #666666;letter-spacing: 2px;" v-model="clubAddress"> </div>
      </div>
      <div class="line_box_c" >
        <div class="line_lab"> 会所时间： </div>
        <div class="line_text"><input type="text" placeholder="11: 00 -- 22:00" style="color: #666666;letter-spacing: 2px;" v-model="time1"> </div>
      </div>

<!--       <div class="line_box_c" style="margin-top: 20px;border: 0px;">
        <div class="line_lab"> 会所头图： </div>
        <div class="line_btn">上传
          <file-base64  style="display:block;position:relative; top: -30px;width: 120px;height: 30px;margin: 0px auto;opacity: 0;"
                        v-bind:multiple="true"
                        v-bind:done="getQrcodeFiles">
          </file-base64>
        </div>
      </div>

      <div class="club_img">
        <img :src="QRfileBase64" alt="">
      </div> -->
      <div class="line_box_c2" style="margin-top: 20px;">
        <div class="line_lab" style="position: relative;top: 10px;"> 会所介绍： </div>
        <div style="clear: left; position: relative; top:20px; left: 10px;"><textarea rows="5" cols="40" style="position:relative; width:300px;color: #666666;letter-spacing: 2px;" v-model="description"> </textarea></div>
      </div>

      <div class="line_box_c" style="margin-top: 10px;border: 0px;">
        <div class="line_lab" style="width: 200px;"> 上传图片（最多6张）： </div>
        <div class="line_btn" id="demo01">上传
        </div>

        <div class="line_btn" id="demo03" style="margin-right: 10px;background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);" @click="clearClubImg">清除
        </div>
      </div>


      <div class="clubhouse_img" v-for="(item, index) in houseImgData">
        <img :src="item" @click="removeImg(index)" alt="">
      </div>

<!--       <div class="line_box_c2" style="margin-top: 20px;">
        <div class="line_lab" style="position: relative;top: 10px;"> 团队介绍： </div>
        <div style="clear: left; position: relative; top:20px; left: 10px;"><textarea rows="5" cols="40" style="position:relative; width:300px;color: #666666;letter-spacing: 2px;" v-model="groupinfo"> </textarea></div>
      </div>

      <div class="line_box_c" style="margin-top: 10px;border: 0px;">
        <div class="line_lab" style="width: 200px;"> 团队图片（最多6张）： </div>
        <div class="line_btn" id="demo02">上传
        </div>
        <div class="line_btn" id="demo04" style="margin-right: 10px;background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);" @click="clearTeamImg">清除
        </div>
      </div>

      <div class="clubhouse_img" v-for="(item, index) in teamImgData">
        <img :src="item" @click="removeImg2(index)"  alt="">
      </div> -->

      <div class="culb_btn" @click="saveClub()"> 保存信息 </div>

      <div style="width: 100%; height: 200px;"></div>
    </div>
</template>
<script type='text/ecmascript-6'>
  import t from './../../api/public'
  import fileBase64 from 'vue-file-base64'
  import wx from 'weixin-js-sdk'

  export default {
    components: {
      t,
      fileBase64
    },
    data () {
      return {
        clubname: '',
        clubAddress: '',
        time1: '',
        description: '',
        groupinfo: '',
        // QRfileBase64: '',
        houseImgData: [],
        // teamImgData: [],
        currentHouseImg: [],
        // currentTeamImg: [],
        sd: 'sumer'
      }
    },
    mounted () {
      document.title = '完善会所信息'
      let that = this
      t.xhr.getPost({
        siteId: 1,
        act: 'personal/getuserinfo',
        data: {
          token: t.myStorage.getLocal('token')
        }
      }, function (data) {
        t.l(document.location.href.split('#')[0], 77)
        that.clubname = data.data.club[0].name
        that.clubAddress = data.data.club[0].address
        that.time1 = data.data.club[0].time
        that.description = data.data.club[0].description // todo 会所介绍
        // that.QRfileBase64 = data.data.club[0].headimg
        // that.groupinfo = data.data.club[0].groupinfo
        that.houseImgData = data.data.club[0].clubimg.substring(0, data.data.club[0].clubimg.length - 2).split('||')
        // that.teamImgData = data.data.club[0].groupimg.substring(0, data.data.club[0].groupimg.length - 2).split('||')
//        t.l(that.houseImgData)
      })

      t.xhr.getPost({
        siteId: 1,
        act: 'getJssdk',
        data: {
          url: document.location.href.split('#')[0]
        }
      }, function (data) {
        wx.config({

          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。

          appId: data.data.appId, // 必填，公众号的唯一标识

          timestamp: data.data.timestamp, // 必填，生成签名的时间戳

          nonceStr: data.data.nonceStr, // 必填，生成签名的随机串

          signature: data.data.signature, // 必填，签名，见附录1

          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        // 绑定上传团队的图片按钮
        // document.getElementById('demo02').addEventListener('click', function () {
        //   wx.chooseImage({
        //     count: 6, // 默认9
        //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        //     success: function (res) {
        //       let i = 0
        //       let length = res.localIds.length
        //       function upload () {
        //         wx.uploadImage({
        //           localId: res.localIds[i],
        //           success: function (res) {
        //             i++
        //             t.xhr.getPost({
        //               siteId: 1,
        //               act: 'personal/wximg',
        //               data: {
        //                 mediaid: res.serverId,
        //                 openid: t.myStorage.getLocal('openid'),
        //                 parm: 'group'
        //               }
        //             }, function (data) {
        //               that.currentTeamImg.push(data.data)
        //               that.teamImgData.push(data.data)
        //             })
        //             if (i < length) {
        //               upload()
        //             }
        //           },
        //           fail: function (res) {
        //             alert(JSON.stringify(res))
        //           }
        //         })
        //       }
        //       upload()
        //     }
        //   })
        // })
        // 绑定上传团队的图片按钮
        document.getElementById('demo01').addEventListener('click', function () {
          wx.chooseImage({
            count: 6, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              let i = 0
              let length = res.localIds.length
              alert(length)
              function upload () {
                wx.uploadImage({
                  localId: res.localIds[i],
                  success: function (res) {
                    i++
                    t.xhr.getPost({
                      siteId: 1,
                      act: 'personal/wximg',
                      data: {
                        mediaid: res.serverId,
                        openid: t.myStorage.getLocal('openid'),
                        parm: 'club'
                      }
                    }, function (data) {
                      that.currentHouseImg.push(data.data)
                      that.houseImgData.push(data.data)
                    })
                    if (i < length) {
                      upload()
                    }
                  },
                  fail: function (res) {
                    alert(JSON.stringify(res))
                  }
                })
              }
              upload()
            }
          })
          this.teamImgData = this.currentTeamImg
        })
      })
    },
    methods: {
      getQrcodeFiles (files) {
        this.QRfileBase64 = files[0].base64
      },
      clearClubImg () {
        this.houseImgData = []
        this.currentHouseImg = []
      },
      clearTeamImg () {
        this.teamImgData = []
        this.currentTeamImg = []
      },
      removeImg (item) {
        this.houseImgData = this.deleteArrById(this.houseImgData, item)
        this.currentHouseImg = this.houseImgData
      },
      removeImg2 (item) {
        this.teamImgData = this.deleteArrById(this.teamImgData, item)
        this.currentTeamImg = this.teamImgData
      },
      deleteArrById (arr, index) {
        let a = arr.slice(0, index)
        let b = arr.slice(index + 1)
        return a.concat(b)
      },
      saveClub () {
        let that = this
        t.xhr.getPost({
          siteId: 1,
          act: 'personal/perfected',
          data: {
            token: t.myStorage.getLocal('token'),
            parm: 'club',
            club: this.clubname,
            address: this.clubAddress,
            time1: this.time1,
            head: this.QRfileBase64,
            description: this.description,
            clubimg: this.currentHouseImg !== this.houseImgData ? this.currentHouseImg : this.houseImgData,
            groupinfo: this.groupinfo,
            groupimg: this.currentTeamImg !== this.teamImgData ? this.currentTeamImg : this.teamImgData,
            way: 'base64'
          }
        }, function (data) {
          console.log(data, 22)
          if (data.code === '200') {
            that.$router.push('/person/wsinfo')
          }
        })
      }
    }
  }
</script>
<style>
.line_box_c {
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
  .line_btn {
    position: relative;
    top: 8px;
    right: 10px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
    float: right;
    text-align: center;
    background-image: linear-gradient(52deg,#a6c0fe 9%,#8ec5fc 93%);
    border-radius: 4px;
    font-size: 12px;
  }
  .club_img {
    position: relative;
    top: 10px;
    width: 80%;
    height: 150px;
    margin: 0px auto;
    background-color: #e4e4e4;
    overflow: hidden;
  }
  .club_img img {
    width: 100%;
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
  .clubhouse_img {
    position: relative;
    width: 100px;
    height: 100px;
    background-color: #e1e1e1;
    margin: 10px;
    float: left;
    overflow: hidden;
    z-index: 9;
  }
  .clubhouse_img img {
    position: relative;
    width: 100%;
  }
  .culb_btn {
    clear: left;
    position: relative;
    top: 20px;
    width: 60%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    margin: 0px auto;
    background-image: linear-gradient(52deg,#a6c0fe 9%,#8ec5fc 93%);
    color: #ffffff;
    font-size: 14px;
    border-radius: 5px;
  }
input,textarea {
  border: 0px
}
</style>
