Page({
  data: {
    userAnswerList: []
  },
  onLoad() {
    this.getAnswerList()
  },
  getAnswerList() {
    wx.showLoading({
      title: '获取信息',
    })
    wx.cloud.callFunction({
      name: "db",
      data: {
        $url: 'getUserAnswerlist'
      }
    }).then(res => {
      wx.hideLoading()
      let result = res.result
      if (result.code) {
        this.setData({
          userAnswerList: result.data
        })
      }
    })
  }
})