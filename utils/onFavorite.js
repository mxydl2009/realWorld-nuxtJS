import { addFavorite, deleteFavorite } from '@@/api/article'

export default async function (article) {
  // 点赞请求开始前，让按钮禁用
  article.favoriteDisabled = true
  if (article.favorited) {
    const { data } = await deleteFavorite(article.slug)
    article.favorited = false
    article.favoritesCount -= 1
  } else {
    const { data } = await addFavorite(article.slug)
    article.favorited = true
    article.favoritesCount += 1
  }
  // 请求结束后，回复按钮
  article.favoriteDisabled = false
}