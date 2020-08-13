<!--  -->
<template>
<div class=''>
  <!-- 顶部导航栏 -->
  <nav class="navbar navbar-light">
    <div class="container">
      <!-- <a class="navbar-brand" href="index.html">conduit</a> -->
      <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <!-- <a class="nav-link active" href="">Home</a> -->
          <nuxt-link exact class="nav-link" to="/">Home</nuxt-link>
        </li>
        <template v-if="user">
          <li class="nav-item">
          <nuxt-link class="nav-link" to="/editor/">
            <i class="ion-compose"></i>&nbsp;New Post
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/settings/">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="{
              name: 'profile',
              params: {
                username: user.username
              }
            }">
              <img :src="user.image" alt="" class="user-pic">
              {{ user.username }}
            </nuxt-link>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
          </li>
        </template>
        
      </ul>
    </div>
  </nav>
  <!-- 顶部导航栏 -->
  <!-- 子路由 -->
  <nuxt-child />
  <!-- 子路由 -->
  <!-- 底部 -->
  <footer>
    <div class="container">
      <a href="/" class="logo-font">conduit</a>
      <span class="attribution">
        An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
      </span>
    </div>
  </footer>
  <!-- 底部 -->
</div>
</template>

<script>

// 导入的其他文件 例如：import moduleName from 'modulePath';
import { mapState } from 'vuex'

export default {
name: '',
// import所引入的组件注册
components: {

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