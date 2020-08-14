<!--  -->
<template>
  <div class="article-preview">
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
      }">
        {{ article.author.username }}
      </nuxt-link>
        <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{ active: article.favorited }"
        @click="$emit('favorite')" :disabled="btnDisabled">
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
      <ul class="tag-list">
        <li class="tag-default tag-pill tag-outline" v-for="tag in article.tagList" :key="tag">
          {{ tag }}
        </li>
    </ul>
    </nuxt-link>
  </div>
</template>

<script>

// 导入的其他文件 例如：import moduleName from 'modulePath';

export default {
  name: 'ArticleIntro',
  props: {
    article: {
      type: Object,
      required: true
    },
    btnDisabled: {
      type: Boolean
    }
  },
  // import所引入的组件注册
  components: {
    
  },

  data() {
    return {
      
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