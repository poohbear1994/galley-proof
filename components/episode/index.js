// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 期刊
    index: {
      type: Number,
      // 当观察到该propertie发生改变时，执行observer函数
      observer: function(newVal, oldVal, changedPath) {
        let val = newVal < 10 ? '0' + newVal : newVal
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ],
    year: 0,
    month: '',
    _index: ''
  },

  lifetimes: {
    attached: function() {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()

      this.setData({
        year,
        month: this.data.months[month]
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
