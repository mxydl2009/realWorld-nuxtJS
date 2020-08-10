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

### asyncData函数
数据预获取，将数据先获取到，然后渲染页面，这样可以获得SEO优化
在每个组件定义了asyncData函数后，会由nuxt自动调用asyncData函数来做预获取数据操作

### 查询字符串的更改不会引发视图的更新渲染
**默认情况下，查询字符串的参数值更改不是响应式的，不会引起视图的更新**
可以在组件选项对象中设置watchQuery属性来监听查询字符串中某些参数的变化，可以自动调用asyncData等函数
nuxt的热更新有时候会有问题，需要重新刷新浏览器才能看到效果

### 等零宽字符（隐藏字符）的处理
在后端返回的数据中，很多时候会在字符串中混入零宽字符，这些字符是隐藏的，浏览器不会对这些字符显示出来，但这些字符又是真实存在的
比如使用String.prototype.length属性就可以看到显示出来的字符数与length不一致
去除字符串中的零宽字符很重要，不然会导致各种问题出现

### 插件的使用
请求数据时想要带上用户token，但用户token在vuex的store中管理，请求模块并不能拿到这个数据。
如果在视图中通过上下文对象context拿时，又需要对每个API请求模块进行改造，让它们都接收相同的token参数，这无疑增加了重复的工作，不利于维护
通过使用axios的请求拦截器，将token在拦截器中配置到请求对象上，这样就不需要在每个请求API中接收这个相同的参数了，集中管理，利于维护
通过插件机制，将拦截器写在插件里，插件可以拿到上下文对象，从而可以获取到token

#### 插件机制
在运行vue.js应用程序之前，执行的代码
- 在根目录下创建plugins目录，所有的插件都集中在plugins目录管理
- 在插件文件（如这里的date.js）中，如果插件是一个函数，则使用默认导出，如果插件是一段代码，则会被执行

### 解析时间日期字符串的包day.js

### markdown-it包，文章正文内容支持Markdown语法，将Markdown语法转换为HTML语法输出

### 定制页面的<head>标签内容和<meta>标签内容，包括<title>标签内容，这样有利于优化SEO
- 针对特定页面的个性化定制，需要在页面组件中定义head() {} 方法来实现

## 构建与部署

### 构建
参考 https://zh.nuxtjs.org/guide/commands


## 问题记录

### 1. 当直接在浏览器地址栏输入 http://localhost:3000/?tab=your_feed 时，会发生未认证请求的错误，错误码401原因在于store中的user为null。store中有一个特殊的action叫nuxtServerInit函数用来将请求中携带的cookie转换并存储到store.state.user, 而在home/index.vue的asyncData中发送请求时，拦截器中的user却为null，也就是说，cookie到底是什么时候存储到state.user中的？
根据实践情况，顺序感觉应该像是: 服务端asyncData -> 服务端nuxtServerInit -> 客户端asyncData

### 2. 在文章详情页中，使用了v-html将article的body属性包含的Markdown语法转换为HTML语法并显示在页面，这里包含了潜在风险，但如何进行安全方面的处理？