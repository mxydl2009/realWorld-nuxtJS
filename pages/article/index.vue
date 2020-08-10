<!-- 文章展示页面 -->
<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>How to build webapps that scale</h1>

        <article-meta :article="article" />

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12" v-html="article.body">
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
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
import { getArticle } from '@@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from '@@/pages/article/components/article-meta'
import ArticleComments from '@@/pages/article/components/article-comments'

export default {
  name: 'Article',
  async asyncData ({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    // 实例化一个MarkdownIt
    const md = new MarkdownIt()
    // 调用MarkdownIt.prototype.render方法，将Markdown语法转换为HTML语法
    article.body = md.render(article.body)
    return {
      article
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