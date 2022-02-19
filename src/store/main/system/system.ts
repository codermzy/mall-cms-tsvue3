import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'

import {
  getPageListData,
  deletPageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return state[`${pageName}List`]
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //   case 'role':
        //     return state.roleList
        // }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return state[`${pageName}Count`]
        // switch (pageName) {
        //   case 'users':
        //     return state.usersCount
        //   case 'role':
        //     return state.roleCount
        // }
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload) {
      // 获取 pageUrl
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      /*       switch (pageName) {
        case 'users':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
      } */
      // 2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3.将数据存储到state中
      const { list, totalCount } = pageResult.data
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
      /*       switch (pageName) {
        case 'users':
          commit('changeUsersList', list)
          commit('changeUsersCount', totalCount)
          break
        case 'role':
          commit('changeRoleList', list)
          commit('changeRoleCount', totalCount)
          break
        case 'goods':
          commit('changeGoodsList', list)
          commit('changeGoodsCount', totalCount)
          break
      } */
    },

    async deletaPageDataAction({ dispatch }, payload) {
      // 1.获取pageName和 id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`

      // 2.调用删除网络请求
      const deleteResult = await deletPageData(pageUrl)

      // 3. 重新请求最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })

      return deleteResult
    },

    async createPageDataAction({ dispatch }, payload) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      const createResult = await createPageData(pageUrl, newData)
      // 2.更新页面数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })

      return createResult
    },

    async editPageDataAction({ dispatch }, payload) {
      // 1.创建数据的请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`

      const editResult = await editPageData(pageUrl, editData)

      // 2.更新页面数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })

      return editResult
    }
  }
}

export default systemModule
