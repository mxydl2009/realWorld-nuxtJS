<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  
    <div class="container page">
      <div class="row">
  
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link exact class="nav-link" :class="{active: tab === 'your_feed'}" :to="{
                  name: 'home',
                  query: {
                    tab: 'your_feed'
                  }
                }">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link exact class="nav-link" :class="{
                  active: tab === 'global_feed'
                }" :to="{ name: 'home'}">Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link exact class="nav-link" :class="{active: tab === 'tag'}" :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag
                  }
                }">{{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>
  
          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{ 
                name: 'profile', 
                params: { 
                  username: article.author.username 
                }
              }">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link :to="{ 
                name: 'profile', 
                params: { 
                  username: article.author.username 
                }
              }">{{ article.author.username }}</nuxt-link>
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" 
                :class="{ active: article.favorited }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{
              name: 'article',
              params: {
                slug: article.slug
              }
            }" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <nav>
            <ul class="pagination">
              <li class="page-item" :class="{ active: page === item }"  v-for="item in totalPage" :key="item">
                <nuxt-link :to="{
                  name: 'home',
                  query: {
                    page: item,
                    tag,
                    tab
                  }
                }" class="page-link">{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
  
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
  
            <div class="tag-list">
              <template v-for="tag in tags">
                <nuxt-link :to="{
                  name: 'home',
                  query: {
                    tag,
                    tab: 'tag'
                  }
                }" class="tag-pill tag-default" v-if="tag" :key="tag">
                  {{ tag }}
                </nuxt-link>
              </template>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  
  </div>
</template>

<script>

// 导入的其他文件 例如：import moduleName from 'modulePath';
import { getArticles, getYourFeedArticles } from '@@/api/article'
import { getTags } from '@@/api/tag'
import removeZeroWidthChar from '@@/utils/removeZeroWidthChar'
import { mapState } from 'vuex'
import favoriteManipulate from '@@/utils/onFavorite'

export default {
  name: 'HomePage',
  // asyncData返回的对象会被自动与data函数返回的对象合并
  async asyncData ({ query, store }) {
    // 获取URL中的查询字符串page参数
    const page = Number.parseInt(query.page) || 1
    const limit = 10
    const tab = query.tab || 'global_feed'
    const tag = query.tag
    const loadArticles = tab === 'your_feed'? getYourFeedArticles: getArticles
    const [ articleRes, tagRes ] = await Promise.all([
      loadArticles({
        limit: limit,
        offset: (page - 1) * limit,
        tag: tag
      }),
      getTags()
    ])
    const { articles, articlesCount } = articleRes.data
    // 给article增加一个favoriteDisabled属性，用来表征点赞按钮是否被禁用
    // 因为在点赞后，如果网络不好的话，会导致点赞状态更新慢，用户以为没有点成功，会多点几次，造成状态混乱
    articles.forEach(article => article.favoriteDisabled = false)
    let { tags } = tagRes.data
    // tags返回的并不是数组，首先需要将其转换为数组，然后内部元素可能是8204这种零宽字符（隐藏字符，浏览器不打印这种字符）
    // 将隐藏字符过滤后返回
    tags = Array.from(tags).filter(tag => tag.charCodeAt(0) < 8203 || tag.charCodeAt(0) > 8207)
    // 将tags中包含零宽字符的元素去掉其中的零宽字符
    tags = tags.map(tag => removeZeroWidthChar(tag))
    // 去除重复元素
    tags = Array.from(new Set(tags))
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tag,
      tab
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  // import所引入的组件注册
  components: {

  },

  data() {
    return {

    };
  },

  // 计算属性
  computed: {
    totalPage () {
      // 总的页数，遍历总的页数得到所有页码
      return Math.ceil(this.articlesCount / this.limit)
    },
    ...mapState(['user'])
  },

  // 监控data中的数据变化
  watch: {

  },

  // 方法集合
  methods: {
    // 点赞和取消点赞
    onFavorite (article) {
      favoriteManipulate(article)
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
    const query = this.$route.query
    const page = Number.parseInt(query.page) || 1
    const limit = 10
    const tab = query.tab || 'global_feed'
    const tag = query.tag
    const loadArticles = tab === 'your_feed'? getYourFeedArticles: getArticles
    const [ articleRes, tagRes ] = await Promise.all([
      loadArticles({
        limit: limit,
        offset: (page - 1) * limit,
        tag: tag
      }),
      getTags()
    ])
    const { articles, articlesCount } = articleRes.data
    articles.forEach(article => article.favoriteDisabled = false)
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