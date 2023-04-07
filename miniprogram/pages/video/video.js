// pages/video/video.js
function getRandomColor () {
    let rgb = []
    for (let i = 0 ; i < 3; ++i){
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
  }
  
  Page({
    onReady: function (res) {
      this.videoContext = wx.createVideoContext('myVideo')
    },
    inputValue: '',
      data: {
          src: '',
          show:false,
          videolist:[
              {
                  title:"垃圾分类宣传",
                  src:'https://video-qn.51miz.com/preview/video/00/00/13/14/V-131448-1D191385.mp4'
              },
              {
                title:"'你'是什么垃圾？",
                src:'https://video-qn.51miz.com/preview/video/00/00/13/14/V-131449-3BB5AF57.mp4'
            },
            {
                title:"4k实拍高空",
                src:'http://bpic.588ku.com/video_listen/588ku_video/21/11/24/21/14/26/video619e3ab2bbad6.mp4'
            },
            {
                title:"4k实拍春节街景",
                src:'http://bpic.588ku.com/video_listen/588ku_video/22/01/12/15/27/32/video61de82e407ec4.mp4'
            },
            {
                title:"4k实拍唯美春天",
                src:'http://bpic.588ku.com/video_listen/588ku_video/22/02/14/17/06/59/video620a1bb3845e4.mp4'
            },
          ],//视频
          areaList : {
            province_list: {
              110000: '北京市',
              120000: '天津市',
            },
            city_list: {
              110100: '北京市',
              120100: '天津市',
            },
            county_list: {
              110101: '东城区',
              110102: '西城区',
              // ....
            },
          },
      danmuList: [
        {
          text: '保护环境，人人有责！',
          color: '#ff0000',
          time: 1
        },
        {
          text: '我出来冒泡了！',
          color: '#ff00ff',
          time: 3
        }
      ]
      },
    bindInputBlur: function(e) {
      this.inputValue = e.detail.value
    },
      bindButtonTap: function() {  //视频下载
          var that = this
          wx.chooseVideo({
              sourceType: ['album', 'camera'],
              maxDuration: 60,
              camera: ['front','back'],
              success: function(res) {
                  that.setData({
                      src: res.tempFilePath
                  })
              }
          })
      },
    bindSendDanmu: function () {
      this.videoContext.sendDanmu({
        text: this.inputValue,
        color: getRandomColor()
      })
    },
      videoErrorCallback: function(e) {
        console.log('视频错误信息:');
        console.log(e.detail.errMsg);
      },
      //弹出框
      onChange(picker, index, value){
     console.log(picker,index,value);
      }
  })