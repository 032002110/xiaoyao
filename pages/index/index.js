// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    userInformation:wx.getStorageSync('null')
  },
  // 事件处理函数
  jumppage(){
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },
  onLoad: function(options){

  },
  /* 授权登入 */
getUserProfile() {
  wx.getUserProfile({
      desc:'展示用户信息',

      success: (res) =>{
          let userInformation = res.userinfo
          /* 写入缓冲 */
          wx.setStorageSync('userInformation',userInformation)
          this.setData({
              userInformation:userInformation
          })
          // 登入成功提示
          wx.showToast({
            title: '登入成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateTo({
            url: '/pages/logs/logs',
          })
      }
  })
},
getUserInfo(){
  var that = this 
  wx.showModal({
      title: '温馨提示',
      content: '确定要退出登入吗',
      success(res){
          if(res.confirm){
              that.setData({
                  userInformation:null
              })
              //清空缓存
              wx.setStorageSync('userInformation', null)
              wx.showToast({
                  title: '退出成功',
                  icon: 'success',
                  duration: 2000
              })
          }
      }
  })
}
})
