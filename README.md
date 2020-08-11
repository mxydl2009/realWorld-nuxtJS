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

### 零宽字符（隐藏字符）的处理
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

### markdown-it包
文章正文内容支持Markdown语法，将Markdown语法转换为HTML语法输出

### 定制页面的<head>标签内容和<meta>标签内容，包括<title>标签内容，这样有利于优化SEO
- 针对特定页面的个性化定制，需要在页面组件中定义head() {} 方法来实现

## 构建与部署

### 构建
参考 https://zh.nuxtjs.org/guide/commands
- `nuxt build`命令，利用webpack编译应用，压缩文件, 将构建结果放在.nuxt目录和.nuxt/dist目录
- `nuxt start`命令，以生产模式启动一个web服务器（需要先执行`nuxt build`）
- `nuxt generate`命令，依据路由配置，生成静态HTML文件（纯静态渲染）

### 部署

#### 简单部署
- 配置服务端的host和port
  - 在nuxt.config.js中配置server字段, host和port分别默认是localhost和3000，需要根据实际情况修改
- 压缩发布包
  - .nuxt目录、static目录、nuxt.config.js文件、package.json和package-lock.json文件，这些目录和文件需要上传服务器，先进行gzip压缩
- 把发布包传到服务端
  - FTP
  - Git
  - Linux的SCP命令: `scp 当前压缩包路径 远程主机压缩包路径`，将当前的压缩包放到远程主机的某个路径
- 解压发布包
- 安装依赖
- 启动服务
  - 启动服务时，可以直接采用npm start的方式，但这种方式下，node进程占用了shell，导致shell无法关闭，也无法退出远程登录
  - 后台启动服务：
    - 采用 `nohup npm start &`的方式启动，然后可以exit命令退出登录状态
    - 使用pm2包来启动node后台服务，全局安装`npm install pm2 -g`，使用`pm2 start npm -- start`命令启动后台服务，使用`pm2 stop id`关闭服务（这里的id是pm2管理进程时生成的id，不是系统给进程分配的id）

##### pm2包管理node服务
pm2常用命令
- `pm2 list`：查看应用列表
- `pm2 start`：启动应用
- `pm2 stop`: 停止应用 
- `pm2 reload`: 重载应用, 重载和重启的区别在于，重载会保留至少一个进程激活的情况下，一个一个重启进程，kill原进程
- `pm2 restart`: 重启应用，先kill原有进程，再启动
- `pm2 delete`: 删除应用

#### 自动部署
CI/CD方式实现自动部署
<div>
  <img src="https://img-blog.csdnimg.cn/20200811104257624.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L214eWRsMjAwOQ==,size_16,color_FFFFFF,t_70" />
</div>

##### CI/CD服务
持续集成或持续服务，如GitHub有Actions等

##### GitHub Actions实现自动部署
前置条件：Linux服务器 + 上传GitHub
- 配置Github Access Token: 身份验证，用来使用GitHub API，操作GitHub仓库做CI
  - 生成：https://github.com/settings/tokens,
    - 选择generate new token, 在note中填写token名称(token名称有命名规则，最好不要有连字符)
    - 在select scopes中选择权限设置，这里勾选repo, 表示token的操作权限是仓库
  - 配置到项目的Settings/Secrets中: https://github.com/mxydl2009/realWorld-nuxtJS/settings/secrets
    - 点击new Secret
     - name填写token的name
     - value填写token的值
- 配置GitHub Actions执行脚本
  - 在项目根目录创建.github/workflows目录
  - workflows目录下创建main.yml, main.yml为Github Action的执行脚本
  - 在仓库的Secrets中创建new Secret，配置远程服务器的主机IP、用户登录名和密码以及登录用的端口号，这些信息每一个都需要配置一个secret
    - ssh连接登录服务默认端口号22
  - 修改PM2的配置文件pm2.config.json
  - 提交更新: 
    - 由于我们的main.yml使用tag来触发自动部署，所以提交的更新如果想触发自动部署，需要使用`git tag`给提交打标签，然后将标签提交到远程仓库`git push origin <tagname>`
    - 先将提交push到远端，然后给该提交打标签，并且将标签push到远端，这将会触发自动部署
  - 查看自动部署状态
    - 选择仓库的Actions选项卡查看
  - 访问网站
  - 提交更新

## 问题记录

### 1. 当直接在浏览器地址栏输入 http://localhost:3000/?tab=your_feed 时，会发生未认证请求的错误，错误码401原因在于store中的user为null。store中有一个特殊的action叫nuxtServerInit函数用来将请求中携带的cookie转换并存储到store.state.user, 而在home/index.vue的asyncData中发送请求时，拦截器中的user却为null，也就是说，cookie到底是什么时候存储到state.user中的？
根据实践情况，顺序感觉应该像是: 服务端asyncData -> 服务端nuxtServerInit -> 客户端asyncData

### 2. 在文章详情页中，使用了v-html将article的body属性包含的Markdown语法转换为HTML语法并显示在页面，这里包含了潜在风险，但如何进行安全方面的处理？

### 3. 在首页使用路由切换时，asyncData函数会被调用，而且虽然页面不会重新加载，但会有一个加载线条出现，这是什么原因？spa会出现这样的现象吗？