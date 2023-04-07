let timter = null
Component({
  properties: {
    minuteTnterval: {
      type: Number,
      value: false
    },
  },
  data: {
    startTime: 0,
    endTime: 0,
    hour: 0,
    minute: 0,
    secondsec: 0
  },
  attached: function () {
    var startTime = new Date().getTime()
    var endTime = startTime + this.data.minuteTnterval * 60000
    this.setData({
      startTime: startTime,
      endTime: endTime
    })
    this.countDown()
  },
  methods: {
    countDown() {
      var nowTime = new Date().getTime();
      let timeLeft = this.data.endTime - nowTime;
      if (timeLeft >= 0) {
        var {
          h,
          m,
          s
        } = this.formatTime(timeLeft)
        this.setData({
          hour: h,
          minute: m,
          secondsec: s
        })
        timter = setTimeout(() => {
          this.countDown()
        }, 1000);
      } else {
        this.triggerEvent('stopTime');
        this.setData({
          hour: '00',
          minute: '00',
          secondsec: '00'
        })
      }
    },
    formatTime(time) {
      var h, m, s;
      h = Math.floor(time / 1000 / 60 / 60 % 24);
      m = Math.floor(time / 1000 / 60 % 60);
      s = Math.floor(time / 1000 % 60);
      s = s < 10 ? "0" + s : s
      m = m < 10 ? "0" + m : m
      h = h < 10 ? "0" + h : h
      return {
        s,
        m,
        h
      }
    },
    getIntervalTime() {
      clearTimeout(timter)
      var nowTime = new Date().getTime();
      let timeLeft = nowTime - this.data.startTime;
      let timeStrArr = []
      var {
        h,
        m,
        s
      } = this.formatTime(timeLeft)
      if (h !== '00') {
        timeStrArr.push(h)
      }
      timeStrArr.push(m)
      timeStrArr.push(s)
      return timeStrArr.join(":")
    },
    clearTimter() {
      clearTimeout(timter)
    }
  }
})