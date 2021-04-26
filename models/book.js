import { HTTP } from '../utils/http'

class BookModel extends HTTP {
  getHotList() {
    return this.request({
      url: "/book/hot_list"
    })
  }

  getMyBookCount() {
    return this.request({
      url: "/book/favor/count"
    })
  }

  // 获取书籍详情
  getDetail(bid) {
    return this.request({
      url:`/book/${bid}/detail`
    })
  }

  // 获取当前书籍喜欢
  getLikeStatus(bid) {
    return this.request({
      url: `/book/${bid}/favor`
    })
  }

  // 获取当前书籍短评
  getComments(bid) {
    return this.request({
      url: `/book/${bid}/short_comment`
    })
  }
}

export { BookModel }