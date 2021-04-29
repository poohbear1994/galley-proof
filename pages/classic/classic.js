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
   * 自定义事件
   */
  // 点赞行为
  async onLike(event) {
    // 获取like组件当前的状态，需要发送的请求是 like 还是 cancle
    const behavior = event.detail.behavior
    const artId = this.data.classic.id
    const category = this.data.classic.type
    const like = await likeModel.like(behavior, artId, category)
    this.setLike(like.msg, behavior)
  },

  // 设置最新期刊数据
  setLatest(latest) {
    this.setData({
      classic: latest,
      likeCount: latest.fav_nums,
      likeStatus: latest.like_status
    })
  },

  // 设置收藏
  setLike(msg, behavior) {
    if(msg === 'ok'){
      wx.showToast({
        title: behavior === 'like' ? '点赞收藏' : '收藏已取消',
        duration: 1500
      })
    }
  },

  // 上一期期刊
  onPrevious: function() {
    this._updateClassic( 'previous' )
  },

  // 下一期期刊
  onNext: function() {
    this._updateClassic( 'next' )
  },

  // 获取期刊数据
  async _updateClassic (nextOrPrevious) {
    const index = this.data.classic.index
    const classic = await classicModel.getClassic(index, nextOrPrevious)
    this._setClassic(classic)
  },

  // 设置期刊数据
  _setClassic(classic) {
    this._getLikeStatus(classic.id, classic.type)
    this.setData({
      classic:classic,
      latest: classicModel.isLatest(classic.index),
      first: classicModel.isFirst(classic.index)
    })
  },

  // 获取喜欢状态
  async _getLikeStatus(artID, category) {
    const likeState = await likeModel.getClassicLikeStates(artID, category)
    this._setLikeStatus(likeState)
  },

  // 设置喜欢状态
  _setLikeStatus(likeState) {
    this.setData({
      likeCount:likeState.fav_nums,
      likeStatus:likeState.like_status
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const latest = await classicModel.getLatest()  
    this.setLatest(latest)
  }
})