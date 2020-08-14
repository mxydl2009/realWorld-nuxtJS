<!-- 编辑文章页面 -->
<template>
<div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form @submit="onSubmit">
          <fieldset>
            <fieldset class="form-group">
                <input required v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
            </fieldset>
            <fieldset class="form-group">
                <input required v-model="article.description" type="text" class="form-control" placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
                <textarea required v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input v-model="article.tags" type="text" class="form-control" placeholder="Enter tags, please split the tags with comma"><div class="tag-list"></div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" type="submit" :disabled="publishing" >
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>

// 导入的其他文件 例如：import moduleName from 'modulePath';
import { getArticle, createArticle, updateArticle } from '@@/api/article'

export default {
  // 配置页面所需的middleware
  middleware: ['authenticated'],
  name: 'Editor',
  // import所引入的组件注册
  components: {

  },

  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tags: ''
      },
      publishing: false,
      create: true
    };
  },

  // 计算属性
  computed: {

  },

  // 监控data中的数据变化
  watch: {

  },

  // 方法集合
  methods: {
    onSubmit (event) {
      event.preventDefault()
      this.create === true? this.publishArticle(): this.updateTheArticle()
    },
    async publishArticle () {
      this.publishing = true
      // 先对article属性进行整理
      let tags = this.article.tags
      let tagList = []
      if (tags !== '') {
        tagList = tags.split(',').map(tag => tag.trim())
      }
      let article = {}
      // 初始化article
      Object.keys(this.article).forEach(key => {
        if (key === 'tags') {
          article['tagList'] = tagList
        } else {
          article[key] = this.article[key]
        }
      })
      const { data } = await createArticle(article)
      this.publishing = false
      this.$router.push({
        name: 'article',
        params: {
          slug: data.article.slug
        }
      })
    },
    async updateTheArticle () {
      this.publishing = true
      const { data } = await updateArticle(this.$route.params.slug, this.article)
      this.publishing = false
      const newArticle = data.article
      this.$router.push({
        name: 'article',
        params: {
          slug: newArticle.slug
        }
      })
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
    if (this.$route.params.slug) {
      const { data } = await getArticle(this.$route.params.slug)
      const article = data.article
      console.log(article)
      Object.keys(this.article).forEach(key => {
        if (article[key]) {
          this.article[key] = article[key]
        }
      })
      this.create = false
    }
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