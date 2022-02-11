import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  colLayout: {
    span: 8
  },
  itemStyle: {
    padding: '10px 40px'
  },
  labelWidth: '120px',
  formItem: [
    {
      type: 'input',
      label: 'id',
      placeholder: '请输入id'
    },
    {
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      type: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      type: 'select',
      label: '喜欢的运动',
      placeholder: '请输入你喜欢的运动',
      options: [
        { title: '篮球', value: 'basketball' },
        { title: '足球', value: 'follball' }
      ]
    },
    {
      type: 'datePicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
