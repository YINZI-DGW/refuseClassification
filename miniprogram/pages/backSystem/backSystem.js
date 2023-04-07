// pages/backSystem/backSystem.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
         account:'',
         password:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
      /**
     * 获取账户
     */
    getaccount(e){
        this.setData({
            account:e.detail.value
        })
    },
        /**
     * 获取密码
     */
    getpassword(e){
        this.setData({
            password:e.detail.value
        })
    },
      /**
     * 登录
     */
    login(){
      if(this.data.account==='admin'&&this.data.password==='admin123'){
        Toast({
            type: 'success',
            message: '登录成功',
            onClose: () => {
              wx.navigateTo({
                url: '../backsystemindex/backsystemindex',
              })
            },
          });
      }else{
        Toast.fail('未知管理员');
      }
    }
})