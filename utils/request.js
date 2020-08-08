// 基于axios封装的请求模块

import axios from 'axios'

const baseUrl = 'https://conduit.productionready.io/'

// 创建请求对象，避免使用同一个请求对象污染全局环境，只有SSR才需要这样处理
const request = axios.create({
  baseURL: baseUrl
})

// 请求拦截器
// 响应拦截器
export default request