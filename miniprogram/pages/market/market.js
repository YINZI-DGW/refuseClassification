// pages/market/market.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeKey: 0,
        goodlists:[{
            name:"苹果Se三代 256GG",
            dec:'A15速度是家传本领',
            price:'4599.00',
            num:"2",
            store:'北京移动官方旗舰店',
            imgsrc:'',
            no:'1111'
        },{
            name:"苹果Se三代 256GG",
            dec:'A15速度是家传本领',
            price:'4599.00',
            num:"2",
            store:'北京移动官方旗舰店',
            imgsrc:'',
            no:'1112'
        },{
            name:"苹果Se三代 256GG",
            dec:'A15速度是家传本领',
            price:'4599.00',
            num:"2",
            store:'北京移动官方旗舰店',
            imgsrc:'',
            no:'1113'
        }],
        goodlists1:[],
        goodlists2:[],
        goodlists3:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.cloud.callFunction({
            // 要调用的云函数名称
            name: "db",
            // 传递给云函数的参数
            data: {
                $url: "getGoods", // 要调用的路由的路径，传入准确路径或者通配符*
            },
        }).then(res=>{
            this.setData({
                goodlists:res.result.data
            })
        })
        wx.cloud.callFunction({
            // 要调用的云函数名称
            name: "db",
            // 传递给云函数的参数
            data: {
                $url: "getGoods1", // 要调用的路由的路径，传入准确路径或者通配符*
            },
        }).then(res=>{
            this.setData({
                goodlists1:res.result.data
            })
        })
        wx.cloud.callFunction({
            // 要调用的云函数名称
            name: "db",
            // 传递给云函数的参数
            data: {
                $url: "getGoods2", // 要调用的路由的路径，传入准确路径或者通配符*
            },
        }).then(res=>{
            this.setData({
                goodlists2:res.result.data
            })
        })
        wx.cloud.callFunction({
            // 要调用的云函数名称
            name: "db",
            // 传递给云函数的参数
            data: {
                $url: "getGoods3", // 要调用的路由的路径，传入准确路径或者通配符*
            },
        }).then(res=>{
            this.setData({
                goodlists3:res.result.data
            })
        })
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
    gomarketdet(e){
        wx.navigateTo({
          url: '../marketdet/marketdet?imgsrc='+e.currentTarget.dataset.imgsrc+'&price='+e.currentTarget.dataset.price,
        })
    }
})