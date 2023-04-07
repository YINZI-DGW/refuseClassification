// pages/backsystemindex/backsystemindex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconList: [{
        icon: 'my',
        color: 'orange',
        badge: 0,
        name: '用户管理',
        url: "cloud://dd-aqou2.6464-dd-aqou2-1301484952/garbage/bs/用户管理.png"
      }, {
        icon: 'form',
        color: 'orange',
        badge: 1,
        name: '新闻管理',
        // url: "/pages/adminComm/commList/commList"
      },
      {
        icon: 'goods',
        color: 'orange',
        badge: 2,
        name: '兑换管理',
        // url: "/pages/adminGoods/goodsList/goodsList"
      },
      {
        icon: 'comment',
        color: 'orange',
        badge: 3,
        name: '用户反馈',
        // url: "/pages/adminFeedback/feedbackList/feedbackList"
      }, {
        icon: 'qrcode',
        color: 'orange',
        badge: 4,
        name: '二维码',
        // url: "/pages/adminCode/adminCode"
      },
      {
        icon: 'text',
        color: 'orange',
        badge: 5,
        name: '答题管理',
        // url: "/pages/adminAnswer/adminAnswer"
      }
    ]
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
  go(e) {
    switch (e.currentTarget.dataset.id) {
      case 0:
        wx.navigateTo({
          url: '../bSd/bsd',
        })
        break
      case 1:
        console.log(1);
        break
      case 2:
        console.log(1);
        break
      case 3:
        console.log(1);
        break
    }
  }
})