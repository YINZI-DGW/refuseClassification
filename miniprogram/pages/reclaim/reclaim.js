// pages/reclaim/reclaim.js
var plugin = requirePlugin("trash-plugin");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        img: '',
        text1: "",
        text1body: "",
        text2body: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this
        switch (options.type) {
            case '1':
                console.log(1);
                that.setData({
                    img:'cloud://dd-aqou2.6464-dd-aqou2-1301484952/garbage/search/干垃圾.png',
                    text1:"干垃圾",
                    text1body:"是指危害比较小，没有再次利用的价值的垃圾。",
                    text2body:"脏污的塑料制品，烟头，一次性餐具，海鲜贝壳，破旧陶瓷，宠物粪便，脏污纺织品，污染纸张，大骨棒等除可回收物、有害垃圾、厨余垃圾外的生活垃圾。"
                })
                break
            case '2':
                that.setData({
                    img:'cloud://dd-aqou2.6464-dd-aqou2-1301484952/garbage/search/湿垃圾.png',
                    text1:"湿垃圾",
                    text1body:"是指居民日常生活及食品加工、饮食服务、单位供餐等活动中产生的垃圾。",
                    text2body:"丢弃不用的菜叶、剩菜、剩饭、果皮、蛋壳、茶渣、骨头等，其主要来源为家庭厨房、餐厅、饭店、食堂、市场及其他与食品加工有关的行业。"
                })
                break
            case '3':
                that.setData({
                    img:'cloud://dd-aqou2.6464-dd-aqou2-1301484952/garbage/search/有害垃圾.jpg',
                    text1:"有害垃圾",
                    text1body:"是指含有对人体健康有害的重金属、有毒的物质或者对环境造成现实危害或者潜在危害的废弃物。",
                    text2body:"废胶卷，杀虫剂，荧光灯管，废旧化学品类，过期药品，废矿物油及其包装物，油漆桶、罐，废墨盒，废胶片、相纸，废镍镉电池和氧化汞电池等《国家危险废物名录》中的家庭源危险废物。"
                })
                break
            case '4':
                that.setData({
                    img:'cloud://dd-aqou2.6464-dd-aqou2-1301484952/garbage/search/可回收物.png',
                    text1:"可回收物",
                    text1body:"是指适宜回收循环使用和资源利用的废物。",
                    text2body:"纸类、塑料、金属、玻璃、织物等未受污染，适宜回收利用的生活垃圾。"
                })
                break
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