let app = getApp()

Page({
  data: {
    list: [],
    nowIndex: 0,
    isNext: true,
    size: 1,
    answerList: [],
    showStopDialog:false,
    countDownCom: null
  },
  onShow() {
    if (app.globalData.isLogin) {
      this.setData({
        list: [],
        nowIndex: 0,
        isNext: true,
        size: 1,
        answerList: []
      })
      this.getAnswerList()
    } else {
      app.$util.errorToShow("请先登录")
    }
  },
  onReady() {
    this.setData({
      countDownCom: this.selectComponent('#countDownId')
    })
  },
  mNext: app.$util.throttle(function () {
    if (this.data.nowIndex + 1 < this.data.size) {
      this.data.answerList.push(this.data.list[this.data.nowIndex + 1])
      console.log(this.data.answerList)
      this.setData({
        answerList: this.data.answerList,
        isNext: true,
        nowIndex: this.data.nowIndex + 1
      })
    } else {
      // app.$util.errorToShow("没有更多的题了")
      wx.showModal({
        title: '提示',
        content: '没有更多的题了，是否提交测试？',
        success: (res) => {
          if (res.confirm) {
            let intervalTime = this.data.countDownCom.getIntervalTime()
            this.goResultPage(intervalTime)
          }
        }
      })
    }
  }, 600),
  mBack: app.$util.throttle(function () {
    if (this.data.nowIndex > 0) {
      this.setData({
        isNext: false
      })
      setTimeout(() => {
        this.data.answerList.splice(-1, 1)
        this.setData({
          answerList: this.data.answerList
        })
      }, 600)
      this.setData({
        nowIndex: this.data.nowIndex - 1
      })
    } else {
      app.$util.errorToShow("到底了")
    }
  }, 600),
  getAnswerList() {
    wx.cloud.callFunction({
      name: "db",
      data: {
        $url: 'answerList'
      }
    }).then(res => {
      let result = res.result
      if (result.code) {
        result.data.forEach(item => {
          item.check = ''
        })
        this.setData({
          list: result.data,
          answerList: [result.data[0]],
          size: result.data.length
        })
      }
    })
  },
  changeHander(e) {
    let val = e.detail.value
    this.data.list[this.data.nowIndex].check = val
    this.setData({
      list: this.data.list
    },()=>{
      this.mNext()
    })
  },
  stopTimeHandle(e) {
    let intervalTime = this.data.countDownCom.getIntervalTime()
    wx.showModal({
      title: '提示',
      content: '答题时间结束，请停止作答，提交答题！',
      showCancel: false,
      success: (res) => {
        if (res.confirm) {
          this.goResultPage(intervalTime)
        }
      }
    })
  },
  goResultPage(intervalTime) {
    console.log(app.$util);
    app.$util.redirectTo(`/pages/result/result?list=${JSON.stringify(this.data.list)}&intervalTime=${intervalTime}`)
  },
  onUnload(){
    this.data.countDownCom.clearTimter()
  }
})