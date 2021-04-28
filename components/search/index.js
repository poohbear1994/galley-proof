import { BookModel } from "../../models/book"
import { KeywordModel } from "../../models/keyword"
import { paginationBeh } from "../behaviors/paginations";
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
    query:'',
    loading: false,
    loadingCenter: false,
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDelete(event){
      this._closeResult()
      this._clearKeyword()
      this.initialize()
    },

    onCancel(event) {
      this.triggerEvent("cancel")
      this.initialize()
    },

    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      this.initialize()
      const word = event.detail.text || event.detail.value
      bookModel.search(0, word)
      .then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          query: word
        })
        keywordModel.addToHistory( word )
        this._hideLoadingCenter()
      })
    },

    loadMore() {
      if(!this.data.query) {
        return
      }
      if(!this.hasMore()) {
        return
      }
      if(this._isLocked()) {
        return
      }
      const start = this.getCurrentStart()
      this._locked()

      bookModel.search(start, this.data.query)
      .then(res => {
        this.setMoreData(res.books)
        this._unLocked()
      }, () => {
        wx.showToast({
          title: '当前网络错误～',
          icon: 'loading'
        })
        this._unLocked()
      })
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

    // 请求🔒是否生效
    _isLocked() {
      return this.data.loading ? true :false
    },

    // 请求上🔒
    _locked() {
      this.setData({
        loading: true
      })
    },

    // 解开请求🔒
    _unLocked() {
      this.setData({
        loading: false
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
    }
  },

  /**
   * 生命周期函数
   */
  lifetimes:{
    attached(){
      this.setData({
        historyWords: keywordModel.getHistory()
      })

      keywordModel.getHot()
      .then(res =>{
        this.setData({
          hotWords: res.hot
        })
      })
    }
  }
})
