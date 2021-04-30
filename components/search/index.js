import { BookModel } from '../../models/book'
import { KeywordModel } from '../../models/keyword'
import { paginationBeh } from '../behaviors/paginations';
const bookModel = new BookModel()
const keywordModel = new KeywordModel()

Component({
  behaviors: [ paginationBeh ],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    query: '',
    loadingCenter: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 清空查询关键字
    onDelete() {
      this._closeResult()
      this._clearKeyword()
      this.initialize()
    },

    // 取消
    onCancel() {
      this.triggerEvent( 'cancel' )
      this.initialize()
    },

    // 搜索事件
    async onConfirm( event ) {
      const word = event.detail.text || event.detail.value
      if(!word) {
        wx.showToast({
          title: '请填入搜索关键字',
          icon: 'none'
        })
        return
      }
      this._showResult()
      this._showLoadingCenter()
      this.initialize()
      const searchRes = await bookModel.search( 0, word )
      this._setSearchRes( searchRes )
      this._setQuery( word )
    },

    // 加载更多
    async loadMore() {
      if( !this.data.query || this.isLocked() ) {
        return
      }
      if( !this.hasMore() ) {
        wx.showToast({
          title: '没有更多数据了～',
          icon: 'none'
        })
        return
      }
      const start = this.getCurrentStart()
      this.locked()
      const moreData = await bookModel.search( start, this.data.query )
      this.setMoreData( moreData.books )
      this.unLocked()
    },

    // 设置搜索结果
    _setSearchRes( searchRes ) {
      this.setMoreData( searchRes.books )
        this.setTotal( searchRes.total )
        this._hideLoadingCenter()
    },

    // 设置input框查询值
    _setQuery( query ) {
      this.setData({
        query
      })
      keywordModel.addToHistory( query )
    },

    // 显示请求结果
    _showResult() {
      this.setData({
        searching: true
      })
    },

    // 关闭请求结果
    _closeResult() {
      this.setData({
        searching: false
      })
    },

    // 清空input的搜索数据
    _clearKeyword() {
      this.setData({
        query: ''
      })
    },

    // 开启页面中间loading
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    // 关闭页面中间的loading
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    // 设置热门搜索列表
    _setHotList(hotWords) {
      this.setData({
        hotWords
      })
    },
  },

  /**
   * 生命周期函数
   */
  lifetimes:{
    async attached(){
      this.setData({
        historyWords: keywordModel.getHistory()
      })
      const hotWords = await keywordModel.getHot()
      this._setHotList( hotWords.hot )
    }
  }
})