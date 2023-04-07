// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router');
const axios = require('axios');
const qs = require('qs');
const {
  Context,
  Signer
} = require('jdcloud-sdk-signer')

cloud.init({
  env: ""
})
let db = cloud.database()
const _ = db.command

/**
 * 因为京东neuhub平台服务器崩溃，所以改用京东云垃圾分类API
 */

/**
 * 京东API配置
 * 垃圾分类api
 * 
 * 申请地址：https://www.jdcloud.com/cn/products/garbage-classification
 */
let jdaiyuncofig = {
  accessKeyId: 'JDC_F0904F0F3B595D5B71FEA3802CF8',
  secretAccessKey: 'DEA78F8481A2C51117F2F89BD3BA9F0B'
}

function getAuthorization() {
  let ctx = new Context('nativecontainer.internal.cn-north-1.jdcloud-api.com', '/jdai/*', 'POST', null, '', 'cn-north-1')
  ctx.buildNonce()
  let signer = new Signer(ctx, jdaiyuncofig)
  let auth = signer.sign(new Date())
  return auth
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {
    APPID,
    OPENID
  } = wxContext
  const app = new TcbRouter({
    event
  })

  //提供通过文本进行垃圾分类查询的能力
  app.router('garbageTextSearch', async (ctx, next) => {
    let {
      text
    } = event
    //京东云老接口，老是出问题（京东不稳定）
    // let auth = getAuthorization()
    // ctx.body = axios.post(`https://aiapi.jdcloud.com/jdai/garbageTextSearch`, {
    //   text: text,
    //   cityId: '310000'
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': auth
    //   }
    // }).then(res => {
    //   return res.data
    // })

    var request = require('request');
    return new Promise((resolve, reject) => {
      request.post({
        url: 'http://api.tianapi.com/lajifenlei/index',
        form: {
          key: 'e0af2553aa9d61c01916b033c003691f',
          word: text
        }
      }, function (err, response, body) {
        resolve(body)
        ctx.body=body
      })
    })

  })
  //获取用户openID
  app.router('openId', async (ctx, next) => {
    ctx.body = {
      openId: OPENID
    }
  })
  //通过图片进行垃圾分类查询的能力
  app.router('garbageImageSearch', async (ctx, next) => {
    let {
      imgBase64,
    } = event
    ctx.body = {
      code: 1
    }
    var img1111 = ''
    let a = await axios({
      method: 'get',
      url: event.imgBase64,
      responseType: '',
      headers: {
        "Content-Type": "*"
      }
    }).then(res => {
      img1111 = res.data
    })
    console.log(img1111, 'img1111');
    var param = new URLSearchParams();
    param.append('key', 'e0af2553aa9d61c01916b033c003691f')
    param.append('img', img1111)
    ctx.body = axios({
      method: 'post',
      url: 'http://api.tianapi.com/imglajifenlei/index',
      data: param
    }).then(res => {
      console.log(res);
      return res.data
    })

  });

  return app.serve()
}