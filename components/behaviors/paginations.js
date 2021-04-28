const paginationBeh = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false
  },

  methods: {
    // 拼接更多数据
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray,
        total: 0
      })
    },

    // 获取当前请求数据的起点
    getCurrentStart() {
      return this.data.dataArray.length
    },

    // 设置总数
    setTotal(total) {
      this.setData({
        total: total
      })
      if(total === 0) {
        this.setData({
          noneResult: true
        })
      }
    },

    // 是否还有更多数据
    hasMore() {
      if(this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },

    // 数据初始化
    initialize() {
      this.setData({
        dataArray: [],
        total : null,
        noneResult: false
      })
    }
  }
})

export { paginationBeh }