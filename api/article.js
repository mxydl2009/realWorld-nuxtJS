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

// 获取文章评论列表
export const getArticleComments = slug => {
  return request({
    method: 'get',
    url: `/api/articles/${slug}/comments`
  })
}

// 用户增加对文章的评论
export const postArticleComment = (slug, comment) => {
  return request({
    method: 'post',
    url: `/api/articles/${slug}/comments`,
    data: {
      comment: {
        body: comment
      }
    }
  })
}

// 删除用户对文章评论
export const deleteArticleComment = (slug, id) => {
  return request({
    method: 'delete',
    url: `/api/articles/${slug}/comments/${id}`
  })
}

// 发表文章
export const createArticle = (article) => {
  return request({
    method: 'post',
    url: `/api/articles`,
    data: {
      article
    }
  })
}

// 删除用户自己的文章
export const deleteArticle = (slug) => {
  return request({
    method: 'delete',
    url: `/api/articles/${slug}`
  })
}

// 更新用户已发表文章
export const updateArticle = (slug, article) =>{
  return request({
    method: 'put',
    url: `/api/articles/${slug}`,
    data: {
      article
    }
  })
}