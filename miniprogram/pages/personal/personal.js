// pages/personal/personal.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showPop: false,
        userInfo: {}, //用户个人信息
        cloudID: null, //用户唯一id
        showShare: false,
        rank: 0, //用户排名
        options: [{
                name: '微信',
                icon: 'wechat',
                openType: 'share'
            },
            {
                name: '微博',
                icon: 'weibo',
            },
            {
                name: '复制链接',
                icon: 'link'
            },
            {
                name: '分享海报',
                icon: 'poster'
            },
            {
                name: '二维码',
                icon: 'qrcode'
            },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // wx.clearStorage()
        wx.getStorageSync({
            key: 'userInfo',
            success(res) {
                this.setData({
                    userInfo: res.userInfo,
                })
            }
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
        console.log('下拉刷新');
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    /**
     * 获取用户信息
     */
    handleGetUserInfo(e) {
        wx.getUserProfile({
            desc: '用于完善个人资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                this.setData({
                    cloudID: res.cloudID,
                })
                wx.cloud.callFunction({
                    // 要调用的云函数名称
                    name: "db",
                    // 传递给云函数的参数
                    data: {
                        $url: "login", // 要调用的路由的路径，传入准确路径或者通配符*
                        userInfo: res.userInfo,
                    },
                    success: (res) => {
                        this.setData({
                            userInfo: res.result.userInfo
                        })
                        app.globalData.isLogin = true
                        app.globalData.nickName = this.data.userInfo.nickName
                        app.globalData.avatarUrl=this.data.userInfo.avatarUrl
                        this.getRank(res.result.rank.data)
                    },
                });
            },
            fail: (res) => {}
        })
    },
    /**
     * 关闭弹窗
     */
    onClose() {
        this.setData({
            showPop: false
        });
    },
    gotupu(){
        wx.navigateTo({
            url: '../download/download'
          })
    },
    /**
     * 退出登录
     */
    logout() {
        if (this.data.cloudID === null) {
            Notify({
                type: 'warning',
                message: '您还未登录,请先登录'
            });
        } else {
            Notify({
                type: 'success',
                message: '退出成功'
            });
            this.setData({
                cloudID: null,
                userInfo: {}
            })
           app.globalData.isLogin = false
           app.globalData.nickName = '',
           app.globalData.isLogin = ''
        }
    },
    /**
     * 帮助说明
     */
    description() {
        wx.navigateTo({
          url: '../description/description',
        })
    },
    /**
     * 地址管理
     */
    address() {
        if (this.data.cloudID === null) {
            Notify({
                type: 'warning',
                message: '您还未登录,请先登录'
            });
        } else{
            wx.navigateTo({
                url: '../adress/adress',
              })
        }

    },
    /**
     * 邀请好友
     */
    invitation() {
        console.log('invitation');
        this.setData({
            showShare: true
        })
    },
    /**
     * 跳转后台系统
     */
    goBackSystem() {
        wx.navigateTo({
            url: '../../pages/backSystem/backSystem',
        })
    },
    /**
     * 关闭邀请框
     */
    Closeshare() {
        this.setData({
            showShare: false
        })
    },
    /**
     *分享邀请框按钮点击
     */
    onSelect(event) {
        this.Closeshare()
        if (event.detail.name !== '微信') {
            const toast = Toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                message: '功能暂不支持',
                selector: '#custom-selector',
            });

            let second = 3;
            const timer = setInterval(() => {
                second--;
                if (second) {
                    toast.setData({
                        message: `即将关闭`,
                    });
                } else {
                    clearInterval(timer);
                    Toast.clear();
                }
            }, 1000);
        }
    },
    /**
     * 分享朋友圈功能
     */
    onShareAppMessage: function () {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })
    },
    onShareTimeline: function () {
        console.log(1111);
        let _this = this;
        // 构建页面参数
        return {
            //titile就是分享名称  query为分享进入链接，imageurl就是图片相对获取就可以
            title: '微信小程序',
            query: {
                key: "/pages/personal/personal"
            },
        }
    },
    /**
     * 每日签到
     */
    GoIntegral() {
        console.log('签到功能');
        if (this.data.cloudID) {
         wx.navigateTo({
           url: '../../pages/Integral/Integral',
         })
        } else {
            Notify({
                type: 'warning',
                message: '您还未登录,请先登录'
            });
        }
    },
    /**
     * 获取排名
     */
    getRank(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (this.data.userInfo.OPENID === arr[i].OPENID)
                this.setData({
                    rank: i + 1
                })
        }
    }
})