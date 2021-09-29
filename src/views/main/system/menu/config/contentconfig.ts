export const contentTableConfig = {
  title : '菜单列表',
  propList : [
    {prop:'name',label:'菜单名称',minWidth:'100'},
    {prop:'type',label:'类型',minWidth:'60'},
    {prop:'url',label:'菜单的url',minWidth:'120'},
    {prop:'icon',label:'菜单icon',minWidth:'100',slotName:'icon'},
    {prop:'permission',label:'按钮权限',minWidth:'100'},
    {prop:'createAt',label:'创建时间',minWidth:'220',slotName:'createAt'},
    {prop:'updateAt',label:'修改时间',minWidth:'220',slotName:'updateAt'},
    {label:"操作",minWidth:'120',slotName:'handler'}
  ],
  showIndexColum : false,
  showSelectColum : false,
  childrenProps:{
    rowKey:'id',
    treeProp:{
      children:'children'
    }
  },
  showFooter:false
}
