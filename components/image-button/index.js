Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo( event ) {
      this.triggerEvent('getuserinfo', event.detail, {})
    }
  }
})
