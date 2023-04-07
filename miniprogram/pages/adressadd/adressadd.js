// pages/adressadd/adressadd.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const citys = {
    北京: ['朝阳区', '东城区', '海淀区', '通州区', '大兴区', '西城区', '昌平区'],
    浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    福建: ['福州', '厦门', '莆田', '三明', '泉州'],
  };
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show:false,
        adress:'请选择所在地区',
        adress1:'',
        username:'',
        phone:'',
        radio: '学校',
        checked: true,
        columns: [
            {
              values: Object.keys(citys),
              className: 'column1',
            },
            {
              values: citys['北京'],
              className: 'column2',
              defaultIndex: 2,
            },
          ],
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
    onChange(event) {
        const { picker, value, index } = event.detail;
        picker.setColumnValues(1, citys[value[0]]);
        let adress=JSON.stringify(event.detail.value).replace("[","").replace("]","").replace('"',"").replace(',',"").replace('"',"").replace('"',"").replace('"',"")
        this.setData({
            adress:adress,
        })
      },
      showPopup(){
          this.setData({
              show:true
          })
      },
      onCancel(){
        this.setData({
            adress:'请选择所在地区',
            show:false
        })
      },
      onConfirm(event){
        let adress=JSON.stringify(event.detail.value).replace("[","").replace("]","").replace('"',"").replace(',',"").replace('"',"").replace('"',"").replace('"',"")
        this.setData({
            adress:adress,
            show:false
        })
      },
      onChange1(event) {
        this.setData({
          radio: event.detail,
        });
      },
      onChange2({ detail }) {
        // 需要手动对 checked 状态进行更新
        this.setData({ checked: detail });
      },
      save(){
       if(this.data.username===null||this.data.phone==null||this.data.adress1===null||this.data.adress==='请选择所在地区'){
        Toast.fail({
            message: '请输入完整信息',
          });
       }
       wx.cloud.callFunction({
        name: 'db',
        data: {
          $url: "addadress",
          adress:this.data.adress,
          adress1:this.data.adress1,
          name:this.data.username,
          phone:this.data.phone,
          biaoqian:this.data.radio
        }
      }).then(res=>{
        Toast.success('添加成功')
        wx.redirectTo({
          url: '../adress/adress',
        })
      })
      },
      setusername(e){
        this.setData({
          username:e.detail
        })
      },
      setphone(e){
        this.setData({
          phone:e.detail
        })
      },
      setadress1(e){
        this.setData({
          adress1:e.detail
        })
      }
})