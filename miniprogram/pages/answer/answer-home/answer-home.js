let app = getApp()
Page({
  data: {
    isLogin: false,
    userIndex: -1,
    nickName: ''
  },
  onShow() {
    if (app.globalData.isLogin) {
      this.setData({
        isLogin: true,
        avatarUrl:app.globalData.avatarUrl
      })
      this.setData({
        nickName: app.globalData.nickName
      })
      this.getRanking()
    } else {
      wx.showModal({
        title: '提示',
        content: '还未登录，请先登录！',
        showCancel: false,
        success: (res) => {
          if (res.confirm) {
            app.$util.switchTabTo("/pages/personal/personal")
          }
        }
      })
      this.setData({
        isLogin: false
      })
    }
  },
  //获取排名
  getRanking() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: "db",
      data: {
        $url: 'getUseRanking'
      }
    }).then(res => {
      let result = res.result
      if (result.code) {
        let {
          userIndex
        } = result.data
        this.setData({
          userIndex
        })
        wx.hideLoading()
      }
    })

  },

  toAnswer(e) {
    let {
      page
    } = e.currentTarget.dataset
    app.$util.navigateTo(`/pages/answer/${page}/${page}`)
  },
  goWrongList() {
    wx.navigateTo({
      url: '/pages/wrongList/wrongList',
    })
  }
})