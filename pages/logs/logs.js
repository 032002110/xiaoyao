// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  },
  // 按钮处理函数
  jumplocal(){
    wx.navigateTo({
      url: '/pages/local_battle/local_battle',
    })
  },
  jumphuman(){
    wx.navigateTo({
      url: '/pages/Multiplayer/Multiplayer',
    })
  },
  jumprobat(){
    wx.navigateTo({
      url: '/pages/robot_human/robot_human',
    })
  },
  jumpranking(){
    wx.navigateTo({
      url: '/pages/ranking/ranking',
    })
  },
  skyOnclick(){
    wx.navigateTo({
      url: '/pages/ranking/ranking',
    })
  },
  jumprules(){
    wx.navigateTo({
      url: '/pages/rules2/rules2',
    })
  }
})
