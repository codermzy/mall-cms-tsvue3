// service统一出口
import ZyRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/cache'
const zyRequest = new ZyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors(config) {
      // 携带 token的拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch(err) {
      return err
    },
    responseInterceptors(config) {
      return config
    },
    responseInterceptorsCatch(err) {
      return err
    }
  }
})

export default zyRequest
