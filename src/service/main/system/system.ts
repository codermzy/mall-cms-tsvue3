import zyRequest from '../../index'

import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return zyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function deletPageData(url: string) {
  return zyRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return zyRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, eidtData: any) {
  return zyRequest.patch<IDataType>({
    url: url,
    data: eidtData
  })
}
