let app = getApp()
const util = require('../../utils/util1.js')
Page({

  data: {

  },
  bindImage: function (event) {
    var that = this
    var imagesUrls = event.currentTarget.dataset.imgsurl;
    console.log(event);
    const modal = {
      title: '授权',
      content: '需要您授权使用保存到相册服务',
      confirmText: '设置'
    }
    util.setScope('scope.writePhotosAlbum',modal).then(res => {
      wx.getImageInfo({
        src: imagesUrls,
        success(res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.path,
            success() {
              util.successToShow("保存图片成功")
            }
          })
        }
      })
    })
  }
})