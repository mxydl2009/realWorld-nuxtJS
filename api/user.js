import { request } from '@@/plugins/request'

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

// 用户关注另一个用户
export const follow = (username) => {
  return request({
    method: 'post',
    url: `/api/profiles/${username}/follow`
  })
}

// 用户取消关注另一个用户
export const unFollow = (username) => {
  return request({
    method: 'delete',
    url: `/api/profiles/${username}/follow`
  })
}

// 用户更新资料
export const updateUser = (user) => {
  return request({
    method: 'put',
    url: `/api/user`,
    data: {
      user
    }
  })
}