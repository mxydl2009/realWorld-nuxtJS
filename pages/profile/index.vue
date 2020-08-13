<!-- 个人资料页面 -->
<template>
<div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="user.image" class="user-img" />
          <h4>{{ user.username }}</h4>
          <p>
            {{ user.bio }}
          </p>
          <nuxt-link class="btn btn-sm btn-outline-secondary action-btn"
            :to="{
              name: 'settings'
            }"
          >
            <i class="ion-gear-a"></i>
            Edit Profile Settings
          </nuxt-link>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="{
                path: `/profile/${user.username}`
              }"
              exact 
              >My Articles
            </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="{
                path: `/profile/${user.username}`,
                query: {
                  favorites: 'favorites'
                }
              }"
              exact
              >Favorited Articles</nuxt-link>
            </li>
          </ul>
        </div>

          <article-intro v-for="article in articles" :article="article" :key="article.slug" 
          @favorite="onFavorite(article)" :btnDisabled="article.favoriteDisabled" />
        
      </div>

    </div>
  </div>

</div>
</template>

<script>

// 导入的其他文件 例如：import moduleName from 'modulePath';
import { mapState } from 'vuex'
import { getArticles, addFavorite, deleteFavorite } from '@@/api/article'
import ArticleIntro from '@@/pages/profile/components/article-intro'

export default {
    // 配置页面所需的middleware
  middleware: ['authenticated'],
  name: 'Profile',
  async asyncData ({ store, query }) {
    const page = Number.parseInt(query.page) || 1
    const limit = 10
    const username = store.state.user.username
    const params = {
      limit,
      offset: (page - 1) * limit
    }
    if (query.favorites === 'favorites') {
      params.favorited = username
    } else {
      params.author = username
    }
    const { data } = await getArticles(params)
    const articles = data.articles
    articles.forEach(article => article.favoriteDisabled = false)
    return {
      articles
    }
  },
  watchQuery: ['favorites'],
  // import所引入的组件注册
  components: {
    ArticleIntro
  },

  data() {
    return {

    };
  },

  // 计算属性
  computed: {
    ...mapState(['user'])
  },

  // 监控data中的数据变化
  watch: {

  },

  // 方法集合
  methods: {
    async onFavorite (article) {
      // 点赞请求开始前，让按钮禁用
      article.favoriteDisabled = true
      if (article.favorited) {
        const { data } = await deleteFavorite(article.slug)
        article.favorited = data.article.favorited
        article.favoritesCount = data.article.favoritesCount
      } else {
        const { data } = await addFavorite(article.slug)
        article.favorited = data.article.favorited
        article.favoritesCount = data.article.favoritesCount
      }
      // 请求结束后，回复按钮
      article.favoriteDisabled = false
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
  async mounted() {
    const page = Number.parseInt(this.$route.query.page) || 1
    const limit = 10
    const username = this.user.username
    const params = {
      limit,
      offset: (page - 1) * limit
    }
    if (this.$route.query.favorites === 'favorites') {
      params.favorited = username
    } else {
      params.author = username
    }
    const { data } = await getArticles(params)
    const articles = data.articles
    this.articles = articles
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