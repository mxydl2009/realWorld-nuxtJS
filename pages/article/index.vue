<!-- 文章展示页面 -->
<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>How to build webapps that scale</h1>

        <article-meta :article="article" @favorite="onFavorite(article)" @follow="onFollow(article.author)"
          :articleDisabled="article.favoriteDisabled" :followDisabled="article.author.followDisabled" />

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12" v-html="article.body">
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" @favorite="onFavorite(article)" @follow="onFollow(article.author)"
          :articleDisabled="article.favoriteDisabled" :followDisabled="article.author.followDisabled" />
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" />
        </div>

      </div>

    </div>

  </div>
</template>

<script>

// 导入的其他文件 例如：import moduleName from 'modulePath';
import { getArticle, addFavorite, deleteFavorite } from '@@/api/article'
import { follow, unFollow } from '@@/api/user'
import MarkdownIt from 'markdown-it'
import ArticleMeta from '@@/pages/article/components/article-meta'
import ArticleComments from '@@/pages/article/components/article-comments'

export default {
  name: 'Article',
  async asyncData ({ params, store }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    // 实例化一个MarkdownIt
    const md = new MarkdownIt()
    // 调用MarkdownIt.prototype.render方法，将Markdown语法转换为HTML语法
    article.body = md.render(article.body)
    article.favoriteDisabled = false
    article.author.followDisabled = false
    return {
      article,
      articlePage: true
    }
  },
  // import所引入的组件注册
  components: {
    ArticleMeta,
    ArticleComments
  },

  data() {
    return {
    };
  },
  head () {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]  
    }
  },

  // 计算属性
  computed: {

  },

  // 监控data中的数据变化
  watch: {

  },

  // 方法集合
  methods: {
    // 点赞和取消点赞
    async onFavorite (article) {
      // 点赞请求开始前，让按钮禁用
      article.favoriteDisabled = true
      if (article.favorited) {
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      // 请求结束后，回复按钮
      article.favoriteDisabled = false
    },
    // 关注和取消关注
    async onFollow (author) {
      // 点赞请求开始前，让按钮禁用
      author.followDisabled = true
      if (author.following) {
        await unFollow(author.username)
        author.following = false
        // author.following -= 1
      } else {
        await follow(author.username)
        author.following = true
        // article.favoritesCount += 1
      }
      // 请求结束后，回复按钮
      author.followDisabled = false
    }
  },

  // 生命周期 - 组件实例刚被创建
  beforeCreate() { 

  },
  //创建完成 访问当前this实例
  created() {

  },
  // 挂载之前
  beforeMount() { 

  },
  // 挂载完成 访问DOM元素
  mounted() {

  },
  // 更新之前
  beforeUpdate() { 

  },
  // 更新之后
  updated() { 

  },
  // for keep-alive 缓存功能，组件被激活时调用
  activated() {

  },
  // for keep-alive 组件被移除时调用
  deactivated() {

  },
  // 组件销毁之前调用
  beforeDestroy() {

  },
  // 组件销毁之后调用
  destroyed() {

  },
}
</script>
<style>
/* @import url(); 引入公共css类 */

</style>