<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <zy-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </zy-card>
      </el-col>
      <el-col :span="10">
        <zy-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </zy-card>
      </el-col>
      <el-col :span="7">
        <zy-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </zy-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <zy-card title="分类商品的销量">
          <line-echart
            title="分类销量统计"
            v-bind="categoryGoodsSale"
          ></line-echart>
        </zy-card>
      </el-col>
      <el-col :span="12">
        <zy-card title="分类商品的收藏">
          <bar-echart title="1" v-bind="categoryGoodsFavor"></bar-echart>
        </zy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from '@/store'

import ZyCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    ZyCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      store.state.dashboard.categoryGoodsSale.forEach((item) => {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      })
      return {
        xLabels,
        values
      }
    })

    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      store.state.dashboard.categoryGoodsFavor.forEach((item) => {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      })
      return {
        xLabels,
        values
      }
    })

    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item) => {
        return { name: item.address, value: item.count }
      })
    })
    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>
