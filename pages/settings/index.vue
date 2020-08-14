<!-- 设置页面 -->
<template>
<div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form @submit="updateProfile">
          <fieldset>
              <fieldset class="form-group">
                <input v-model="profile.image" class="form-control" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="profile.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea v-model="profile.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="profile.email" class="form-control form-control-lg" type="email" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="profile.password" class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" :disabled="updating">
                Update Settings
              </button>
          </fieldset>
        </form>
        <hr>
        <button class="btn btn-outline-danger" @click="logout">
          Or click here to logout.
        </button>
      </div>

    </div>
  </div>
</div>
</template>

<script>

// 导入的其他文件 例如：import moduleName from 'modulePath';
import { mapState, mapActions, mapMutations } from 'vuex'
import { updateUser } from '@@/api/user'

export default {
    // 配置页面所需的middleware
  middleware: ['authenticated'],
  name: 'Settings',
  // import所引入的组件注册
  components: {

  },

  data() {
    return {
      profile: {
        image: '',
        username: '',
        bio:'',
        email: '',
        password: ''
      },
      updating: false
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
    ...mapActions(['updateUserState']),
    ...mapMutations(['cleanUser']),
    async updateProfile (event) {
      event.preventDefault()
      this.updating = true
      // 将this.profile中的空字段去除
      let user = {}
      Object.keys(this.profile).forEach(key => {
        if (this.profile[key] !== '') {
          user[key] = this.profile[key]
        }
      })
      await this.updateUserState(user)
      this.updating = false
      this.$router.push({
        name: 'profile',
        params: {
          username: this.user.username
        }
      })
    },
    // 退出登录: 1. vuex的user清空 2. cookie的user清空 3.转到主页
    logout () {
      this.cleanUser()
      this.$router.push({
        name: 'home'
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
  mounted() {
    // 获取vuex的user,解构赋值给profile
    Object.keys(this.profile).forEach(key => {
      if (this.user[key]) {
        this.profile[key] = this.user[key]
      }
    })
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