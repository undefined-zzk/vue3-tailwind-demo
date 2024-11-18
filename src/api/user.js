import { request } from '@/utils/request'
import axios from 'axios'
let cancel
export const getUserListApi = () => {
  cancel && cancel()
  const CancelToken = axios.CancelToken
  return request({
    url: '/users',
    method: 'get',
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export const getIdsApi = (list) => {
  const controller = new AbortController()
  list.value.push(controller)
  return request({
    url: `/users/ids`,
    signal: controller.signal
  })
}