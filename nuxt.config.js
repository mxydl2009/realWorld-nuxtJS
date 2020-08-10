// nuxt.config.js配置nuxt
module.exports = {
  router: {
    // 自定义路由表
    linkActiveClass: 'active',
    extendRoutes (routes, resolve) {
      // 清除基于pages默认生成的路由表
      routes.splice(0)
      // 自定义路由表
      routes.push(...[
        {
          // 自定义路由表，就不再使用原来的以文件路径为基础的约定式路由
          // 以布局组件为父路由，以其他组件作为子路由，这样其他组件就可以使用布局组件了
          path: '/',
          component: resolve(__dirname, 'pages/layouts/'),
          children: [
            {
              path: '',
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              path: '/editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            }
          ]
        }
      ])
    }
  },
  plugins: ['@@/plugins/request', '@@/plugins/date']
}