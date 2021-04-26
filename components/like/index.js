// comnponents/like.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean
    },
    count:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    like: false,
    count: 9,
    yesSrc: './images/like.png',
    noSrc: './images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(event){
      let like = this.properties.like
      let count = this.properties.count

      count = like ? count - 1 : count + 1
      this.setData({
        count,
        like: !like
      })

      let behavior = this.properties.like ? "like" : "cancle"
      // 触发从外部传入的like事件
      this.triggerEvent("like",{
        behavior: behavior
      },{})
    }
  }
})
