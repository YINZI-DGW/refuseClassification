// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    // 背景图片设置
    background: ['cloud://dd-aqou2.6464-dd-aqou2-1301484952/garbage/home/swiper4.jpg', 'cloud://dd-aqou2.6464-dd-aqou2-1301484952/garbage/home/swiper5.jpg', 'cloud://dd-aqou2.6464-dd-aqou2-1301484952/garbage/home/swiper6.jpg'],
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
  // 跳转
  gotupu(){
    wx.navigateTo({
      url: '../download/download'
    })
  },
  gosearch(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  gophoto(){
    wx.navigateTo({
      url: '../photo/photo'
    })
  },
  govoice(){
    wx.navigateTo({
      url: '../voice/voice'
    })
  },
  gozhandian(){
    wx.navigateTo({
      url: '../gps/gps'
    })
  },
  gonew(){
    wx.navigateTo({
      url: '../comm/comm'
    })
  },
  govideo(){
    wx.navigateTo({
      url: '../video/video'
    })
  },
  // 进入答题模块
  gotest(){
     wx.navigateTo({
       url: '../answer/answer-home/answer-home',
     })
  },
  //进入二次回收
  goreclaim(event){
    wx.navigateTo({
      url: '../reclaim/reclaim?type='+event.currentTarget.dataset.type,
    })
  }
})