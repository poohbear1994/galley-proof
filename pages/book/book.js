import { BookModel } from '../../models/book'
import { random } from '../../utils/common.js'

const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: ''
  },

  // 搜索状态
  onSearching() {
    this.setData({
      searching: true
    })
  },

  // 取消事件
  onCancel() {
    this.setData({
      searching: false
    })
  },

  // 设置热门搜索
  setHotList( hotList ) {
    this.setData({
      books: hotList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const hotList = await bookModel.getHotList()
    this.setHotList( hotList )
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.setData({
      more: random( 16 )
    })
  }
})