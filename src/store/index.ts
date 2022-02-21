import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'

import { getPageListData } from '@/service/main/system/system'

import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'codermzy',
      age: 19,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, departmentList: any) {
      state.entireDepartment = departmentList
    },
    changeEntireRole(state, roleList: any) {
      state.entireRole = roleList
    },
    changeEntireMenu(state, menuList: any) {
      state.entireMenu = menuList
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data

      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      // 保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
