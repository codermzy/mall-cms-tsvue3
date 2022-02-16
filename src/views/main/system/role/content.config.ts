export const contentTableConfig = {
  title: '角色列表',
  propList: [
    { prop: 'id', label: 'id', minWidth: '100' },
    { prop: 'name', label: '姓名', minWidth: '100' },
    { prop: 'intro', label: 'intro', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    }
  ],
  showIndexColum: true,
  showSelectionColumn: true
}
