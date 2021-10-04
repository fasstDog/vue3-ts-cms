import { Module } from "vuex";

import { getAddressGoodsSale,
    getCategoryGoodsCount,
    getCategoryGoodsFavor,
    getCategoryGoodsSale,
    getAmountList
   } from '@/service/main/analysis/dashboard'

import { IDashboardState } from './types'
import { IRootState } from "../../types";



const dashboardModule:Module<IDashboardState,IRootState>={
  namespaced:true,
  state:{
    categoryGoodsCount:[],
    categoryGoodsSale:[],
    categoryGoodsFavor:[],
    addressGoodsSale:[],
    topPanelDatas:[]
  },
  mutations:{
    changeCategoryGoodsCount(state,list){
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state,list){
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state,list){
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state,list){
      state.addressGoodsSale = list
    },
    changeTopPanelDatas(state, list) {
      state.topPanelDatas = list
    },
  },
  actions:{
    async getDashbardDataAction({commit}){
      const categoryGoodsCountResult = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount',categoryGoodsCountResult.data)

      const categoryGoodsSaleResult = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale',categoryGoodsSaleResult.data)

      const categoryGoodsFavorResult = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor',categoryGoodsFavorResult.data)

      const addressGoodsSaleResult = await getAddressGoodsSale()
      commit('changeAddressGoodsSale',addressGoodsSaleResult.data)

      const resultTopPanelDatas = await getAmountList()
      commit('changeTopPanelDatas', resultTopPanelDatas.data)

    }
  },

}


export default dashboardModule
