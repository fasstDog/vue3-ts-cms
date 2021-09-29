import axios from "axios"
import type {AxiosInstance} from 'axios'
import type {FTRequestInterceptors,FTRequsetConfig} from './types'

import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEAFULT_LOADING = true

class FtRequest {
  instance:AxiosInstance
  interceptors?:FTRequestInterceptors
  showLoadding:boolean
  // 保存loading，才能取消
  loading?:ILoadingInstance


  constructor(config:FTRequsetConfig){
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.interceptors = config.interceptors
    this.showLoadding = config.showLoadding ?? DEAFULT_LOADING

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有的实例都有的拦截器（全局拦截器）
    this.instance.interceptors.request.use((config)=>{
      // console.log('请求拦截成功all');
      if(this.showLoadding){
        this.loading=ElLoading.service({
          lock:DEAFULT_LOADING,
          text:'加载中.....',
          background:'rgba(0,0,0,0.5)'
        })
      }

      return config
    },(err)=>{
      // console.log('请求拦截失败all');
      return err
    })
    this.instance.interceptors.response.use((res)=>{

        // 移除loading
      this.loading?.close()


      // console.log('响应拦截成功all');
      const data = res.data;
      if(data.returnCode === '-1001'){
        console.log('请求失败');
      }else{
        return data
      }
      // 取出返回对象中的data
    },(err)=>{
      // console.log('响应拦截失败all');
      if(err.response.status===404){
        console.log('404错误');
      }
            // 移除loading
            this.loading?.close()
      return err
    })
  }

  request<T = any>(config:FTRequsetConfig<T>): Promise<T>{
    return new Promise((resolve,reject)=>{
      if(config.interceptors?.requestInterceptor){
        config = config.interceptors.requestInterceptor(config)
      }

      if(config.showLoadding ===false){
        this.showLoadding = config.showLoadding
      }

      this.instance.request<any,T>(config).then((res)=>{
        if(config.interceptors?.responseInterceptor){
          res = config.interceptors.responseInterceptor(res)
        }
        // console.log(res);

        // 每次请求玩，设置为true
        this.showLoadding = DEAFULT_LOADING

        resolve(res)
      }).catch((err)=>{
        // 每次请求完，设置为true,否则会影响下一次加载动画
        this.showLoadding = DEAFULT_LOADING
        reject(err)
        return err
      })
    })
  }

  get<T = any>(config:FTRequsetConfig<T>):Promise<T> {
    return this.request<T>({...config,method:"GET"})
  }
  post<T = any>(config:FTRequsetConfig<T>):Promise<T> {
    return this.request<T>({...config,method:"POST"})
  }
  delete<T = any>(config:FTRequsetConfig<T>):Promise<T> {
    return this.request<T>({...config,method:"DELETE"})
  }
  patch<T = any>(config:FTRequsetConfig<T>):Promise<T> {
    return this.request<T>({...config,method:"PATCH"})
  }
}

export default FtRequest
