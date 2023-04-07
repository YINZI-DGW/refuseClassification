Page({
  data: {
    list: []
  },
  onLoad() {
    this.getHistoryList()
  },
  getHistoryList() {
    wx.cloud.callFunction({
      name: "db",
      data: {
        $url: 'getHistoryList'
      }
    }).then(res => {
      let result = res.result
      this.setData({
        list: result.data
      })
    })
  }
})