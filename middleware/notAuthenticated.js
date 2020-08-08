// 当用户已经登录后，访问该页面时直接跳转到首页，这是为了阻止用户在登录状态下继续访问登录注册页面
export default function({ store, redirect }) {
  if (store.state.user) {
    return redirect('/')
  }
}