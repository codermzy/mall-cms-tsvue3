type IFormType = 'input' | 'password' | 'select' | 'datePicker'

export interface IFormItems {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊属性
  otherOptions?: any
  // 是否隐藏
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItems[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
}
