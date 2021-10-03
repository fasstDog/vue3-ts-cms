import { Module } from "vuex";

import localCache from '@/utils/cache'
import {mapMenusToPermissions, mapMenusToRoutes} from '@/utils/map-menus'

import {
        accountLoginRequest,
        requestUserInfoById,
        requestUserMenusBuRoleId,
} from "@/service/login/login";
import router from "@/router";

import { IAccount, } from "@/service/login/types";
import { ILoginState } from './types'
import { IRootState } from "../types";

const loginModule:Module<ILoginState,IRootState> = {
  namespaced:true,
  state (){
    return {
      token:'',
      userInfo:{},
      userMenus:[],
      permission:[]
    }
  },
  getters:{},
  mutations:{
    changeToken(state,token:string) {
      state.token = token
    },
    changeUserInfo(state,userInfo:any){
      state.userInfo = userInfo
    },
    changeUserMenus(state,userMenus:any){
      state.userMenus = userMenus
      // userMenus => routes 将菜单列表映射到routes中
      const routes = mapMenusToRoutes(userMenus)

      // 将routes添加到main.children中
      routes.forEach((route)=>{
        router.addRoute('main',route)
      })

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permission = permissions
    },

  },
  actions:{
    async accountLoginAction({commit,dispatch},payload:IAccount){
      // 1.实现登录
      const LoginResult = await accountLoginRequest(payload)
      const {id,token} = LoginResult.data
      commit('changeToken',token)
      localCache.setCache('token',token)
      // 登录成功
      // 发送初始化请求（完整的role/deparment列表）
      dispatch('getInitalDataAction',null,{root:true})
      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo',userInfo)
      localCache.setCache('userInfo',userInfo)

      // 3.请求首页菜单信息（请求角色菜单数）
      const userMenusResult = await requestUserMenusBuRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus',userMenus)
      localCache.setCache('userMenus',userMenus)

      // 跳转到首页
      router.push('/main')
    },
    loadLocalLogin({commit,dispatch}){
      const token = localCache.getCache('token')
      if(token) {
        commit('changeToken',token)
        dispatch('getInitalDataAction',null,{root:true})
      }
      const userInfo = localCache.getCache('userInfo')
      if(userInfo){
        commit('changeUserInfo',userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if(userMenus){
        commit('changeUserMenus',userMenus)
      }
    }
  },

}

export default loginModule
