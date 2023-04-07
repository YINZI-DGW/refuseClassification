// pages/voice/voice.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');
//获取全局唯一的语音识别管理器recordRecoManager
const manager = plugin.getRecordRecognitionManager();
// 设置采集声音参数
const options = {
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'aac'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '', //输出内容
    recordState: false, //录音状态
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initRecord();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  touchStart: function(e) {
    wx.vibrateShort() //按键震动效果（15ms）
    manager.start(options)
    this.setData({
      recordState: true, //录音状态为真
      tips: '松开结束',
    })

  },
  //语音  --松开结束
  touchEnd: function(e) {
    // 语音结束识别
    manager.stop();
    this.setData({
      recordState: false,
    })

  },
  //识别语音 -- 初始化
  initRecord: function() {
    const that = this;
    // 有新的识别内容返回，则会调用此事件
    manager.onRecognize = function(res) {
      console.log(res)
    }
    // 正常开始录音识别时会调用此事件
    manager.onStart = function(res) {
      console.log("成功开始录音识别", res)
    }
    // 识别错误事件
    manager.onError = function(res) {
      console.error("error msg:", res.retcode, res.msg)
    }
    //识别结束事件
    manager.onStop = function(res) {
      console.log('..............结束录音')
      console.log('录音总时长 -->' + res.duration + 'ms');
      console.log('语音内容 --> ' + res.result);
      if (res.result == '') {
        wx.showModal({
          title: '提示',
          content: '听不清楚，请重新说一遍！',
          showCancel: false,
          success: function(res) {}
        })
        return;
      }
      that.setData({
        content: that.data.content + (res.result).replace('。', '') //去掉自动添加的句号
      })
      wx.showModal({
        title: '成功开始录音识别',
        content: '识别结果为'+that.data.content,
        showCancel: false,
        success: function(res) {
          wx.cloud.callFunction({
            name: 'api',
            data: {
              $url: "garbageTextSearch",
              text: that.data.content,
            }
          }).then(res => {
            switch (JSON.parse(res.result).newslist[0].type) {
              case 0:
                var img='cloud://dd-aqou2.6464-dd-aqou2-1301484952/garbage/search/可回收物.png'
                break
              case 1:
                var img='cloud://dd-aqou2.6464-dd-aqou2-1301484952/garbage/search/其他垃圾.png'
                break
              case 2:
                var img='cloud://dd-aqou2.6464-dd-aqou2-1301484952/garbage/search/湿垃圾.png'
                break
              case 3:
                var img='cloud://dd-aqou2.6464-dd-aqou2-1301484952/garbage/search/干垃圾.png'
                break
            }
            that.setData({
              imgsrc:img,
              show:true,
              garbage_info: JSON.parse(res.result).newslist,
              content:''
            })
          }).catch(err => {
            console.log(err);
            Toast.fail('未搜索到该垃圾，请换个试试');
          })
        }
      })
    }
  },
    //确认
    close() {
      this.setData({
        show: false
      })
      console.log(this.data);
    }
})