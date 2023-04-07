Page({
  data: {
    list: []
  },
  onLoad() {
    this.getwrongList()
  },
  getwrongList() {
    wx.cloud.callFunction({
      name: "db",
      data: {
        $url: 'getwrongList'
      }
    }).then(res => {
      let result = res.result
      this.setData({
        list: result.data
      })
    })
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },

  delWrong(e) {
    let {
      wrong,
      index
    } = e.currentTarget.dataset
    let _this = this
    wx.showModal({
      title: '提示',
      content: '是否确定删除该错题？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中..',
          })
          wx.cloud.callFunction({
            name: "db",
            data: {
              $url: "delWrongUser",
              _id: wrong._id
            }
          }).then(res => {
            wx.hideLoading()
            let result = res.result
            if (result.code) {
              _this.data.list.splice(index, 1)
              _this.setData({
                list: _this.data.list
              })
            }
          })
        }
      }
    })
  }
})