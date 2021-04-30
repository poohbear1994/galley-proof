// components/tag/index.js
Component({
  options: {
    // 启用slot
    multipleSlots: true
  },

  // 启用外部定义的样式
  externalClasses: [ 'tag-class' ],
  
  /**
   * 组件的属性列表
   */
  properties: {
    text: String
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      this.triggerEvent( 'tapping', {
        text: this.properties.text
      } )
    }
  }
})
