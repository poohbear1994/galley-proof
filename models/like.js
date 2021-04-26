import { HTTP } from '../utils/http'

class LikeModel extends HTTP {
  like(behavior, artId, category) {
    let url = behavior == 'like' ? '/like' : '/like/cancel'
    return this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artId,
        type: category
      }
    })
  }

  // 获取期刊的点赞数据
  getClassicLikeStates(artID, category) {
    return this.request({
      url: `/classic/${category}/${artID}/favor`
    })
  }
}

export { LikeModel }