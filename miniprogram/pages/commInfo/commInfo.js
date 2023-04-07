let app = getApp()
Page({
  data: {
    commId: 0,
    comm: null
  },
  onLoad(option) {
    this.setData({
      commId: option.id
    })
    this.getCommInfo()
  },
  getCommInfo() {
    wx.cloud.callFunction({
      name: "db",
      data: {
        $url: "getCommInfo",
        commId: this.data.commId,
      }
    }).then(res => {
      console.log(res);
      let result = res.result
      if (result.code) {
        this.setData({
          comm: result.data
        })
      }
    })
  },
  btnFabulous() {
    if (!app.globalData.isLogin) {
      return app.$util.errorToShow("请先登录")
    }
    wx.cloud.callFunction({
      name: "db",
      data: {
        $url: "addLike",
        commId: this.data.commId
      }
    }).then(res => {
      let result = res.result
      if (result.code == 1) {
        app.$util.successToShow("点赞成功")
        let comm = this.data.comm
        comm.likeNum = comm.likeNum + 1
        comm.isLike = true
        this.setData({
          comm: comm
        })
      } else if (result.code == 2) {
        app.$util.successToShow("取消点赞成功")
        let comm = this.data.comm
        comm.likeNum = comm.likeNum - 1
        comm.isLike = false
        this.setData({
          comm: comm
        })
      }
    })
  }
})