// pages/adress/adress.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
           adresslists:[{
               name:'吴彦祖',
               adress:'北京海淀区四季青地区',
               adress1:'杏石路北坞嘉园3号楼1单元201',
               phone:'1234567899',
               biaoqian:'家'
           },
           {
            name:'陈冠希',
            adress:'郑州高新区瓦乌里',
            adress1:'振兴路瓦乌里小区3号楼1单元201',
            phone:'1234567899',
            biaoqian:'公司'
        },
        {
            name:'周杰伦',
            adress:'北京海淀区四季青地区',
            adress1:'杏石路北坞嘉园3号楼1单元201',
            phone:'1234567899',
            biaoqian:'学校'
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.cloud.callFunction({
            name: 'db',
            data: {
              $url: "searchadress",
            }
          }).then(res=>{
              this.setData({
                  adresslists:res.result.data
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
       /**
     * 修改地址
     */
    change(e){
         console.log(e.target.dataset);
    },
         /**
     * 修改地址
     */
    goadd(){
        wx.redirectTo({
            url: '../adressadd/adressadd'
          })
    }
})