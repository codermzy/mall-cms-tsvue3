<template>
  <div class="page-search">
    <div class="search">
      <zy-form v-bind="searchFormConfig" v-model="formData">
        <template #header>
          <h1 class="header">高级检索</h1>
        </template>
        <template #footer>
          <div class="footer">
            <el-button icon="el-icon-refresh">重置</el-button>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
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
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return {
      formData
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
