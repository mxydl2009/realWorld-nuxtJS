// 基于axios封装的请求模块

import axios from 'axios'
const cookieparser = process.server? require('cookieparser'): undefined

const baseUrl = 'https://conduit.productionready.io/'

// 创建请求对象，避免使用同一个请求对象污染全局环境，只有SSR才需要这样处理
export const request = axios.create({
  baseURL: baseUrl
})

// 通过插件机制，获取上下文context对象，从而拿到vuex的store
// 插件可以导出一个函数，这个函数必须作为default成员
export default ({ store, req }) => {
  let { user } = store.state
  // 服务端渲染时，插件先于nuxtServerInit执行，所以此时user为null,但客户端请求实际可能携带了cookie,包含了user
  // 所以需要进行解析
  if (!user) {
    // 判断cookie是否随请求一起发送过来
    if (req.headers.cookie) {
      // 解析cookie得到一个JavaScript对象，但对象的键对应的值仍然是一个JSON字符串，需要调用JSON.parse
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        // 将parsed.user解析为JavaScript对象，这里用try是为了避免parsed.user不存在的情况出错
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
  }
  if (user && user.token) {
    // 请求拦截器,这里统一将请求带上Token用户身份标识
    request.interceptors.request.use(function (config) {
      if (user && user.token) {
        // config：请求配置对象，包括请求的各种信息
        config.headers.Authorization = `Token ${user.token}`
      }
      return config
    }, function (err) {
      // 请求在没有经过网络进程发出去就失败了，会调用这个函数，比如取消请求
      return Promise.rejecte(err)
    })
  }
}

