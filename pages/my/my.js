import { BookModel } from '../../models/book';
import { ClassicModel } from '../../models/classic';
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
      lang: 'zh_CN',
      desc: '获取登陆授权',
      success( res ) {
        console.log( res.rawData )
      },
      fail( error ) {
        console.log( error )
      }
    })
  },

  // 判断用户是否已经授权
  userAuthorized() {
    wx.getSetting({
      withSubscriptions: false,
      success: ( res ) => {
        if( res.authSetting['scope.userInfo'] ) {
          this.setData({
            authorized: true
          })
        }
      },
      fail:( error ) => {
        console.log( error )
      }
    })
  },

  // 获取我喜欢的书的数量
  async getMyBookCount() {
    const myBookCount = await bookModel.getMyBookCount()
    this._setMyBookCount( myBookCount.count )
  },

  // 获取我喜欢的期刊
  async getMyFavor() {
    const classics =  await classicModel.getMyFavor()
    this._setMyFavor( classics )
  },

  // 设置我喜欢的书籍数量
  _setMyBookCount( bookCount ) {
    this.setData({
      bookCount
    })
  },

  // 设置我喜欢的期刊数据
  _setMyFavor( classics ) {
    this.setData({
      classics
    })
  },

  // 设置跳转传递的数据
  _setJumpData(detail) {
    getApp().globalData.calssic = detail
  },

  // 跳转到详情页
  onJumpToDetail(event) {
    this._setJumpData(event.detail)
    wx.switchTab({
      url: '/pages/classic/classic',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  }
})