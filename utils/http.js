import { config } from '../config.js'

// 错误码
const tips = {
  1: '抱歉，出现了一个错误',
  1005:'appkey无效，请前往www.7yue.pro申请',
  3000:'期刊不存在'
}

class HTTP {
  request(params) {
    // params需要参数：url，data，method
    if(!params.method) {
      params.method = "GET"
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        appKey: config.appKey
      },
      success: (res) => {
        let code = res.statusCode.toString()
        if(code.startsWith("2")) {
          params.success && params.success(res.data)
        } else {
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: () => {
        wx.showToast({
          title: "网络错误",
          duration: 2000,
          icon:"none"
        })
      }
    })
  }

  _show_error(error_code){
    if(!error_code) {
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      duration: 2000,
      icon:"none"
    })
  }
}
export { HTTP }