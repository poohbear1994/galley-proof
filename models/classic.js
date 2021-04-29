import { HTTP } from '../utils/http'

class ClassicModel extends HTTP{
  // 获取最新期刊数据
  getLatest() {
    return this.request({
      url: `/classic/latest`,
    }).then((res) => {
      this._setLatestIndex(res.index)
      let key = this._getKey(res.index)
      wx.setStorageSync(key, res)
      return res
    })
  }

  // 获取期刊数据
  getClassic(index, nextOrPrevious) {
    // 先从缓存中尝试获取数据
    let key = nextOrPrevious === "next" ? this._getKey(index+1) : this._getKey(index-1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      // 缓存中获取不到再从服务器获取
      return this.request({
        url: `/classic/${index}/${nextOrPrevious}`,
      }).then((res) => {
        wx.setStorageSync(this._getKey(res.index), res)
        return res
      })
    }else{
      return Promise.resolve(classic)
    }
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

  // 获取我喜欢的期刊数据
  getMyFavor() {
    return this.request({
      url: "/classic/favor"
    })
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

  // 生成写入缓存的key
  _getKey(index) {
    let key = `classic-${index}`
    return key
  }
}

export { ClassicModel }