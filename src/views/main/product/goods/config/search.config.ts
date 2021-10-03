import { IFrom } from '@/base-ui/from'

export const searchFromConfig:IFrom = {
  labelWidth:'120px',
  itemStyle:{
    padding:'10px 40px'
  },
  collLayout:{
    span:8
  },
  fromItems:[
{
  field:'name',
  type:'input',
  label:'商品名称',
  rules:[],
  placeholder:'商品名称'
},
{
  field:'createAt',
  type:'datepicker',
  label:'创建时间',
  otherOptions:{
    startPlaceholder:'开始时间',
    endPlaceholder:'结束时间',
    type:'daterange'
  }
},

{
  field:'status',
  type:'select',
  label:'商品状态',
  placeholder:'请选择商品状态',
  options:[
    {title:"有货",value:"1"},
    {title:"缺货",value:"0"},
  ]
}
]
}
