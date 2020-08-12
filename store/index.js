// 加载服务端渲染时，解析cookie的包
const cookieparser = process.server? require('cookieparser'): undefined
const Cookie = process.client? require('js-cookie'): undefined
import { updateUser } from '@@/api/user'

// 服务端渲染期间运行都是同一个实例
// state必须是一个函数，为了防止多个请求共享同一份数据导致的数据冲突
export const state = () => {
  return {
    // 存储当前登录用户的状态数据
    user: null
  }
}

export const mutations = {
  // 修改用户状态
  setUser (state, payload) {
    state.user = payload
  },
  updateUserInfo (state, payload) {
    state.user = Object.assign({}, state.user, payload)
    if (Cookie) {
      // 客户端执行操作cookie代码
      Cookie.set('user', state.user)
    }
  },
  // 清空user数据
  cleanUser (state) {
    state.user = null
    Cookie.remove('user')
  }
}

export const actions = {
  // nuxtServerInit是一个特殊的action方法，仅仅会在服务端渲染期间自动调用
  // 初始化vuex的数据以及传递数据给客户端使用
  nuxtServerInit ({ commit }, { req }) {
    let user = null
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
    commit('setUser', user)
  },
  async updateUserState ({ commit }, payload) {
    const { data } = await updateUser(payload)
    commit('updateUserInfo', data.user)
    return data.user
  }
}