/*
 * @Author: your name
 * @Date: 2021-04-25 11:48:24
 * @LastEditTime: 2021-04-25 21:43:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /galley-proof/components/classic/music/index.js
 */
import {classicBeh} from '../classic-beh'

// 获取音乐管理对象
const mMgr = wx.getBackgroundAudioManager()

Component({
  // 继承behavior
  behaviors:[classicBeh],

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

  detached: function (event) {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function (event) {
      // 切换图片
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
        console.log(this.properties.title)
        mMgr.title = this.properties.title
        console.log(mMgr)
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },

    // 重置播放暂停按钮
    _recoverStatus: function() {
      if (mMgr.paused) {
        this.setData({
          playing:false
        })
        return
      }
      if (mMgr.src === this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    // 总控开关切换
    _monitorSwitch: function(){
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
