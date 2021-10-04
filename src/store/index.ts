import { createStore,Store,useStore as useVuexStore } from 'vuex'
import { IRootState,IStoreType } from './types'

import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'

import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      entireDepartment:[],
      entireRole:[],
      entireMeun:[],

    }
  },
  getters:{},
  mutations:{
    changeEntirDepartment(state,list){
      state.entireDepartment = list
    },
    changeEntirRole(state,list){
      state.entireRole = list
    },
    changeEntirMenu(state,list){
      state.entireMeun = list
    }
  },
  actions:{
    async getInitalDataAction({commit}){
      // 请求角色数据
      const departmentResult = await getPageListData('/department/list',{
        offset:0,
        size:1000
      })
      const {list : departmentList} = departmentResult.data
      const roleResult = await getPageListData('/role/list',{
        offset:0,
        size:1000
      })
      const {list : roleList} = roleResult.data

      // 请求菜单的全部数据
      const menuResult = await getPageListData('/menu/list',{})
      const {list:menuList} = menuResult.data



      commit('changeEntirDepartment',departmentList)
      commit('changeEntirRole',roleList)
      commit('changeEntirMenu',menuList)
    }

  },

  modules:{
    login,
    system,
    dashboard
  }
})

export function setupStore(){
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitalDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
