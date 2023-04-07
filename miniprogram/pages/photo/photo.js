// pages/photo/photo.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    src: "",
    isCamera: true,
    btnTxt: "拍照",
    cWidth: 0,
    cHeight: 0,
    dialogShow: false,
    garbage: null,
    imgBase64: '',
    garbage_info:[],
    imgsrc:'',
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ctx = wx.createCameraContext()
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
//拍照方法
  takePhoto() {
    var that = this
    if (this.data.isCamera == false) {
      this.setData({
        isCamera: true,
        btnTxt: "拍照"
      })
      return
    }
    this.ctx.takePhoto({
      quality: 'high',
      success: async (res) => {
        let src = res.tempImagePath
        this.setData({
          src: res.tempImagePath,
          isCamera: false,
          btnTxt: "重拍"
        })
        wx.showLoading({
          title: '正在加载中',
        })
        //图片压缩
        this.base64(src)
      }
    })
  },
  //转化base64格式
  base64(src) {
    wx.getFileSystemManager().readFile({
      filePath: src, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        console.log('data:image/png;base64,' + res.data)
        this.setData({
          imgBase64: wx.cloud.CDN('data:image/png;base64,' + res.data)
        })
        this.searchimg()
      }
    })
    //以下两行注释的是同步方法，不过我不太喜欢用。
    //let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64') 
    //console.log(base64)      
  },
  searchimg() {
    //   调用api
    wx.cloud.callFunction({
      name: 'api',
      data: {
        $url: "garbageImageSearch",
        imgBase64: this.data.imgBase64,
      }
    }).then(
      res => {
        console.log(res, '调用结果');
        setTimeout(() => {
          wx.hideLoading();
        }, 100);
        switch (res.result.newslist[0].lajitype) {
          case 0:
            var img='cloud://dd-aqou2.6464-dd-aqou2-1301484952/garbage/search/可回收物.png'
            break
          case 1:
            var img='cloud://dd-aqou2.6464-dd-aqou2-1301484952/garbage/search/其他垃圾.png'
            break
          case 2:
            var img='cloud://dd-aqou2.6464-dd-aqou2-1301484952/garbage/search/湿垃圾.png'
            break
          case 3:
            var img='cloud://dd-aqou2.6464-dd-aqou2-1301484952/garbage/search/干垃圾.png'
            break
          case 4:
            var img='cloud://dd-aqou2.6464-dd-aqou2-1301484952/garbage/search/有害垃圾.jpg'
        }
        this.setData({
          imgsrc:img,
          show:true,
          garbage_info:res.result.newslist
        })
      }
    ).catch(err=>{
      console.log(err);
      Toast.fail('余额不足');
    })
  },
  close() {
    this.setData({
      show: false
    })
    console.log(this.data);
  }
})