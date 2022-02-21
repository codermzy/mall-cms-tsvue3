import { IDataType } from '@/service/types'
import zyRequest from '../../index'

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
  return zyRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount
  })
}
export function getCategoryGoodsSale() {
  return zyRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale
  })
}
export function getCategoryGoodsFavor() {
  return zyRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor
  })
}
export function getAddressGoodsSale() {
  return zyRequest.get<IDataType>({
    url: DashboardAPI.addressGoodsSale
  })
}
