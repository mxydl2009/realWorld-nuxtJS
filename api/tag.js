// 获取Tags列表的接口
import { request } from '@@/plugins/request'

export const getTags = () => {
  return request({
    method: 'get',
    url: '/api/tags'
  })
}