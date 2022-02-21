import { Module } from 'vuex'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'

import { IDashboardState } from './types'
import { IRootState } from '@/store/types'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      // 分类商品的数量
      categoryGoodsCount: [],
      // 分类商品的收藏
      categoryGoodsFavor: [],
      // 分类商品的销量
      categoryGoodsSale: [],
      // 不同地区的销量
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryCountResult.data)

      const categoryFavorResult = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryFavorResult.data)

      const categorySaleResult = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categorySaleResult.data)

      const addressGoodsResult = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsResult.data)
    }
  }
}

export default dashboardModule
