// pages/search/search.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: '',
    history: ['铅笔', '笔记本', '电池', '水杯', '体温计', '刀具', '衣服', '用过的餐巾纸', ],
    showActionsheet: false,
    groups: [{
      text: '确定',
      value: 1
    }],
    hot: ['电池', '手电筒', '笔记本电脑'],
    garbage_info: [],
    show: false,
    imgsrc:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onSearch(e) {
    this.data.history.push(e.detail)
    this.setData({
      search: e.detail,
      history: [...new Set(this.data.history)]
    })

  },
  // 点击历史搜索
  tagClick(e) {
    this.setData({
      search: e.target.dataset.tag
    })
    wx.cloud.callFunction({
      name: 'api',
      data: {
        $url: "garbageTextSearch",
        text: this.data.search,
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
      this.setData({
        imgsrc:img,
        show:true,
        garbage_info: JSON.parse(res.result).newslist
      })
    }).catch(err => {
      console.log(err);
      Toast.fail('未搜索到该垃圾，请换个试试');
    })
    //   测试
    //   wx.cloud.callFunction({
    //     name: 'api',
    //     data: {
    //       $url: "garbageImageSearch",
    //       imgBase64: res.fileID,
    //     }
    //   }).then(res=>{
    //       console.log(res,'图片识别');
    //   })
  },
  // 删除历史搜索
  del() {
    Dialog.confirm({
        message: '是否删除所有历史记录',
      })
      .then(() => {
        this.setData({
          history: []
        })
      })
      .catch(() => {
        // on cancel
      });
  },
  //确认
  close() {
    this.setData({
      show: false
    })
    console.log(this.data);
  }
})