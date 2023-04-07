// pages/bSd/bsd.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.initdata()
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
    onClose(event) {
        const {
            position,
            instance
        } = event.detail;
        switch (position) {
            case 'left':
            case 'cell':
                instance.close();
                break;
            case 'right':
                Dialog.confirm({
                    message: '确定删除吗？',
                }).then(() => {
                    instance.close();
                    wx.cloud.callFunction({
                        name: "db",
                        data: {
                            $url: 'bsuserremove',
                           OPENID:event.currentTarget.dataset.openid
                        }
                    }).then(() => {
                           this.initdata()
                    })
                }).catch(() => {
                    console.log(22);
                });
                break;
        }
    },
    initdata(){
        wx.cloud.callFunction({
            name: "db",
            data: {
                $url: 'bsuser'
            }
        }).then(res => {
            this.setData({
                user: res.result.data
            })
        })
    }
})