import { IFrom } from '@/base-ui/from'

export const searchFromConfig:IFrom = {
  fromItems:[
{
  field:'name',
  type:'input',
  label:'角色名称',
  rules:[],
  placeholder:'请输入角色名称'
},
{
  field:'intro',
  type:"input",
  label:'权限介绍',
  rules:[],
  placeholder:'请输入权限介绍'
},

{
  field:'createTime',
  type:'datepicker',
  label:'创建时间',
  otherOptions:{
    startPlaceholder:'开始时间',
    endPlaceholder:'结束时间',
    type:'daterange'
  }
}
]
}
