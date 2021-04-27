import { HTTP } from '../utils/http'

class BookModel extends HTTP {
  // 获取热门书籍数据
  getHotList() {
    return this.request({
      url: "/book/hot_list"
    })
  }

  // 获取所搜书籍数据
  search(start, q) {
    return this.request({
      url: '/book/search?summary=1',
      data: {
        q: q,
        start: start
      }
    })
  }

  // 获取我的书籍的数量
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

  // 上传评论到服务器
  postComment(bid, comment) {
    return this.request({
      url: "/book/add/short_comment",
      method: "POST",
      data: {
        book_id: bid,
        content: comment
      }
    })
  }
}

export { BookModel }