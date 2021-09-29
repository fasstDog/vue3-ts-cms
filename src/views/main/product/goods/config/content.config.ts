export const contentTableConfig = {
  title : '商品列表',
  propList : [
    {prop:'name',label:'商品名称',minWidth:'80'},
    {prop:'oldPrice',label:'原价格',minWidth:'80',slotName:"oldPrice"},
    {prop:'newPrice',label:'现价格',minWidth:'80',slotName:"newPrice"},
    {prop:'status',label:'状态',minWidth:'100',slotName:'status'},
    {prop:'imgUrl',label:'图片',minWidth:'100',slotName:'image'},
    {prop:'createAt',label:'创建时间',minWidth:'250',slotName:'createAt'},
    {prop:'updateAt',label:'修改时间',minWidth:'250',slotName:'updateAt'},
    {label:"操作",minWidth:'120',slotName:'handler'}
  ],
  showIndexColum : true,
  showSelectColum : true,
}

