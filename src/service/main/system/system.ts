import zyRequest from '../../index'

import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return zyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
