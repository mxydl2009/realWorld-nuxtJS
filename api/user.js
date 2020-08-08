import request from '@@/utils/request'

// 用户登录的请求,传入请求体data，返回Promise
export const login = data => {
  // 登录时表单提交
  return request({
    method: 'post',
    url: '/api/users/login',
    data
  })
}

// 用户注册的请求, 传入请求体data，返回Promise
export const register = data => {
  // 注册时表单提交
  return request({
    method: 'post',
    url: '/api/users',
    data
  })
}