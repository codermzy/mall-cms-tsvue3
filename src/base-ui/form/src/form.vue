<template>
  <div class="zy-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItem" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :show-password="item.type === 'password'"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>

              <template v-else-if="item.type === 'select'">
                <el-select :placeholder="item.placeholder" style="width: 100%">
                  <el-option v-for="option in item.options" :key="option.value">
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>

              <template v-else-if="item.type === 'datePicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    formItem: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // ≥1920px
        lg: 8, // ≥1200px
        md: 12, // ≥992px
        sm: 24, // ≥768px
        xs: 24 // <768px
      })
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.zy-form {
  padding-top: 20px;
}
</style>
