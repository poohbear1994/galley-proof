import { HTTP } from '../utils/http'

class ClassicModel extends HTTP{
  // 获取最新期刊数据
  getLatest(sCallback) {
    this.request({
      url: "/classic/latest",
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.index)
      }
    })
  }

  // 获取期刊数据
  getClassic(index, nextOrPrevious, sCallback) {
    this.request({
      url: '/classic/' + index + '/' + nextOrPrevious,
      success: (res) => {
        sCallback(res)
      }
    })
  }

  // 判断期刊是否为第一期
  isFirst(index) {
    return index === 1 ? true : false
  }

  // 判断期刊是否为最后一期
  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return index === latestIndex ? true : false
  }

  // 缓存最新的期刊刊号
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  // 获取川村中的最新的期刊刊号
  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }
}

export { ClassicModel }