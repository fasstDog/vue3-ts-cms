import { IFrom} from '@/base-ui/from'

export const modalConfig:IFrom = {
  fromItems:[
    {
      field:'name',
      type:'input',
      label:'角色名',
      placeholder:'请输入角色名'
    },
    {
      field:'intro',
      type:'input',
      label:'角色介绍',
      placeholder:'请输入角色介绍'
    },
  ],
  collLayout:{span:24},
  itemStyle:{ padding:' 0px 20px 0px 0px '}
}
