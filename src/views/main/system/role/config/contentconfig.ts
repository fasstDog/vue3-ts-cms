export const contentTableConfig = {
  title : '角色列表',
  propList : [
    {prop:'name',label:'角色名',minWidth:'100'},
    {prop:'intro',label:'权限介绍',minWidth:'100'},
    {prop:'createAt',label:'创建时间',minWidth:'250',slotName:'createAt'},
    {prop:'updateAt',label:'修改时间',minWidth:'250',slotName:'updateAt'},
    {label:"操作",minWidth:'120',slotName:'handler'}
  ],
  showIndexColum : true,
  showSelectColum : true,
}
