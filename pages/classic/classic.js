import { ClassicModel } from '../../models/classic'
import { LikeModel } from '../../models/like'
const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic:null,
    first:false,
    latest:true,
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  /**
   * 自定义事件
   */
  // 点赞行为
  onLike: function (event) {
    // 获取like组件当前的状态，需要发送的请求是 like 还是 cancle
    const behavior = event.detail.behavior
    const artId = this.data.classic.id
    const category = this.data.classic.type
    const like = likeModel.like(behavior, artId, category)
    like.then(() => {
      wx.showToast({
        title: behavior === 'like' ? '点赞成功' : '点赞已取消',
        duration: 1500
      })
    }, () => {
      wx.showToast({
        title: behavior === 'like' ? '点赞失败' : '取消点赞失败',
        duration: 1500
      })
    })
  },

  // 上一期期刊
  onPrevious: function() {
    this._updateClassic( "previous" )
  },

  // 下一期期刊
  onNext: function() {
    this._updateClassic( "next" )
  },

  // 获取期刊数据
  _updateClassic: function (nextOrPrevious) {
    const index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic:res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  // 获取点赞状态
  _getLikeStatus: function (artID, category) {
    const likeState = likeModel.getClassicLikeStates(artID, category)
    likeState.then((res) => {
      this.setData({
        likeCount:res.fav_nums,
        likeStatus:res.like_status
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
    classicModel.getLatest((res) => {
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
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