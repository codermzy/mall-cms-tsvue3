import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { ZYRequestConfig, ZYRequestInterceptors } from './type'

import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEFAULT_LOADING = true
class ZYRequest {
  instance: AxiosInstance
  interceptors?: ZYRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: ZYRequestConfig<any>) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1. 从config中取出的拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    // 2.添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移出
        this.loading?.close()
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败,错误信息')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有响应失败拦截')

        // 将loading移出
        this.loading?.close()

        if (err.response.status === 404) {
          console.log('404错误~')
        }
        return err
      }
    )
  }

  request<T>(config: ZYRequestConfig<T>): Promise<T> {
    return new Promise((resolve) => {
      // 1. 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }

      // 2. 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1. 单个请求对数据的处理
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }

          // 2. 将showLoading设置true，这样不会影响下一次请求
          this.showLoading = DEFAULT_LOADING

          // 3. 将结果通过resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true，这样不会影响下一次请求
          this.showLoading = DEFAULT_LOADING
          return err
        })
    })
  }
  get<T>(config: ZYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: ZYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config: ZYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config: ZYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default ZYRequest
