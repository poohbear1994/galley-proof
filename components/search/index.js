import { BookModel } from "../../models/book"
import { KeywordModel } from "../../models/keyword"
const bookModel = new BookModel()
const keywordModel = new KeywordModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    query:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDelete(event){
      console.log('clear')
      this.setData({
        searching: false,
        query: ''
      })
    },

    onCancel(event) {
      this.triggerEvent("cancel")
    },

    onConfirm(event) {
      this.setData({
        searching: true
      })
      const word = event.detail.text || event.detail.value
      bookModel.search(0, word)
      .then(res => {
        this.setData({
          dataArray: res.books,
          query: word
        })
        keywordModel.addToHistory(word)
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
