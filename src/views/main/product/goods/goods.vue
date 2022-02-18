<template>
  <div class="goods">
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
      <template #oldPrice="scope">{{ '￥' + scope.row.oldPrice }}</template>

      <template #newPrice="scope">{{ '￥' + scope.row.newPrice }}</template>

      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>

      <template #status="scope">
        <el-button
          size="mini"
          :type="scope.row.status ? 'success' : 'danger'"
          plain
        >
          {{ scope.row.status ? '启用' : '禁用' }}
        </el-button>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import pageContent from '@/components/page-content/src/page-content.vue'

import { contentTableConfig } from './config/content.config'

export default defineComponent({
  components: {
    pageContent
  },
  name: 'goods',
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
