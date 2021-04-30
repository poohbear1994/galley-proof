import { ClassicModel } from '../../models/classic'
import { LikeModel } from '../../models/like'
const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    first: false,
    latest: true,
    likeCount: 0,
    likeStatus: false,
    loading: true
  },

  /**
   * 自定义事件
   */
  // 点赞行为
  async onLike( event ) {
    // 获取like组件当前的状态，需要发送的请求是 like 还是 cancle
    const behavior = event.detail.behavior
    const artId = this.data.classic.id
    const category = this.data.classic.type
    const like = await likeModel.like( behavior, artId, category )
    this.setLike( like.msg, behavior )
  },

  // 设置最新期刊数据
  setLatest( latest ) {
    this.setData({
      classic: latest,
      likeCount: latest.fav_nums,
      likeStatus: latest.like_status
    })
  },

  // 设置收藏
  setLike( msg, behavior ) {
    if( msg === 'ok' ){
      wx.showToast({
        title: behavior === 'like' ? '收藏成功' : '收藏已取消',
        duration: 1500
      })
    }
  },

  // 上一期期刊
  onPrevious() {
    this._updateClassic( 'previous' )
  },

  // 下一期期刊
  onNext() {
    this._updateClassic( 'next' )
  },

  // 获取期刊数据
  async _updateClassic( nextOrPrevious ) {
    this.openLoading()
    const index = this.data.classic.index
    const classic = await classicModel.getClassic( index, nextOrPrevious )
    this._setClassic( classic )
    this.closeLoading()
  },

  // 开启loading
  openLoading() {
    this.setData({
      loading: true
    })
  },

  // 关闭loading
  closeLoading() {
    this.setData({
      loading: false
    })
  },

  // 设置期刊数据
  _setClassic( classic ) {
    this._getLikeStatus( classic.id, classic.type )
    this.setData({
      classic,
      latest: classicModel.isLatest(classic.index),
      first: classicModel.isFirst(classic.index)
    })
  },

  // 获取喜欢状态
  async _getLikeStatus( artID, category ) {
    const likeState = await likeModel.getClassicLikeStates( artID, category )
    this._setLikeStatus( likeState )
  },

  // 设置喜欢状态
  _setLikeStatus( likeState ) {
    this.setData({
      likeCount: likeState.fav_nums,
      likeStatus: likeState.like_status
    })
  },

  // 获取跳转传递的数据
  _getJumpData() {
    return getApp().globalData.calssic
  },

  // 清空跳转数据
  _clearJumpData() {
    getApp().globalData.calssic = null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const latest = await classicModel.getLatest()  
    this.setLatest( latest )
    this.closeLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    const classic = this._getJumpData()
    if(classic) {
      this.openLoading()
      const { cid: artID, type: category } = classic
      const data = await classicModel.getClassicForArtIDAndCategory( artID, category )
      this._setClassic( data )
      this.closeLoading()
      this._clearJumpData()
    }
  }
})