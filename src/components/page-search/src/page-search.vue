<template>
  <div class="page-search">
    <div class="search">
      <zy-form v-bind="searchFormConfig" v-model="formData">
        <template #header>
          <h1 class="header">高级检索</h1>
        </template>
        <template #footer>
          <div class="footer">
            <el-button icon="el-icon-refresh" @click="handleResetClick">
              重置
            </el-button>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="handleQueryClick"
              >搜索</el-button
            >
          </div>
        </template>
      </zy-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ZyForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    ZyForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定的
    const formItem = props.searchFormConfig?.formItem ?? []
    const formOriginData = {}

    for (const item of formItem) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 重置按钮
    const handleResetClick = () => {
      // formData.value = formOriginData
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      emit('resetBtnClick')
    }

    // 查询按钮
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.header {
  color: red;
}
.footer {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
