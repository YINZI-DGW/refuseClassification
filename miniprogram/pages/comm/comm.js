Page({
  data: {
    commList: [],
    page: 1,
    limit: 6,
    isLoad: false
  },
  onLoad() {
    this.getcommList()
  },
  getcommList() {
    wx.cloud.callFunction({
      name: "db",
      data: {
        $url: "getCommlist",
        page: this.data.page,
        limit: this.data.limit
      }
    }).then(res => {
      let result = res.result
      if (result.code) {
        if (this.data.commList.length > 0) {
          this.data.commList.concat(result.data)
        } else {
          this.setData({
            commList: result.data
          })
        }
        if (result.data.length < this.data.limit) {
          this.setData({
            isLoad: true
          })
        }
        this.setData({
          page: this.data.page + 1
        })
      }
    })
  },
  onReachBottom() {
    if (!this.data.isLoad) {
      this.getcommList()
    }
  },
  goInfo(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/commInfo/commInfo?id='+id,
    })
  }
})