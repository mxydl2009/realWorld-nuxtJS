<!--  -->
<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
  
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin? 'Sign in': 'Sign up'}}</h1>
          <p class="text-xs-center">
            <nuxt-link to="/register" v-if="isLogin">Need an account?</nuxt-link>
            <nuxt-link to="/login" v-else>Have an account?</nuxt-link>
          </p>
  
          <ul class="error-messages">
            <template v-for="(messages, errorType) in errors">
              <li v-for="message in messages" :key="errorType + message">{{ errorType }} {{ message }}</li>
            </template>
          </ul>
  
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
            </fieldset>
            <fieldset class="form-group">
              <input required v-model="user.email" class="form-control form-control-lg" type="email" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input required minlength="8" v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin? 'Sign in': 'Sign up'}}
            </button>
          </form>
        </div>
  
      </div>
    </div>
  </div>
</template>

<script>

// 导入的其他文件 例如：import moduleName from 'modulePath';
// 只在客户端才加载js-cookie包， process.client是nuxt提供的属性，表示process的运行环境
const Cookie = process.client? require('js-cookie'): undefined
import { login, register } from '@@/api/user'

export default {
  middleware: ['notAuthenticated'],
  name: 'LoginPage',
  // import所引入的组件注册
  components: {

  },

  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {

      }
    };
  },

  // 计算属性
  computed: {
    // 用于判断当前页面是login还是register，通过路由名字确定
    isLogin () {
      return this.$route.name === 'login'
    }
  },

  // 监控data中的数据变化
  watch: {

  },

  // 方法集合
  methods: {
    async onSubmit () {
      try {
        const { data } = this.isLogin? await login({
          user: {
            email: this.user.email,
            password: this.user.password
          }
        }): await register({
          user: this.user
        })
        // 保存登录状态,存入vuex和cookie中
        this.$store.commit('setUser', data.user)
        // 保存到cookie中
        Cookie.set('user', data.user)
        // 跳转到首页
        this.$router.push({
          name: 'home'
        })
      } catch (error) {
        this.errors = error.response.data.errors
      }
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