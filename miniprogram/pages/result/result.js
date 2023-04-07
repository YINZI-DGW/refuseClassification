Page({
  data: {
    list: [],
    fraction: 0,
    intervalTime:"00:00"
  },
  onLoad(option) {
    let list = JSON.parse(option.list)
    let intervalTime = option.intervalTime
    this.setData({
      list: list,
      wrong: [],
      intervalTime:intervalTime
    })
    this.getFraction()
    this.addWrong()
  },
  getFraction() {
    let list = this.data.list
    let count = 0
    let wrong = []
    list.forEach(item => {
      if (item.type == item.check) {
        count++
      } else {
        wrong.push(item)
      }
    })
    this.setData({
      fraction: count * 10,
      wrong: wrong
    })
  },
  addWrong() {
    wx.cloud.callFunction({
      name: 'db',
      data: {
        $url: 'wrong',
        intervalTime:this.data.intervalTime,
        wrongList: this.data.wrong,
        integral: this.data.fraction
      }
    }).then(res => {
      console.log(res)
    })
  }
})