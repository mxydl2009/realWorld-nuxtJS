# realWorld-nuxtJS

## 对项目结构的说明

### app.html
项目自定义的模板文件

### nuxt.config.js
nuxt的配置文件，自定义了路由规则表

### pages
存放页面的文件夹，其中layouts文件夹存放作为所有页面都需要的布局组件，这里没有使用nuxt默认的约定式路由，而是自定义了路由

### utils
管理工具方法
#### request.js文件
封装axios模块作为项目的请求工具方法

### api文件夹
集中管理API请求，方便维护与重用API请求

### store文件夹：nuxt已经集成了vuex
nuxt会自动加载store中的模块
在store/index.js中直接定义state、actions、mutations、getters等，导出这些变量，nuxt会根据这些导出项自动创建store实例
state需要定义为一个函数，为不同的请求生成一份state对象

### middleware文件夹
放置路由中间件的文件夹，文件名就是中间件的名称

## 项目说明

### 表单验证
使用了简单的HTML5表单验证字段

### 登录状态存储，使用JWT方案

服务端渲染模式下，不仅仅要能在客户端拿到状态数据，也需要在服务端拿到状态数据（比如，用户关闭应用后，又马上打开时，不能再要求用户登录），使用了JWT方案实行。

- 服务端传给客户端的accessToken一方面要存储到本地存储中（如vuex或localStorage），另一方面也要存储到cookie中（cookie中的数据可以供服务端和客户端共享）
- 使用js-cookie包进行客户端的cookie操作

### 路由中间件
运行在一个页面或一组页面渲染之前的自定义函数
**服务端路由守卫**，可以对路由导航到的页面渲染之前进行拦截，比如针对需要权限的页面，需要在导航到该页面时拦截，验证是否有权限。
因为在同构渲染中，首次渲染时，无法使用客户端路由守卫进行拦截操作。
- 在需要中间件的页面中，注册中间件
  ```
  export default {
    // 配置页面所需的middleware, 这里注册了authenticated中间件
    middleware: ['authenticated'],
    // import所引入的组件注册
    components: {

    },
  }
  ```