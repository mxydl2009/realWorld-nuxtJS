import { request } from '@@/plugins/request'
// 获取公共文章列表global Feed
export const getArticles = params => {
  return request({
    method: 'get',
    url: '/api/articles',
    params
  })
}

// 获取当前用户关注的用户的文章列表
export const getYourFeedArticles = params => {
  return request({
    method: 'get',
    url: '/api/articles/feed',
    params
  })
}

// 文章点赞功能
export const addFavorite = slug => {
  return request({
    method: 'post',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞功能
export const deleteFavorite = slug => {
  return request({
    method: 'delete',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export const getArticle = slug => {
  return request({
    method: 'get',
    url: `/api/articles/${slug}`
  })
}

export const getArticleComments = slug => {
  return request({
    method: 'get',
    url: `/api/articles/${slug}/comments`
  })
}