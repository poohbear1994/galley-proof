import { classicBeh } from '../classic-beh'

// 获取背景音乐管理对象
const mMgr = wx.getBackgroundAudioManager()

Component({
  // 继承behavior
  behaviors: [ classicBeh ],

  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    palying: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  /**
   * 组件的生命周期
   */
  attached: function (event) {
    this._recoverStatus()
    this._monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      // 切换图片
      if( !this.data.playing ) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      }else{
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },

    // 重置播放暂停按钮
    _recoverStatus() {
      if( mMgr.paused ) {
        this.setData({
          playing:false
        })
        return
      }
      if( mMgr.src === this.properties.src ) {
        this.setData({
          playing: true
        })
      }
    },

    // 总控开关切换
    _monitorSwitch(){
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
