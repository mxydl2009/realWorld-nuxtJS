<!--  -->
<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }" class="comment-author">
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
        <span class="mod-options" v-if="comment.author.username === user.username">
          <i class="ion-edit"></i>
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>

  </div>
</template>

<script>

// 导入的其他文件 例如：import moduleName from 'modulePath';
import { getArticleComments } from '@@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  // import所引入的组件注册
  components: {
    
  },
  // comments不需要SEO优化，所以在客户端，挂载到DOM时加载comments
  async mounted () {
    const { data } = await getArticleComments(this.article.slug)
    this.comments = data.comments
  },

  data() {
    return {
      comments: []
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