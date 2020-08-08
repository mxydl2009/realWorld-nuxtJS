<!-- 个人资料页面 -->
<template>
<div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img src="http://i.imgur.com/Qr71crq.jpg" class="user-img" />
          <h4>Eric Simons</h4>
          <p>
            Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games
          </p>
          <button class="btn btn-sm btn-outline-secondary action-btn">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow Eric Simons 
          </button>
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
              <a class="nav-link active" href="">My Articles</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">Favorited Articles</a>
            </li>
          </ul>
        </div>

        <div class="article-preview">
          <div class="article-meta">
            <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
            <div class="info">
              <a href="" class="author">Eric Simons</a>
              <span class="date">January 20th</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> 29
            </button>
          </div>
          <a href="" class="preview-link">
            <h1>How to build webapps that scale</h1>
            <p>This is the description for the post.</p>
            <span>Read more...</span>
          </a>
        </div>

        <div class="article-preview">
          <div class="article-meta">
            <a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
            <div class="info">
              <a href="" class="author">Albert Pai</a>
              <span class="date">January 20th</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> 32
            </button>
          </div>
          <a href="" class="preview-link">
            <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
            <p>This is the description for the post.</p>
            <span>Read more...</span>
            <ul class="tag-list">
              <li class="tag-default tag-pill tag-outline">Music</li>
              <li class="tag-default tag-pill tag-outline">Song</li>
            </ul>
          </a>
        </div>


      </div>

    </div>
  </div>

</div>
</template>

<script>

// 导入的其他文件 例如：import moduleName from 'modulePath';

export default {
    // 配置页面所需的middleware
  middleware: ['authenticated'],
  name: 'Profile',
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