// 基于axios封装的请求模块

import axios from 'axios'
const cookieparser = process.server? require('cookieparser'): undefined

const baseUrl = 'https://conduit.productionready.io/'

// 创建请求对象，避免使用同一个请求对象污染全局环境，只有SSR才需要这样处理
export const request = axios.create({
  baseURL: baseUrl,
  timeout: 1500,
  retry: 3,
  retryDelay: 1000
})
// request.defaults.retry = 3
// request.defaults.retryDelay = 1000

// console.dir(request.defaults)

// 通过插件机制，获取上下文context对象，从而拿到vuex的store
// 插件可以导出一个函数，这个函数必须作为default成员
export default ({ store, req }) => {
  let { user } = store.state
  // 服务端渲染时，插件先于nuxtServerInit执行，所以此时user为null,但客户端请求实际可能携带了cookie,包含了user
  // 所以需要进行解析
  if (!user) {
    // 判断cookie是否随请求一起发送过来
    // 由于插件会在服务端和客户端各运行一次，所以在客户端中不存在req属性，这里需要对req属性做一次判断
    if (req && req.header && req.headers.cookie) {
      // 解析cookie得到一个JavaScript对象，但对象的键对应的值仍然是一个JSON字符串，需要调用JSON.parse
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        // 将parsed.user解析为JavaScript对象，这里用try是为了避免parsed.user不存在的情况出错
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
        user = null
      }
    }
  }
  if (user && user.token) {
    // 请求拦截器,这里统一将请求带上Token用户身份标识
    request.interceptors.request.use(function (config) {
      // config：请求配置对象，包括请求的各种信息
      config.headers.Authorization = `Token ${user.token}`
      return config
    }, function (err) {
      // 请求在没有经过网络进程发出去就失败了，会调用这个函数，比如取消请求
      console.log('request fail: ', err)
      return Promise.rejecte(err)
    })
  }
  // 响应拦截器，针对请求会发生的各种错误
  request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function axiosRetryInterceptor(err) {
    // 保存原始请求的配置对象
    const config = err.config;
    console.dir(err)
    // 当配置对象不存在或retry属性不存在，则说明err.config不存在，则直接拒绝
    if(!config || !config.retry) return Promise.reject(err);
    
    // 添加__retryCount属性来记录重复发送请求的次数
    config.__retryCount = config.__retryCount || 0;
    
    // 判断是否超过了最大重复请求次数，如果是，则拒绝, 用来防止持续不断地重复请求导致栈溢出
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }
    
    // 增加重复请求次数记录器的数值
    config.__retryCount += 1;
    
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return request(config);
    });
})
}

