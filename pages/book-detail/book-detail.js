import { BookModel } from '../../models/book'
import { LikeModel } from '../../models/like'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeCount: 0,
    likeStatus: false,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad( options ) {
    wx.showLoading()
    const bid = options.bid
    const detail = bookModel.getDetail( bid )
    const comments = bookModel.getComments( bid )
    const likeStatus = bookModel.getLikeStatus( bid )
    const bookAllData = await Promise.all( [ detail, comments, likeStatus ] )
    this._setBookData( bookAllData )
  },
  
  onLike(event) {
    const like_or_cancel = event.detail.behavior
    likeModel.like( like_or_cancel, this.data.book.id, 400 )
  },

  onFakePost() {
    this.setData({
      posting: true
    })
  },

  onCancle() {
    this.setData({
      posting: false
    })
  },

  async onPost( event ) {
    const comment = event.detail.text || event.detail.value

    if( !comment ) {
      return
    }

    if( comment.length > 12 ) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    const inputVal = event.detail.value
    const postComment = await bookModel.postComment( this.data.book.id, comment )
    this._setComment( postComment, inputVal )
  },

  // 设置书本数据
  _setBookData( bookAllData ) {
    this.setData({
      book: bookAllData[0],
      comments: bookAllData[1].comments,
      likeCount: bookAllData[2].fav_nums,
      likeStatus: bookAllData[2].like_status
    })
    wx.hideLoading()
  },

  // 提交评论后设置评论
  _setComment( comment, inputVal ) {
    wx.showToast({
      title: '评论成功',
      icon: 'none'
    })

    if( inputVal ) {
      this.data.comments.unshift({
        content: inputVal,
        nums: 1
      })
    }
    
    this.setData({
      comments: comment.comments || this.data.comments,
      posting: false
    })
  }
})