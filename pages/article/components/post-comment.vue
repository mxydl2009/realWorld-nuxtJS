<!--  -->
<template>
  <form class="card comment-form" @submit="postComment">
    <div class="card-block">
      <textarea v-model="comment" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
    </div>
    <div class="card-footer">
      <img :src="user.image" class="comment-author-img" />
      <button class="btn btn-sm btn-primary">
        Post Comment
      </button>
    </div>
  </form>
</template>

<script>

// 导入的其他文件 例如：import moduleName from 'modulePath';
import { postArticleComment } from '@@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'PostComment',
  
  props: {
    slug: {
      type: String,
      required: true
    },
    body: {
      type: String
    }
  },

  data() {
    return {
      comment: this.body || ''
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
    async postComment () {
      const comment = await postArticleComment(this.slug, this.comment)
      this.comment = ''
      this.$emit('postComment', comment)
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