// pages/help/help.js
var app = getApp();
const chooseLocation = requirePlugin('chooseLocation');
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columns: ['鼓东小区', '棺尾小区', '天城小区', '江夏小区', '巨山小区'],
    show: false,
    showpop: false,
    xiaoqu: '鼓东小区',
    value: 2.5,
    loading: false,
    overflay: false,
    // 添加信息
    detail: {
      phone: '',
      address: '未知位置',
      num: 2,
      price: 1.2,
      state: false,
      xiaoqu: '鼓东小区',
      nickName: '',
      avatarUrl: '',
      date: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.isLogin == false) {
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
    } else {
      wx.cloud.callFunction({
        name: 'db',
        data: {
          $url: "allhelpgarbage",
          xiaoqu: this.data.xiaoqu
        }
      }).then(res => {
        let arr = res.result.data.map(function (item, index) {
          return item.xiaoqu
        })
        this.setData({
          columns: Array.from(new Set([...arr])),
          xiaoqu: Array.from(new Set([...arr]))[0],
          loading: true,
          helpList: res.result.data
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.cloud.callFunction({
      name: 'db',
      data: {
        $url: "allhelpgarbage",
      }
    }).then(res => {
      let arr = res.result.data.map(function (item, index) {
        return item.xiaoqu
      })
      this.setData({
        columns: Array.from(new Set([...arr])),
        xiaoqu: Array.from(new Set([...arr]))[0],
        loading: true,
        helpList: res.result.data
      })
    })
    wx.cloud.callFunction({
      name: 'db',
      data: {
        $url: "helpgarbage",
        xiaoqu: this.data.xiaoqu
      }
    }).then(res => {
      this.setData({
        helpList: res.result.data
      })
    })
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    if (location) {
      this.setData({
        'detail.xiaoqu': location.name,
        'detail.address': location.address
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // onChange(event) {
  //   const {
  //     picker,
  //     value,
  //     index
  //   } = event.detail;
  //   Toast(`当前值：${value}, 当前索引：${index}`);
  // },
  onConfirm(event) {
    this.setData({
      loading: false
    })
    const {
      picker,
      value,
      index
    } = event.detail;
    let timeTem = setTimeout(() => {
      this.setData({
        loading: true
      })
    }, 1000);
    Toast(`当前小区：${value}`);
    let a = value
    this.setData({
      showpop: false,
      xiaoqu: a
    });
    wx.cloud.callFunction({
      name: 'db',
      data: {
        $url: "helpgarbage",
        xiaoqu: this.data.xiaoqu
      }
    }).then(res => {
      this.setData({
        loading: true,
        helpList: res.result.data
      })
    })
  },

  onCancel() {
    Toast('未选择小区');
    this.setData({
      showpop: false
    });
  },
  showPopup() {
    this.setData({
      showpop: true
    });
  },
  add() {
    this.setData({
      show: true
    })
  },
  submit() {
    // 添加订单
    if (!(this.data.detail.phone)) {
      Toast('请输入手机号')
    } else {
      if (!(/^1[3456789]\d{9}$/.test(this.datadetail.phone))) {
        Toast('错误的手机号')
      } else {
        var myDate = new Date();
        this.setData({
          'detail.nickName': app.globalData.nickName,
          'detail.avatarUrl': app.globalData.avatarUrl,
          'detail.date': this.formatDate(myDate)
        })
        wx.cloud.callFunction({
          name: 'db',
          data: {
            $url: "addhelpgarbage",
            detail: this.data.detail
          }
        })
        // 结束弹框
        this.setData({
          loading: false,
          show: false
        })
        wx.cloud.callFunction({
          name: 'db',
          data: {
            $url: "allhelpgarbage",
            xiaoqu: this.data.xiaoqu
          }
        }).then(res => {
          let arr = res.result.data.map(function (item, index) {
            return item.xiaoqu
          })
          this.setData({
            columns: Array.from(new Set([...arr])),
            xiaoqu: Array.from(new Set([...arr]))[0],
            loading: true,
            helpList: res.result.data
          })
        })
      }

    }
  },
  // 是否分类
  changestate({
    detail
  }) {
    this.setData({
      'detail.state': detail
    })
    console.log(this.data.detail);
  },
  // 定位
  gomap() {
    const key = 'XT6BZ-HPXRP-VNQDL-LTKFK-PWNTZ-63BLQ'; //使用在腾讯位置服务申请的key
    const referer = '2022垃圾分类宝'; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: 39.89631551,
      longitude: 116.323459711
    });
    const category = '小区';
    wx.navigateTo({
      url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`
    });
  },
  // 格式化当前日期
  formatDate(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
  }
})