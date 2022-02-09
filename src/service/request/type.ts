import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ZYRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (error: any) => any
}
export interface ZYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZYRequestInterceptors<T>
  showLoading?: boolean
}
