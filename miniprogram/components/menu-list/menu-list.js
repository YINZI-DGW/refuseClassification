let app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    elements: [{
        title: '搜索垃圾',
        name: 'search',
        color: 'green',
        icon: 'search',
        login: true
      },
      {
        title: '拍照识别',
        name: 'photo',
        color: 'olive',
        icon: 'album',
        login: true
      },
      {
        title: '智能问询',
        name: 'voicefill',
        color: 'grey',
        icon: 'voicefill',
        login: true
      },
      {
        title: '站点定位',
        name: 'gps',
        color: 'cyan',
        icon: 'locationfill',
        login: true
      },
      {
        title: '图谱下载',
        name: 'download',
        color: 'orange',
        icon: 'pulldown'
      },
      {
        title: '站点扫码',
        name: 'scanCode',
        color: 'red',
        icon: 'qrcode',
        login: true
      }
    ]
  },
  methods: {
    goMenu(e) {
      let {
        login
      } = e.currentTarget.dataset.item
      if (login) {
        if (!app.globalData.isLogin) {
          app.$util.errorToShow("请先登录", () => {
            app.$util.switchTabTo("/pages/user/user")
          })
          return
        }
      }
      let url = e.currentTarget.dataset.url
      wx.navigateTo({
        url: url
      })
    }
  }
})