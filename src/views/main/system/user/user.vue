<template>
  <div class="user">
    <div class="search">
      <zy-form v-bind="searchFormConfig" />
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ZyForm from '@/base-ui/form'
import { searchFormConfig } from './search.config'
export default defineComponent({
  name: 'user',
  components: {
    ZyForm
  },

  setup() {
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
