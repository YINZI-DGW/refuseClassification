let app = getApp()
import {
  getLocation,
  mapSearch
} from '../../utils/map.js'
Page({
  data: {
    longitude: 0,
    latitude: 0,
    size: 10,
    list: [],
    onLine: true
  },
  onShow() {
    if (app.globalData.nonetwork) {
      this.setData({
        onLine: true
      })
      wx.showLoading({
        title: "获取数据中!"
      });
      this.getData();
    } else {
      this.setData({
        onLine: false
      })
      wx.showToast({
        title: '请连接网络',
        icon: 'none',
        duration: 2000
      })
    }
  },
  getData() {
    getLocation()
      .then(res => {
        const {
          longitude,
          latitude
        } = res
        this.setData({
          longitude,
          latitude
        })
        mapSearch('垃圾', {
          longitude,
          latitude
        }).then(res => {
          var data = res.data;
          this.setList(data);
        })
      })
      .catch((e) => {

      })
  },
  //组装数据信息
  setList: function (data) {
    var that = this;
    var result = [];
    //循环遍历数据， 其实不做这一步也行
    data.forEach(function (item, index) {
      //替换一些不必要的大信息
      var reg = new RegExp(item.ad_info.province + item.ad_info.city + item.ad_info.district);
      var briefAddr = item.address.replace(reg, "");
      //组装数据
      result.push({
        distance: item["_distance"],
        briefAddr: briefAddr,
        address: item.address,
        category: item.category,
        id: item.id,
        latitude: item.location.lat,
        longitude: item.location.lng,
        name: item.title
      });
    });
    wx.hideLoading()
    //设置data
    that.setData({
      list: result,
      size: result.length
    });
  },
  doRefresh() {
    this.onShow()
  },
  //点击列表显示本地导航信息
  navigate_top: function (e) {
    var that = this;
    var id = e.detail;
    var toilet = that.findMarkerById(id);
    //跳转传输的值
    var param = {
      //基本的信息
      latitude: toilet.latitude,
      longitude: toilet.longitude,
      list: that.data.list,
      briefAddr: toilet.briefAddr,
      name: toilet.name
    }
    //让用户选择是使用本地自带地图还是小程序地图导航
    wx.showActionSheet({
      itemList: ['高德/百度地图导航', '本地小程序导航'],
      success: function (res) {
        if (res.tapIndex) {
          wx.navigateTo({
            url: '../location/location?param=' + JSON.stringify(param)
          });
        } else {
          //打开本地应用进行导航
          wx.openLocation({
            latitude: param.latitude,
            longitude: param.longitude,
            name: param.name,
            address: param.briefAddr,
            scale: 28
          });
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '你可以选择一个看看效果,行不行再说',
          icon: 'none',
          duration: 2000
        })
      }
    });
  },
  findMarkerById: function (id) {
    var that = this,
      result = {};
    var list = that.data.list;
    for (var i = 0; i < list.length; i++) {
      if (id === list[i].id) {
        result = list[i];
        break;
      }
    }
    return result;
  }
})