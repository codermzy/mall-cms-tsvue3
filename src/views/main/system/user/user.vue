<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <div class="content">
      <zy-table :listData="userList" :propList="propList">
        <template #status="scope">
          <el-button>{{ scope.row.enable }}</el-button>
        </template>
      </zy-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import ZyTable from '@/base-ui/table'

import { searchFormConfig } from './search.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    ZyTable
  },

  setup() {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)

    const propList = [
      { prop: 'name', label: '姓名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '手机号', minWidth: '100' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250',
        slotName: 'updataAt'
      }
    ]
    return {
      searchFormConfig,
      userList,
      userCount,
      propList
    }
  }
})
</script>

<style scoped>
.content {
  border-top: 20px solid #f5f5f5;
  padding: 20px;
}
</style>
