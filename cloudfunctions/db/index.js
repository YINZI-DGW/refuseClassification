const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router');
let {
  FormatData
} = require('./util.js');
cloud.init({
  env: "dd-aqou2"
})
let db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
const MAXANSWER = 10
const MAX_LIMIT = 100
const INTEGRAL = {
  SHARE: 50
}
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {
    APPID,
    OPENID
  } = wxContext
  const app = new TcbRouter({
    event
  })
  app.use(async (ctx, next) => {
    ctx.data = {};
    await next(); // 执行下一中间件
  });
  //  用户登录
  app.router("login", async (ctx, next) => {
    let {
      userInfo
    } = event
    console.log('本地调试云函数携带的参数：', event);
    let user = db.collection('user')
    let {
      total
    } = await user.where({
      OPENID: OPENID
    }).count()
    if (total) {
      await user.where({
          OPENID: OPENID
        })
        .update({
          data: userInfo
        })
    } else {
      await user.add({
        data: {
          nickName: userInfo.nickName,
          gender: userInfo.gender,
          avatarUrl: userInfo.avatarUrl,
          OPENID: OPENID,
          integral: 0, //总积分
          signTotal: 0, //连续签到天数
          signday: [] //签到日期
        }
      })
    }
    let {
      data
    } = await user.where({
      OPENID: OPENID
    }).get()
    ctx.data.rank = await user.orderBy('integral', 'desc').get()
    ctx.body = {
      code: 0,
      msg: "添加成功",
      userInfo: data[0],
      rank: ctx.data.rank
    }
    return
  });
  //   返回用户签到天数
  app.router('signday', async (ctx, next) => {
    let user = db.collection('user')
    let {
      data
    } = await user.where({
      OPENID: OPENID
    }).get()
    ctx.body = {
      code: 1,
      msg: "查询成功",
      data
    }
  })
  //   更新用户签到天数与积分
  app.router('sign', async (ctx, next) => {
    let {
      signday,
      signTotal,
      integral
    } = event
    let user = db.collection('user')
    let {
      data
    } = await user.where({
      OPENID: OPENID
    }).update({
      data: {
        signday: signday,
        signTotal: signTotal,
        integral: integral
      }
    })
    ctx.body = {
      code: 1,
      msg: "查询成功",
      data
    }
  })
  //获取新闻
  app.router('getCommlist', async (ctx, next) => {
    let {
      page,
      limit
    } = event
    let comm = db.collection('comm')
    let {
      data
    } = await comm.skip((page - 1) * limit)
      .limit(limit).orderBy('date', 'desc').get()
    ctx.body = {
      code: 1,
      data: FormatData(data, {
        date: "date"
      })
    }
  })

  //获取新闻详情
  app.router("getCommInfo", async (ctx, next) => {
    let {
      commId,
    } = event
    let comm = db.collection('comm')
    // let like = db.collection('like')
    let {
      data
    } = await comm.doc(commId).get()
    await comm.where({
      _id: commId
    }).update({
      data: {
        readNum: _.inc(1)
      }
    })
    data.isLike = false
    // if (true) {
    //   let {
    //     total
    //   } = await like.where({
    //     OPENID: OPENID,
    //     commId: commId
    //   }).count()
    //   if (total) {
    //     data.isLike = true
    //   } else {
    //     data.isLike = false
    //   }
    // }
    ctx.body = {
      code: 1,
      data: FormatData(data, {
        date: "date"
      })
    }
  })
  //获取用户答题积分排名
  app.router('getUseRanking', async (ctx, next) => {
    let user = db.collection('user')
    const countResult = await user.count()
    const total = countResult.total
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = user.orderBy('answerIntegral', 'desc').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promise)
    }

    let allData = (await Promise.all(tasks)).reduce((acc, cur) => {
      return acc.concat(cur.data)
    }, [])
    let userIndex = allData.findIndex(item => item.OPENID == OPENID)
    if (~userIndex) {
      userIndex += 1
    }

    ctx.body = {
      code: 1,
      data: {
        userIndex
      }
    }
  })

  //获取用户答题记录
  app.router('getHistoryList', async (ctx, next) => {
    let answerHistory = db.collection('answer-history')
    let {
      data
    } = await answerHistory.where({
      OPENID: OPENID
    }).orderBy('historyDate', 'desc').get()
    ctx.body = {
      code: 1,
      data: FormatData(data, {
        historyDate: "time"
      })
    }
  })
  //获取用户答题积分排名列表
  app.router('getUserAnswerlist', async (ctx, next) => {
    let user = db.collection('user')
    let {
      data
    } = await user.orderBy('answerIntegral', 'desc').limit(MAX_LIMIT).get()
    ctx.body = {
      code: 1,
      data: data
    }
  })
  //获得题目
  app.router('answerList', async (ctx, next) => {
    let answer = db.collection('answer')
    let {
      list
    } = await answer.aggregate()
      .sample({
        size: MAXANSWER
      }).end()
    ctx.body = {
      code: 1,
      data: list
    }
  })
  //获取错题
  app.router('getwrongList', async (ctx, next) => {
    let wrong = db.collection('wrong')
    let {
      data
    } = await wrong.where({
      OPENID: OPENID
    }).get()
    ctx.body = {
      code: 1,
      data: data
    }
  })
  //删除错题
  app.router('delWrongUser', async (ctx, next) => {
    let {
      _id
    } = event
    let wrong = db.collection('wrong')

    await wrong.where({
      _id: _id
    }).remove()

    ctx.body = {
      code: 1,
      msg: "删除成功",
      data: ''
    }
  })
  //添加错题
  app.router('wrong', async (ctx, next) => {
    let {
      wrongList,
      integral,
      intervalTime
    } = event
    let wrong = db.collection('wrong')
    let user = db.collection('user')
    let answerHistory = db.collection('answer-history')
    await Promise.all(wrongList.map(item => {

      return new Promise(async (res, rej) => {
        let {
          total
        } = await wrong.where({
          OPENID: OPENID,
          name: item.name,
          check: item.check
        }).count()
        if (!total) {
          await wrong.add({
            data: {
              OPENID: OPENID,
              name: item.name,
              type: item.type,
              check: item.check
            }
          })
        }
        res()
      })
    }))
    /**
     * 添加用户积分
     */
    await user.where({
      OPENID: OPENID
    }).update({
      data: {
        integral: _.inc(Number(integral)),
        answerIntegral: _.inc(Number(integral))
      }
    })
    /**
     * 添加答题记录
     */
    await answerHistory.add({
      data: {
        OPENID: OPENID,
        historyIntervalTime: intervalTime,
        historyDate: new Date(),
        historyFraction: integral,
        historyIntegral: integral
      }
    })
    ctx.body = {
      code: 1
    }
  })
  //获取商城商品100以下
  app.router('getGoods', async (ctx, next) => {
    let goods = db.collection('goods')
    let {
      data
    } = await goods.where({
      priceNum: _.lte(100)
    }).get()
    ctx.body = {
      code: 1,
      data: data
    }
  })
  //获取商城商品100~300
  app.router('getGoods1', async (ctx, next) => {
    let goods = db.collection('goods')
    let {
      data
    } = await goods.where({
      priceNum: _.gt(100).and(_.lte(300))
    }).get()
    ctx.body = {
      code: 1,
      data: data
    }
  })
  //获取商城商品300~1000
  app.router('getGoods2', async (ctx, next) => {
    let goods = db.collection('goods')
    let {
      data
    } = await goods.where({
      priceNum: _.gt(300).and(_.lte(1000))
    }).get()
    ctx.body = {
      code: 1,
      data: data
    }
  })
  //获取商城商品1000
  app.router('getGoods3', async (ctx, next) => {
    let goods = db.collection('goods')
    let {
      data
    } = await goods.where({
      priceNum: _.gt(1000)
    }).get()
    ctx.body = {
      code: 1,
      data: data
    }
  })
  //添加地址
  app.router('addadress', async (ctx, next) => {
    let a = db.collection('adress')
    let {
      data
    } = await a.add({
      data: {
        OPENID: OPENID,
        name: event.name,
        phone: event.phone,
        adress: event.adress,
        adress1: event.adress1,
        biaoqian: event.biaoqian
      }
    })
    ctx.body = {
      code: 1,
      data: data
    }
  })
  //查询地址
  app.router('searchadress', async (ctx, next) => {
    let a = db.collection('adress')
    let {
      data
    } = await a.where({
      OPENID: OPENID,
    }).get()
    ctx.body = {
      code: 1,
      data: data
    }
  })
  //后台管理用户
  app.router('bsuser', async (ctx, next) => {
    let a = db.collection('user')
    let {
      data
    } = await a.where({}).get()
    ctx.body = {
      code: 1,
      data: data
    }
  })
  //后台管理用户之删除
  app.router('bsuserremove', async (ctx, next) => {
    let a = db.collection('user')
    let {
      data
    } = await a.where({
      OPENID: event.OPENID
    }).remove()
    ctx.body = {
      code: 1,
      data: data
    }
  })
    //垃圾代扔搜索
    app.router('allhelpgarbage', async (ctx, next) => {
      let a = db.collection('help')
      let {
        data
      } = await a.where({
      }).get()
      ctx.body = {
        code: 1,
        data: data
      }
    })
  //垃圾代扔搜索
  app.router('helpgarbage', async (ctx, next) => {
    let a = db.collection('help')
    let {
      xiaoqu,
    } = event
    let {
      data
    } = await a.where({
      xiaoqu: xiaoqu
    }).get()
    ctx.body = {
      code: 1,
      data: data
    }
  })
    //增加垃圾代扔订单
    app.router('addhelpgarbage', async (ctx, next) => {
      let a = db.collection('help')
      // let {
      //   detail,
      // } = event
      console.log(event);
      let {
        data
      } = await a.add({
        data: {
          address: event.detail.address,
          avatarUrl:event.detail.avatarUrl,
          nickName: event.detail.nickName,
          date:event.detail.date,
          num:event.detail.num,
          phone: event.detail.phone,
          price:event.detail.price,
          rate:5,
          state:event.detail.state,
          xiaoqu:event.detail.xiaoqu
        }
      })
      ctx.body = {
        code: 1,
        data: data
      }
    })
  return app.serve();
}