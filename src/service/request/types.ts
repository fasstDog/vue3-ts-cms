import type {AxiosRequestConfig,AxiosResponse} from 'axios'



export interface FTRequestInterceptors<T=AxiosResponse> {
  requestInterceptor?:(config:AxiosRequestConfig) =>AxiosRequestConfig
  requestInterceptorCatch?:(error:any) => any

  responseInterceptor?:(res:T) =>T
  responseInterceptorCatch?:(error:any) => any
}

export interface FTRequsetConfig<T=AxiosResponse> extends AxiosRequestConfig {
  interceptors?:FTRequestInterceptors<T>
  showLoadding?:boolean
}

