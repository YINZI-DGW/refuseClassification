// pages/map/map.js
const chooseLocation = requirePlugin('chooseLocation');
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
        console.log(location);
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

    }
})