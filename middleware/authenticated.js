// 路由拦截器，验证是否登录
// 需要做验证之后再显示的页面，需要导入该中间件
export default function ({ store, redirect }) {
  // 如果没有登录信息，则重定向到登录页面
  if (!store.state.user) {
    return redirect('/login')
  }
}