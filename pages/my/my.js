import { BookModel } from "../../models/book";
import { ClassicModel } from "../../models/classic";
const bookModel = new BookModel()
const classicModel = new ClassicModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    bookCount: 0,
    classics: []
  },

  // 获取用户授权
  onGetUserInfo() {
    wx.getUserProfile({
      lang: "zh_CN",
      desc: "获取登陆授权",
      success: function (res) {
        console.log(res.rawData)
      },
      fail: function (error) {
      }
    })
  },

  // 判断用户收否已经授权
  userAuthorized() {
    wx.getSetting({
      withSubscriptions: false,
      success: (res) => {
        if(res.authSetting["scope.userInfo"]) {
          console.log(res.authSetting["scope.userInfo"])
          this.setData({
            authorized: true
          })
        }
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },

  // 获取我喜欢的书的数量
  getMyBookCount() {
    bookModel.getMyBookCount()
    .then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },

  // 获取我喜欢的期刊
  getMyFavor() {
    classicModel.getMyFavor()
    .then(res => {
      this.setData({
        classics: res
      })
    })
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
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('hide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('unload')
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