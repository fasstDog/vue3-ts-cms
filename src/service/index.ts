// service 统一出口

import FtRequest from "./request"
import { BASE_URL,TIME_OUT } from './request//config'
import localCache from '@/utils/cache'


const ftRequset = new FtRequest({
  baseURL:BASE_URL,
  timeout:TIME_OUT,
  interceptors:{
    requestInterceptor:(config)=>{
      let token = localCache.getCache('token')
      if(token){
        // 把token放到请求头里
        config.headers.Authorization = `Bearer ${token}`
      }else{

      }
      // console.log('请求成功拦截');
      return config
    },
    requestInterceptorCatch:(err)=>{
      // console.log('请求失败拦截');
      return err
    },
    responseInterceptor:(config)=>{
      // console.log('响应成功拦截');
      return config
    },
    responseInterceptorCatch:(err)=>{
      // console.log('请求失败拦截');
      return err
    }
  }
})

export default ftRequset
