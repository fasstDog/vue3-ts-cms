import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import {ISystemState} from './types'

import { deletePageData, getPageListData,createPageData,editPageData } from '@/service/main/system/system'



const systemModule:Module<ISystemState,IRootState> = {
  namespaced:true,
  state(){
    return{
      usersList:[],
      usersCount:0,
      roleList:[],
      roleCount:0,
      goodsList:[],
      goodsCount:0,
      menuList:[],
      menuCount:0,
      departmentList: [],
      departmentCount:0,
      categoryList:[],
      categoryCount:0
    }
  },
  mutations:{
    changeUsersList(state,userList:any[]){
      state.usersList = userList
    },
    changeUsersCount(state,usersCount:number){
      state.usersCount = usersCount
    },
    changeRoleList(state,roleList:any[]){
      state.roleList = roleList
    },
    changeRoleCount(state,roleCount:number){
      state.roleCount = roleCount
    },
    changeGoodsList(state,goodsList:any[]){
      state.goodsList = goodsList
    },
    changeGoodsCount(state,goodsCount:number){
      state.goodsCount = goodsCount
    },
    changeMenuList(state,menuList:any[]){
      state.menuList = menuList
    },
    changeMenuCount(state,menuCount:number){
      state.menuCount = menuCount
    },
    changeDepartmentList(state, departmentList: any[]) {
      state.departmentList = departmentList
    },
    changeDepartmentCount(state, departmentCount:number) {
      state.departmentCount = departmentCount
    },
    changeCategoryList(state, categoryList: any[]) {
      state.categoryList = categoryList
    },
    changeCategoryCount(state, categoryCount:number) {
      state.categoryCount = categoryCount
    },

  },
  getters:{
    pageListData(state){
      return (pageName:string)=>{
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state){
      return (pageName:string)=>{
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions:{
    async getPageListAction({commit},payload:any ){
      // 1.获取pageUrl
      const pageName = payload.pageName

      const pageUrl = `/${pageName}/list`

      const changePageName = (pageName.slice(0,1)as string).toUpperCase()+pageName.slice(1)

      // 2.发送user页面网络请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      // 3.将数据存储到state中

      const { list, totalCount } = pageResult.data
      commit(`change${changePageName}List`,list)
      commit(`change${changePageName}Count`,totalCount)
    // switch (pageName) {
    //     case 'users':
    //       commit(`changeUserList`, list)
    //       commit(`changeUserCount`, totalCount)
    //       break
    //     case 'role':
    //       commit(`changeRoleList`, list)
    //       commit(`changeRoleCount`, totalCount)
    //       break
    //   }

    },

    async deletePageDataAction({dispatch},payload){
      const {pageName,id} = payload
      const pageUrl = `/${pageName}/${id}`

      // 2.发送删除网络请求
      await deletePageData(pageUrl)

      // 3.重新请求页面数据
      dispatch('getPageListAction',{
        pageName,
        queryInfo:{
          offset:0,
          size:10
        }
      })
    },

    // 创建的逻辑
    async createPageDataAction({dispatch},payload:any){
      // 1创建数据的请求，
      const { pageName,newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl,newData)
      // 2.重新请求页面
      dispatch('getPageListAction',{
        pageName,
        queryInfo:{
          offset:0,
          size:10
        }
      })
    },
    // 修改的逻辑
    async editPageDataAction({dispatch},payload:any){
      const {pageName,editData,id} = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl,editData)
      dispatch('getPageListAction',{
        pageName,
        queryInfo:{
          offset:0,
          size:10
        }
      })
    }
  }
}

export default systemModule
